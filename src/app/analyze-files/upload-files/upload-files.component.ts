import { Component, OnInit, OnChanges } from '@angular/core';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { FileType } from '../../_classes/file';

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
  private file_types: FileType[] = [
    { id: 'plates', label: 'plate/sample layout', uploaded: false, search_string: 'layout' },
    { id: 'data', label: 'fluorescence data', uploaded: false, search_string: 'flowjo' },
    { id: 'raw', label: '.acs file', uploaded: false, search_string: '\.acs' },
  ];

  private expt_ids: Object[] = [];

  private missing_files: boolean = false;

  exptid_pattern: string = "[A-Z]{3}EXP[0-9]+"; // Pattern to search for the experiment ID.

  // = new FileUploader({ url: 'http://127.0.0.1:5000/upload' });
  URL: string = 'http://127.0.0.1:5000/upload';
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }


  constructor(
  ) { }


  removeFile(event, item) {
    item.remove();

    if (this.uploader.queue.length == 0) {
      this.expt_ids = [];
      this.missing_files = false;
    } else {
      // switch off whether that particular file has been uploaded
      this.trackUploads(item.file.name);
    }


  }

  clearQueue() {
    this.uploader.clearQueue();
    // reset the uploaded files and list of expt ids.
    this.expt_ids = [];
    this.missing_files = false;


    // let files = this.uploader.queue.map(d => d.file.name);
    // console.log(this.uploader.queue)
    //
    // // Update the file list
    // this.resetUploaded();
    //
    // // Update whether files are missing
    // this.checkMissing();
  }

  updateFileType(new_filetype, item) {
    console.log(item)
    console.log(this.uploader.queue[0].formData.expt_id)
    this.trackUploads(null, item.formData['expt_id'], item.formData['file'])
  }

  ngOnChanges() {
    console.log('changes')
  }



  ngOnInit() {
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
      // Pull out the filename uploaded
      let filename = fileItem.file.name;

      let exptid = this.findExptID(filename);
      let filetype = this.findFileType(filename);

      // Update the params to pass to python.
      fileItem.formData['expt_id'] = exptid;
      // id != null && this.expt_ids.indexOf(id) === -1 && this.expt_ids.push(id); // add to the list of expts if not already in the list
      fileItem.formData['expt'] = this.findExptType(filename);
      fileItem.formData['file'] = filetype;

      // Keep track of if the right files have been Uploaded
      // // add to the list of expts if not already in the list
      // if ID exists, update the upload status of the files
      this.trackUploads(filename)



      // Update the count of missing files.
      this.checkMissing();
      console.log(this.expt_ids)
    }


    // Params passing to Flask solved via https://stackoverflow.com/questions/38502687/how-to-submit-post-data-with-ng2-file-upload-in-angular-2
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
      console.log(response)
    };

    // TODO: build in checks if missing files.
    this.uploader.onCompleteAll = () => {
      console.log("DONE!");
      // Call function to staple everything together
    }
    // console.log(this.uploader)
  }

  checkMissing() {
    let uploads = this.expt_ids.map((d: any) => d.filetype.map(g => g.uploaded))

    let isMissing = function(val) {
      return !val;
    }

    // flatten array
    uploads = [].concat.apply([], uploads)

    this.missing_files = uploads.some(isMissing);
  }

  trackUploads(filename, exptid = null, filetype = null) {
    if (exptid === null) {
      exptid = this.findExptID(filename);
    }

    if (filetype === null) {
      filetype = this.findFileType(filename);
    }
    let idx = this.expt_ids.findIndex((d: any) => d.expt_id === exptid);

    // if id doesn't exist in the data frame at all, create as a dictionary
    idx === -1 ? this.initializeUploaded(exptid, filetype) : this.changeUploaded(idx, filetype);
  }

  initializeUploaded(exptid, filetype) {

    // NOTE: must use deep copying to create a *copy* not pointer to this.file_types

    let arr = JSON.parse(JSON.stringify(this.file_types));
    // these copy just the array, but also need to copy the objects WITHIN the array. These methods just provide pointers to the process.
    // let arr = this.file_types.concat(); // doesn't work
    // let arr = this.file_types.slice(); // doesn't work
    // let arr = this.file_types.splice(0); // doesn't work -- removes obj from this.file_types
    // let arr = [...this.file_types]; // doesn't work.
    this.expt_ids.push({ 'expt_id': exptid, 'filetype': arr })

    let idx = this.expt_ids.findIndex((d: any) => d.expt_id === exptid);

    this.changeUploaded(idx, filetype);

  }

  changeUploaded(idx, filetype) {
    if (filetype) {
      // Changes the master lookup table to toggle its presence from 'off' to 'on'
      let idx_upload = this.expt_ids[idx]['filetype'].findIndex(d => d.id == filetype);

      this.expt_ids[idx]['filetype'][idx_upload]['uploaded'] = !this.expt_ids[idx]['filetype'][idx_upload]['uploaded'];
    }
  }

  resetUploaded() {
    for (let i = 0; i < this.expt_ids.length; i++) {
      let indiv_expt = this.expt_ids[i]['filetype'];

      for (let j = 0; j < indiv_expt.length; j++) {
        indiv_expt[j]['uploaded'] = false;
      }
    }
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

  findExptID(filename) {
    let id = filename.match(this.exptid_pattern);

    if (id !== null) {
      return id[0];
    }
  }


}
