import { Injectable } from '@angular/core';

export interface DataBox {
  name: string;
  id: number;
  checked?: boolean
}

@Injectable()
export class DataService {

  checkStore: DataBox[] = [
    {
      name: "Angular",
      id: 1
    },
    {
      name: "TypeScript",
      id: 2
    },
    {
      name: "NodeJs",
      id: 3
    }

  ];
  constructor() { }
  fnGetData() {
    return this.checkStore;
  }
}