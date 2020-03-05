import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {CalculateService} from './calculate.service';
import {FormModel} from './form.model';
import * as copy from 'copy-to-clipboard';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('dangerTpl') toastModal: ElementRef;
  calculating: boolean;
  formData: FormGroup;
  noResult: boolean;
  calculated: boolean;
  copiedToClipboard: boolean;
  calculatedNumbersIndex: number[];
  calculatedNumbers: number[];
  numCount: number[] = [
    1, 2, 3, 4
  ];
  submitted: boolean;
  readInfo: boolean;

  constructor(private calculateService: CalculateService) {
  }

  get list() {
    return this.formData.get('numbersArr') as FormArray;
  }

  get listIterator(): AbstractControl[] {
    return (this.formData.get('numbersArr') as FormArray).controls;
  }

  get lenInput() {
    return this.formData.get('arrayLen');
  }

  ngOnInit(): void {
    this.formData = new FormGroup({
      numbersArr: new FormArray([
        new FormControl(null, [
          Validators.required,
          Validators.pattern(/^(?:-?[1-9]\d*$)|(?:^0)$/)
        ])
      ]),
      sumVal: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?:-?[1-9]\d*$)|(?:^0)$/),
      ]),
      numsEqSum: new FormControl(null, Validators.required),
      arrayLen: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(200)
      ])
    });
  }

  onCalculated(i: number): string {
    return (this.submitted &&
      !this.calculating &&
      !this.noResult &&
      this.calculatedNumbersIndex.includes(i))
      ? 'selected' : '';
  }

  addNumber() {
    const list = this.list;
    if (this.list.length < 200) {
      this.lenInput.setValue(this.list.length + 1);
      list.push(new FormControl(null,
        [
          Validators.required,
          Validators.pattern(/^(?:-?[1-9]\d*$)|(?:^0)$/)
        ]));
    }
  }

  async calculateArray() {
    this.noResult = false;
    this.calculated = false;
    if (this.formData.valid) {
      let calculatedNumbersIndex: number[];
      let noResult = false;
      let calculated = false;
      this.submitted = true;
      this.calculating = true;
      const thisContext = this;
      setTimeout(async () => {
        const formValue: FormModel = thisContext.formData.value;
        await this.calculateService.calculateForm(formValue)
          .then(value => {
            calculatedNumbersIndex = value.indexes;
            thisContext.calculatedNumbers = value.numbers;
            calculated = true;
          }).catch(() => {
            noResult = true;
            calculated = false;
          }).finally(() => {
            const thisInnerContext = thisContext;
            setTimeout(() => {
              thisInnerContext.calculated = calculated;
              thisInnerContext.noResult = noResult;
              thisInnerContext.calculatedNumbersIndex = calculatedNumbersIndex;
              thisInnerContext.calculating = false;
            }, 800);
          });
      }, 500);

    }
  }

  fetchClipboard(event: ClipboardEvent, startIndex: number) {
    const value = event.clipboardData.getData('text/plain');
    const numbers = value.split(new RegExp(/[\s\,]+/));
    for (const numberVal of numbers) {
      if (isNaN(+numberVal)) {
        return;
      }
    }
    const list = this.list;
    let j = 0;
    for (let i = startIndex; i < list.length && j < numbers.length; i++) {
      list.get([i]).setValue(+numbers[j++]);
    }
    event.preventDefault();
  }

  onDeletingItem(i: number) {
    if (this.list.length > 1) {
      this.list.removeAt(i);
      this.lenInput.setValue(this.lenInput.value - 1);
    }
  }

  onInvalidItem(i: number): boolean {
    const item = this.list.get([i]);
    return item.invalid && item.touched && item.dirty;
  }

  onInvalidLen(): boolean {
    const len = this.lenInput;
    return len.invalid && len.touched && len.dirty;
  }

  onInvalidInput() {
    const sumVal = this.formData.get('sumVal');
    return sumVal.invalid && sumVal.touched && sumVal.dirty;
  }

  clearArray() {
    this.calculatedNumbersIndex = [];
    this.listIterator[0].reset();
    const len = this.listIterator.length;
    this.listIterator.splice(1, len);
    this.lenInput.setValue(1);
  }

  clearForm() {
    this.calculatedNumbersIndex = [];
    this.formData.reset();
    this.calculated = false;
    this.noResult = false;
    this.lenInput.setValue(this.listIterator.length);
  }

  onChangingArrayLength() {
    if (this.lenInput.valid) {
      const lenVal = +this.lenInput.value;
      const currLen = this.list.length;
      if (lenVal === currLen) {
        return;
      }
      if (lenVal > currLen) {
        for (let i = 0; i < lenVal - currLen; i++) {
          this.list.push(new FormControl(null, [
            Validators.required,
            Validators.pattern(/^(?:-?[1-9]\d*$)|(?:^0)$/)
          ]));
        }
        return;
      }
      for (let i = currLen - 1; i >= lenVal; i--) {
        this.list.removeAt(i);
      }
    }
  }

  onReadInfo() {
    this.readInfo = true;
  }

  copyToClipboard() {
    const copyText = this.calculatedNumbers.join(' ');
    const copied = copy(copyText);
    if (copied) {
      const thisContext = this;
      setTimeout(() => thisContext.showToastMessage(), 500);
    }
  }

  exportToFile() {
    const blobFile = new Blob([this.calculatedNumbers.join(' ')],
      {
        type: 'text/plain;charset=utf-8',
      });
    FileSaver.saveAs(blobFile, 'numbers');
  }

  private showToastMessage() {
    this.copiedToClipboard = true;
    const thisContext = this;
    setTimeout(() => thisContext.hideToastMessage(), 2000);
  }

  private hideToastMessage() {
    this.copiedToClipboard = false;
  }
}
