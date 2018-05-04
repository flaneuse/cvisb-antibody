import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

@Component({
  selector: 'app-plate-heatmap',
  templateUrl: './plate-heatmap.component.html',
  styleUrls: ['./plate-heatmap.component.scss']
})
export class PlateHeatmapComponent implements OnInit {

  fluorcts: Array<Object> ;
  cols: Array<string> = ['plate 1', '1','2','3']

  constructor() { }

  ngOnInit() {
    let colorScale = d3.scaleSequential(d3Chromatic.interpolateYlGn);

    colorScale.domain([0, 600])

    this.fluorcts = [
      {'row': 'A', 'fluor': [
      {'cts': 100, 'fill': colorScale(100), 'color': 'black'},
      {'cts': 200, 'fill': colorScale(200), 'color': 'black'},
      {'cts': 300, 'fill': colorScale(300), 'color': 'black'}]},
      {'row': 'B', 'fluor': [
      {'cts': 400, 'fill': colorScale(400), 'color': 'white'},
      {'cts': 500, 'fill': colorScale(500), 'color': 'white'},
      {'cts': 600, 'fill': colorScale(600), 'color': 'white'}]}
    ];

    console.log(this.fluorcts)

  }


}
