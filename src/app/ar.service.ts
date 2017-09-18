import { Injectable } from '@angular/core';

@Injectable()
export class ArService {

  constructor() {
    console.log('service', window);
  }

}
