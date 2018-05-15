import { Component, OnInit } from '@angular/core';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

// const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})


// from https://valor-software.com/ng2-file-upload/
export class UploadFilesComponent implements OnInit {


  public uploader: FileUploader;
  // private progress: number = 0;
  private expt_types = ['ADCD', 'ADCP', 'ADNP', 'NKD']
  private file_types = [
    {id: 'plates', label: 'plate/sample layout' },
    {id: 'data', label: 'fluorescence data' },
    {id: 'raw', label: '.acs file' },
]

  // = new FileUploader({ url: 'http://127.0.0.1:5000/upload' });
  URL: string = 'http://127.0.0.1:5000/upload';
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    console.log(e)
    this.hasBaseDropZoneOver = e;
  }


  constructor(
  ) { }

  ngOnInit() {
    // TODO: formData: data to pass with item.

    this.uploader = new FileUploader({ url: this.URL, authToken: "testToken",
      autoUpload: false });

    // console.log(this.uploader)
    //
    // this.uploader.onProgressAll= (progress:any) => {
    //   console.log('tracking')
    //   console.log(progress)
    // //   this.uploader.progress = progress;
    //   this.progress = progress;
    // }
    //
    this.uploader.onBeforeUploadItem = function(item) {
    console.log(this.selected_expt)
      item.formData = [{ firstParam: 'Value', secondParam: 'value' }];
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // this.fileurl = response
      console.log(item)
      console.log(status)
      console.log(headers)
      // console.log(response)
    };
    console.log(this.uploader)
  }

}
