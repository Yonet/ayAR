import { Component } from '@angular/core';

@Component({
  selector: 'a-root',
  template: `
    <p>
      app Works!
    </p>
    <a-pattern-marker></a-pattern-marker>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
  }
}
