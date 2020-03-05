import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements AfterViewInit {
  @Output() readAlert: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('alert') alertModal: ElementRef;

  onRead(event: MouseEvent) {
    if (event.target === this.alertModal.nativeElement
      || (event.target as any).type === 'button') {
      this.alertModal.nativeElement.classList.remove('show');
      const thisContext = this;
      setTimeout(() => {
        thisContext.readAlert.emit();
      }, 200);
    }
  }

  ngAfterViewInit(): void {
    this.alertModal.nativeElement.classList.add('showing');
    const thisContext = this;
    setTimeout(() => {
      thisContext.alertModal.nativeElement.classList.remove('showing');
      thisContext.alertModal.nativeElement.classList.add('show');
    }, 10);
  }
}
