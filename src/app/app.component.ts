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
  private plates: number[] = [1,2];


  navLinks = [
    { 'path': 'upload', 'label': 'upload files' },
    { 'path': 'overview', 'label': 'plate overview' },
    { 'path': 'plates', 'label': 'plate view' },
    { 'path': 'sorted', 'label': 'experiment view' }
  ];
}
