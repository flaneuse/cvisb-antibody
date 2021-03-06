import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/';

import { HttpErrorResponse, HttpHeaders, HttpClient } from "@angular/common/http";
import { FileUploader } from 'ng2-file-upload';

// classes
import { FluorData } from '../_classes';

import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})



// Required to return asynchronously
// Async help: https://stackoverflow.com/questions/47062994/angular-2-4-filereader-service
export class GetDataService {

  serverData: JSON;
  employeeData: JSON;
  fluorData: string;
  testData: any;

  private subject = new Subject<any>();


  private data: Array<FluorData>; // main holder for the data
  private colorScale: any; // D3 color function

  private dataSource = new Subject<Object>();
  private colorSource = new Subject<any>();
  private testSource = new Subject<string>();

  // Observable data/color function streams
  dataRetrived$ = this.dataSource.asObservable();
  colorScaleRetrieved$ = this.colorSource.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  // test functions
  // sayHi() {
  //   // this.httpClient.get('http://127.0.0.1:5000/').subscribe(data => {
  //   this.httpClient.get(environment.host_url).subscribe(data => {
  //     this.serverData = data as JSON;
  //     console.log(this.serverData);
  //   })
  // }
  //
  // getAllEmployees() {
  //   this.httpClient.get(environment.host_url + 'employees').subscribe(data => {
  //     this.employeeData = data as JSON;
  //     console.log(this.employeeData);
  //   })
  // }



  getDB() {
    console.log('CHECK RESULTS!')
    this.httpClient.get(environment.host_url + 'fluordata').subscribe((data: string) => {
      this.fluorData = data;
      // this.fluorData = data as JSON;
      this.data = this.parse_json(this.fluorData);
      this.setColorScale();

      console.log(this.data)

      this.dataSource.next({ 'df': this.data, 'colors': this.colorScale });
    })
  }

  getRaw() {
    this.httpClient.get(environment.host_url + 'merge').subscribe((data: string) => {
      this.fluorData = data;
      // this.fluorData = data as JSON;
      this.data = this.parse_json(this.fluorData);
      // this.setColorScale();

      console.log(this.data)

      this.dataSource.next({ 'df': this.data });
    })
  }

  uploadData() {
    console.log('calling uploadData')
    this.httpClient.post(environment.host_url + 'upload', this
      , {
        observe: 'response',
        // withCredentials: true,
        headers: new HttpHeaders()
        .set('content-type', 'application/json')
      }

    ).subscribe(data => {
      console.log('response object?')
      console.log(this)
      console.log(data)
      // HTTP response object
      this.testData = data;
      console.log(this.testData);
    }, err => console.log(err))
  }


  getUserObservable(): Observable<any> {
    return this.subject.asObservable();
  }

  setUser(user: any): void {
    this.subject.next(user);
  }

  // getData() {
  //   this.dataSource.next(this.data);
  //   this.colorSource.next(this.colorScale);
  // }

  setColorScale(colorInterpolator: any = d3Chromatic.interpolateYlGn, isLinear = false, logbase = 10) {
    // Set up main color scale.
    let scale = d3.scaleSequential(colorInterpolator);

    // Set the domain to be the min/max of data, if data exists.
    if (this.data) {
      // console.log('setting the properties of the color palette');

      let fluor_scores = this.data.map(d => d.fluor_score);

      let fluor_range: number[] = [d3.min(fluor_scores), d3.max(fluor_scores)];

      // log-scale the colors, if specified.
      if (!isLinear) {
        console.log(fluor_range)
        fluor_range = fluor_range.map(d => Math.log(d) / Math.log(logbase))
        console.log(fluor_range)
      }

      // Set the domain of the colors
      // force typescript number array to be happy
      scale.domain(fluor_range as [number | { valueOf(): number; }, number | { valueOf(): number; }]);

      let colorFunc = function(value) {
        // if log-transformed, transform the values before feeding into the color function
        if (!isLinear) {
          return scale(Math.log(value) / Math.log(logbase))
        }
        return scale(value)
      }

      this.colorScale = colorFunc;
    }

  }


  // Modified from https://stackoverflow.com/questions/45441962/how-to-upload-a-csv-file-and-read-them-using-angular2
  read_json(event: any, isLinear) {
    console.log('reading')
    // this.sayHi();
    // this.getAllEmployees();
    this.uploadData();

    let files: FileList = event.target.files;

    // console.log(files);
    if (files && files.length > 0) {
      let file: File = files.item(0);
      // console.log(file.name);
      // console.log(file.size);
      // console.log(file.type);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);


      // return Observable.create(observer => {
      reader.onloadend = (e) => {
        let data_string: string = reader.result;
        // console.log(data_string);
        //
        this.data = this.parse_json(data_string);

        // set the domain of the color scale
        this.setColorScale();

        // // temporary: to save the data
        // let jsonData = JSON.stringify(this.data);
        // function download(content, fileName, contentType) {
        //   var a = document.createElement("a");
        //   var file = new Blob([content], { type: contentType });
        //   a.href = URL.createObjectURL(file);
        //   a.download = fileName;
        //   a.click();
        // }
        // download(jsonData, 'jsonData.json', 'text/plain');

        // observer.next(this.data);
        // console.log(this.dataSource)
        // console.log(this.dataRetrived$)
        this.dataSource.next({ 'df': this.data, 'colors': this.colorScale });
        // console.log(this.dataSource)
        // console.log(this.dataRetrived$)
        // this.colorSource.next(this.colorScale);
        // observer.complete();

      }
      // })
    }

    // console.log(this.data);
    // return of(this.data);
  }

  //   uploadImage(e) {
  //     const file = e.target.files[0];
  //
  //   const reader = new FileReader();
  //   reader.readAsText(file);
  //   return Observable.create(observer => {
  //     reader.onloadend = () => {
  //       observer.next(reader.result);
  //       observer.complete();
  //     };
  //   });
  // }

  // Convert json to an array with an Object for each row.
  // Assumes parsed object becomes an object of objects
  // TODO: convert to pipe, write csv parser.
  parse_json(json_string: string): FluorData[] {
    let parsed: Object = JSON.parse(json_string);

    let cols = Object.keys(parsed);

    // Possible BUG: assuming each column has the same number of rows
    let num_rows = Object.keys(parsed[cols[0]]).length;

    let arr: Array<any> = [];

    for (let i = 0; i < num_rows; i++) {
      let tmp = {};
      for (let key in parsed) {
        tmp[key] = parsed[key][i]
      }
      arr.push(tmp)
    }

    return arr;

  }
  //
  // read_json(event) {
  //   this.read_data(event);
  //
  //   let json_df = this.parse_json(this.data);
  //
  //   console.log(json_df)
  //   return(json_df)
  // }


}


// csv parser. Note: doesn't return exactly what needed, and simpler to use .json for the moment.
// private extractData(data) { // Input csv data to the function
//
//   let csvData = data;
//   let allTextLines = csvData.split(/\r\n|\n/);
//   console.log(allTextLines)
//   let headers = allTextLines[0].split(',');
//   console.log(headers)
//   let lines = [];
//
//   for (let i = 0; i < allTextLines.length; i++) {
//     // split content based on comma
//     let data = allTextLines[i].split(',');
//     if (data.length == headers.length) {
//       let tarr = [];
//       for (let j = 0; j < headers.length; j++) {
//         tarr.push(data[j]);
//       }
//       lines.push(tarr);
//     }
//   }
//   console.log(lines); //The data in the form of 2 dimensional array.
//   return lines;
// }
