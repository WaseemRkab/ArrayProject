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
                numbers: [numbersArr[i], numbersArr[j], numbersArr[l], numbersArr[r]],
                indexes: [indexesArr[i], indexesArr[j], indexesArr[l], indexesArr[r]]
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
    },
    on5numsEq: (indexesArr: number[], numbersArr: number[], formModel: FormModel):
      { numbers: number[], indexes: number[] } => {
      for (let i = 0; i < numbersArr.length - 4; i++) {
        for (let j = i + 1; j < numbersArr.length - 4; j++) {
          for (let k = j + 1; k < numbersArr.length - 4; k++) {
            let l = k + 1;
            let r = numbersArr.length - 1;
            while (l < r) {
              const sumCheck = numbersArr[i] + numbersArr[j] + numbersArr[k] + numbersArr[l] + numbersArr[r];
              if (sumCheck === formModel.sumVal) {
                return {
                  numbers: [
                    numbersArr[i],
                    numbersArr[j],
                    numbersArr[k],
                    numbersArr[l],
                    numbersArr[r]
                  ],
                  indexes: [
                    indexesArr[i],
                    indexesArr[j],
                    indexesArr[k],
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
      }
      return null;
    },
    on6numsEq: (indexesArr: number[], numbersArr: number[], formModel: FormModel):
      { numbers: number[], indexes: number[] } => {
      for (let i = 0; i < numbersArr.length - 5; i++) {
        for (let j = i + 1; j < numbersArr.length - 5; j++) {
          for (let k = j + 1; k < numbersArr.length - 5; k++) {
            for (let x = k + 1; x < numbersArr.length - 5; x++) {
              let l = x + 1;
              let r = numbersArr.length - 1;
              while (l < r) {
                const sumCheck = numbersArr[i] + numbersArr[j] + numbersArr[k] + numbersArr[x] + numbersArr[l] + numbersArr[r];
                if (sumCheck === formModel.sumVal) {
                  return {
                    numbers: [
                      numbersArr[i],
                      numbersArr[j],
                      numbersArr[k],
                      numbersArr[x],
                      numbersArr[l],
                      numbersArr[r]
                    ],
                    indexes: [
                      indexesArr[i],
                      indexesArr[j],
                      indexesArr[k],
                      indexesArr[x],
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
        }
      }
      return null;
    },
    on7numsEq: (indexesArr: number[], numbersArr: number[], formModel: FormModel):
      { numbers: number[], indexes: number[] } => {
      for (let i = 0; i < numbersArr.length - 6; i++) {
        for (let j = i + 1; j < numbersArr.length - 6; j++) {
          for (let k = j + 1; k < numbersArr.length - 6; k++) {
            for (let x = k + 1; x < numbersArr.length - 6; x++) {
              for (let y = x + 1; y < numbersArr.length - 6; y++) {
                let l = y + 1;
                let r = numbersArr.length - 1;
                while (l < r) {
                  const sumCheck = numbersArr[i] + numbersArr[j] + numbersArr[k] +
                    numbersArr[x] + numbersArr[y] + numbersArr[l] + numbersArr[r];
                  if (sumCheck === formModel.sumVal) {
                    return {
                      numbers: [
                        numbersArr[i],
                        numbersArr[j],
                        numbersArr[k],
                        numbersArr[x],
                        numbersArr[y],
                        numbersArr[l],
                        numbersArr[r]
                      ],
                      indexes: [
                        indexesArr[i],
                        indexesArr[j],
                        indexesArr[k],
                        indexesArr[x],
                        indexesArr[y],
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
          }
        }
      }
      return null;
    },
    on8numsEq: (indexesArr: number[], numbersArr: number[], formModel: FormModel):
      { numbers: number[], indexes: number[] } => {
      for (let i = 0; i < numbersArr.length - 7; i++) {
        for (let j = i + 1; j < numbersArr.length - 7; j++) {
          for (let k = j + 1; k < numbersArr.length - 7; k++) {
            for (let x = k + 1; x < numbersArr.length - 7; x++) {
              for (let y = x + 1; y < numbersArr.length - 7; y++) {
                for (let o = y + 1; o < numbersArr.length - 7; o++) {
                  let l = o + 1;
                  let r = numbersArr.length - 1;
                  while (l < r) {
                    const sumCheck = numbersArr[i] + numbersArr[j] + numbersArr[k] +
                      numbersArr[x] + numbersArr[y] + numbersArr[o] + numbersArr[l] + numbersArr[r];
                    if (sumCheck === formModel.sumVal) {
                      return {
                        numbers: [
                          numbersArr[i],
                          numbersArr[j],
                          numbersArr[k],
                          numbersArr[x],
                          numbersArr[y],
                          numbersArr[o],
                          numbersArr[l],
                          numbersArr[r]
                        ],
                        indexes: [
                          indexesArr[i],
                          indexesArr[j],
                          indexesArr[k],
                          indexesArr[x],
                          indexesArr[y],
                          indexesArr[o],
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
            }
          }
        }
      }
      return null;
    },
    on9numsEq: (indexesArr: number[], numbersArr: number[], formModel: FormModel):
      { numbers: number[], indexes: number[] } => {
      for (let i = 0; i < numbersArr.length - 8; i++) {
        for (let j = i + 1; j < numbersArr.length - 8; j++) {
          for (let k = j + 1; k < numbersArr.length - 8; k++) {
            for (let x = k + 1; x < numbersArr.length - 8; x++) {
              for (let y = x + 1; y < numbersArr.length - 8; y++) {
                for (let o = y + 1; o < numbersArr.length - 8; o++) {
                  for (let z = o + 1; z < numbersArr.length - 8; z++) {
                    let l = z + 1;
                    let r = numbersArr.length - 1;
                    while (l < r) {
                      const sumCheck = numbersArr[i] + numbersArr[j] + numbersArr[k] +
                        numbersArr[x] + numbersArr[y] + numbersArr[o] + numbersArr[z] +
                        numbersArr[l] + numbersArr[r];
                      if (sumCheck === formModel.sumVal) {
                        return {
                          numbers: [
                            numbersArr[i],
                            numbersArr[j],
                            numbersArr[k],
                            numbersArr[x],
                            numbersArr[y],
                            numbersArr[o],
                            numbersArr[z],
                            numbersArr[l],
                            numbersArr[r]
                          ],
                          indexes: [
                            indexesArr[i],
                            indexesArr[j],
                            indexesArr[k],
                            indexesArr[x],
                            indexesArr[y],
                            indexesArr[o],
                            indexesArr[z],
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
              }
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

      /*if (typeof Worker !== 'undefined') {
        // Create a new
        const worker = new Worker('./app.worker', {type: 'module'});
        worker.onmessage = ({data}) => {
          console.log(`page got message: ${data}`);
        };
        worker.postMessage('hello');
      } else {
        console.log('not supported');
        // Web workers are not supported in this environment.
        // You should add a fallback so that your program still executes correctly.
      }*/


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

if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker('./calc.worker', {type: 'module'});
  worker.onmessage = ({data}) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}
