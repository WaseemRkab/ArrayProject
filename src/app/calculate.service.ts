import {FormModel} from './form.model';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {
  private calculateHandler = {
    on1numsEq: (indexesArr: number[], numbersArr: number[], formModel: FormModel):
      { numbers: number[], indexes: number[] } => {
      let i = 0;
      while (i < numbersArr.length) {
        if (numbersArr[i] === formModel.sumVal) {
          return {
            numbers: [
              numbersArr[i]
            ],
            indexes: [
              indexesArr[i]
            ]
          };
        }
        i++;
      }
      return null;
    },
    on2numsEq: (indexesArr: number[], numbersArr: number[], formModel: FormModel):
      { numbers: number[], indexes: number[] } => {
      let l = 0;
      let r = numbersArr.length - 1;
      while (l < r) {
        if (numbersArr[l] + numbersArr[r] === formModel.sumVal) {
          return {
            numbers: [
              numbersArr[l],
              numbersArr[r]
            ],
            indexes: [
              indexesArr[l],
              indexesArr[r]
            ]
          };
        } else if (numbersArr[l] + numbersArr[r] < formModel.sumVal) {
          l++;
        } else {
          r--;
        }
      }
      return null;
    },
    on3numsEq: (indexesArr: number[], numbersArr: number[], formModel: FormModel):
      { numbers: number[], indexes: number[] } => {
      for (let i = 0; i < numbersArr.length - 2; i++) {
        let l = i + 1;
        let r = numbersArr.length - 1;
        while (l < r) {
          if (numbersArr[i] + numbersArr[l] + numbersArr[r] === formModel.sumVal) {
            return {
              numbers: [
                numbersArr[i],
                numbersArr[l],
                numbersArr[r]
              ],
              indexes: [
                indexesArr[i],
                indexesArr[l],
                indexesArr[r]
              ]
            };
          } else if (numbersArr[i] + numbersArr[l] + numbersArr[r] < formModel.sumVal) {
            l++;
          } else {
            r--;
          }
        }
      }
      return null;
    },
    on4numsEq: (indexesArr: number[], numbersArr: number[], formModel: FormModel):
      { numbers: number[], indexes: number[] } => {
      for (let i = 0; i < numbersArr.length - 3; i++) {
        for (let j = i + 1; j < numbersArr.length - 3; j++) {
          let l = j + 1;
          let r = numbersArr.length - 1;
          while (l < r) {
            const sumCheck = numbersArr[i] + numbersArr[j] + numbersArr[l] + numbersArr[r];
            if (sumCheck === formModel.sumVal) {
              return {
                numbers: [
                  numbersArr[i],
                  numbersArr[j],
                  numbersArr[l],
                  numbersArr[r]
                ],
                indexes: [
                  indexesArr[i],
                  indexesArr[j],
                  indexesArr[l],
                  indexesArr[r]
                ]
              };
            } else if (sumCheck < formModel.sumVal) {
              l++;
            } else {
              r--;
            }
          }
        }
      }
      return null;
    }
  };

  public calculateForm(formModel: FormModel): Promise<{ numbers: number[], indexes: number[] }> {
    let numbersRes: { numbers: number[], indexes: number[] };
    return new Promise<{ numbers: number[], indexes: number[] }>((resolve, reject) => {
      const sortArrIndex = this.sortedNumberWithIndexes(formModel.numbersArr);
      const methodName = `on${formModel.numsEqSum}numsEq`;
      numbersRes = this.calculateHandler[methodName](sortArrIndex.indexes, sortArrIndex.numbers, formModel);
      if (numbersRes) {
        resolve(numbersRes);
        return;
      }
      reject();
    });
  }

  private sortedNumberWithIndexes(numbersArr: number[]): { numbers: number[], indexes: number[] } {
    const arrayNumbers = [...numbersArr];
    const indexesNum = new Array<number>(arrayNumbers.length);
    for (let i = 0; i < indexesNum.length; i++) {
      indexesNum[i] = i;
    }
    for (let i = 0; i < arrayNumbers.length - 1; i++) {
      for (let j = 0; j < arrayNumbers.length - i - 1; j++) {
        if (arrayNumbers[j] > arrayNumbers[j + 1]) {
          [arrayNumbers[j], arrayNumbers[j + 1]] = [arrayNumbers[j + 1], arrayNumbers[j]];
          [indexesNum[j], indexesNum[j + 1]] = [indexesNum[j + 1], indexesNum[j]];
        }
      }
    }
    return {numbers: arrayNumbers, indexes: indexesNum};
  }
}
