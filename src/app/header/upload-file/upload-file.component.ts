import { Component, OnInit, OnChanges } from '@angular/core';
// import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from "rxjs";

import { GetDataService } from '../../_services/get-data.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  data: any;
  plates: Array<number> = [];

  private isLinear: boolean = false;

  // constructor() { }
  constructor(private dataSvc: GetDataService
) { }

  ngOnInit() {
  }

  ngOnChanges(){
  }

  public fileChange(event) {
    console.log('uploaded');

    // console.log(event);
    this.dataSvc.read_json(event, this.isLinear);
  //   .subscribe(data => {
  //   console.log('subscribing')
  //   console.log(data)
  //   this.data = data;
  //   console.log(this.data)
  // });
    // console.log(this.data)
    }



}
