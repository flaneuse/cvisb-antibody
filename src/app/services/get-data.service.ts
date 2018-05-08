import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


// Required to return asynchronously
// Async help: https://stackoverflow.com/questions/47062994/angular-2-4-filereader-service
export class GetDataService {
  data: any;

  constructor() { }

  test_func() {
    console.log('yipppee')
  }

  // Modified from https://stackoverflow.com/questions/45441962/how-to-upload-a-csv-file-and-read-them-using-angular2
  read_json(event: any): Observable<any> {
    let files: FileList = event.target.files;

    // console.log(files);
    if (files && files.length > 0) {
      let file: File = files.item(0);
      // console.log(file.name);
      // console.log(file.size);
      // console.log(file.type);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      return Observable.create(observer => {
        reader.onloadend = (e) => {
          let data_string: string = reader.result;
          // console.log(data_string);
          //
          this.data = this.parse_json(data_string);

          let jsonData = JSON.stringify(this.data);
          function download(content, fileName, contentType) {
            var a = document.createElement("a");
            var file = new Blob([content], { type: contentType });
            a.href = URL.createObjectURL(file);
            a.download = fileName;
            a.click();
          }
          download(jsonData, 'jsonData.json', 'text/plain');

          observer.next(this.data);
          observer.complete();

        }
      })
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
  parse_json(json_string: string) {
    let parsed: Object = JSON.parse(json_string);

    let cols = Object.keys(parsed);

    // Possible BUG: assuming each column has the same number of rows
    let num_rows = Object.keys(parsed[cols[0]]).length;

    let arr: Array<Object> = [];

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
