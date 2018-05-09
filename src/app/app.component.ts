import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';

  private expt_type: string = 'ADCD';
  private expt_id: string = 'BMGEXP577';


  navLinks = [
    { 'path': 'overview', 'label': 'plate overview' },
    { 'path': 'plates', 'label': 'plate view' },
    { 'path': 'expts', 'label': 'experiment view' }
  ];
}
