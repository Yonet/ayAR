import { Component } from '@angular/core';

@Component({
  selector: 'a-root',
  template: `
    <p>
      app Works!
    </p>
    <a-ar></a-ar>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'a';
  constructor() {
    console.log('ar is here');
  }
}
