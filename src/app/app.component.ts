import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';
  navLinks = [    { 'path': 'plates', 'label': 'plate view' },
    { 'path': 'expts', 'label': 'experiment view' }]
}
