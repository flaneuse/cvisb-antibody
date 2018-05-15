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
  private expt_types = ['ADCD', 'ADCP', 'ADNP', 'NKD'];
  private file_types = [
    { id: 'plates', label: 'plate/sample layout', search_string: 'layout' },
    { id: 'data', label: 'fluorescence data', search_string: 'flowjo' },
    { id: 'raw', label: '.acs file', search_string: '\.acs' },
  ];

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

    this.uploader = new FileUploader({
      url: this.URL, authToken: "testToken",
      autoUpload: false
    });

    // console.log(this.uploader)
    //
    // this.uploader.onProgressAll= (progress:any) => {
    //   console.log('tracking')
    //   console.log(progress)
    // //   this.uploader.progress = progress;
    //   this.progress = progress;
    // }
    //
    // this.uploader.onBeforeUploadItem = function(item) {
    // console.log(this.selected_expt)
    //   item.formData = [{ firstParam: 'Value', secondParam: 'value' }];
    // };
    //
    this.uploader.onAfterAddingFile = (fileItem: any) => {
      let filename = fileItem.file.name;
      // Update the
      fileItem.formData['expt'] = this.findExptType(filename);
      fileItem.formData['file'] = this.findFileType(filename);
    }

    // Solved via https://stackoverflow.com/questions/38502687/how-to-submit-post-data-with-ng2-file-upload-in-angular-2
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      // Convert Object containing the file/experiment params set by the user to pass to Python backend
      for (let key of Object.keys(fileItem.formData)) {
        form.append(key, fileItem.formData[key])
      }
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('file completed uploading')
      // this.fileurl = response
      // console.log(item)
      // console.log(status)
      // console.log(headers)
      // console.log(response)
    };
    // console.log(this.uploader)
  }

  // Scans filename to set the experiment type
  findExptType(filename) {
    for (let expt of this.expt_types) {
      if (filename.toUpperCase().indexOf(expt.toUpperCase()) > -1) {
        return expt;
      }
    }
  }

  // Scans filename to set the experiment type
  findFileType(filename) {
    for (let file_type of this.file_types) {
      let search_string = file_type.search_string.toUpperCase();
      if (filename.toUpperCase().indexOf(search_string) > -1) {
        return file_type.id;
      }
    }
  }


}
