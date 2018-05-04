import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';

import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

@Component({
  selector: 'app-plate-heatmap',
  templateUrl: './plate-heatmap.component.html',
  styleUrls: ['./plate-heatmap.component.scss'],
  encapsulation: ViewEncapsulation.Native
})

export class PlateHeatmapComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;

  fluorcts: Array<Object>;
  cols: Array<string> = ['plate 1', '1', '2', '3']
  df: Array<Object> = [
    { 'sample_id': 'TUL5', 'avg': 22.4791, 'indivs': [31.06754, 18.08720, 18.28256], 'row': "E", 'cols': [1, 2, 3] },
    { 'sample_id': 'TUL23', 'avg': 54.80144, 'indivs': [49.96560, 57.62928, 56.80943], 'row': "G", 'cols': [7, 8, 9] },
    { 'sample_id': 'TUL3', 'avg': 8.75909, 'indivs': [9.07368, 8.61540, 8.58819], 'row': "C", 'cols': [1,2,3] }
  ]

  // --- Plot sizing ---
  private element: any;
  private element_dims: any;
  private margin: any = { top: 50, bottom: 0, left: 50, right: 50 };
  private width: number;
  private height: number;
  private rect_width: number;

  // --- Selectors ---
  private heatmap: any;
  // --- Scales ---
  private y: any;

  private colorScale = d3.scaleSequential(d3Chromatic.interpolateYlGn).domain([0, 200]);

  constructor() { }

  ngOnInit() {
    this.df = this.df.sort((a,b) => a.avg - b.avg);

    //
    // this.fluorcts = [
    //   {
    //     'row': 'A', 'fluor': [
    //       { 'cts': 100, 'fill': this.colorScale(100), 'color': 'black' },
    //       { 'cts': 200, 'fill': this.colorScale(200), 'color': 'black' },
    //       { 'cts': 300, 'fill': this.colorScale(300), 'color': 'black' }]
    //   },
    //   {
    //     'row': 'B', 'fluor': [
    //       { 'cts': 400, 'fill': this.colorScale(400), 'color': 'white' },
    //       { 'cts': 500, 'fill': this.colorScale(500), 'color': 'white' },
    //       { 'cts': 600, 'fill': this.colorScale(600), 'color': 'white' }]
    //   }
    // ];
    //
    // console.log(this.fluorcts)

    this.createChart();

  }


  getSVGDims() {
    // Find container; define width/height of svg obj.
    this.element = this.chartContainer.nativeElement;
    this.element_dims = this.element.getBoundingClientRect();
    this.width = this.element.offsetWidth/2 - this.margin.left - this.margin.right;
    this.height = this.element.offsetHeight - this.margin.top - this.margin.bottom;
  }

  // Data-independent setup
  createChart() {
    this.getSVGDims();

    this.rect_width = this.width / this.df.length;

    this.y = d3.scaleLinear().range([this.height, 0]).domain([0, 150]);

    // Append SVG
    const svg = d3.select(this.element)
      .append('svg')
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom);

    // selectors
    this.heatmap = svg.append("g")
      .attr("id", "heatmap")
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

    let grp1 = this.heatmap.selectAll('.avg')
      .data(this.df).enter().append('g');

    // TODO: fix sizes for width/height
    // Avg heatmap
    grp1
      .append('rect')
      .attr('class', '.avg-heatmap')
      .attr('x', (d, i) => i * this.rect_width)
      .attr('width', this.rect_width)
      .attr('y', this.height / 3)
      .attr('height', this.height / 3 * 2)
      .style('fill', d => this.colorScale(d.avg))

    // Avg label
    grp1.append('text')
      .attr('class', 'avg-label')
      .attr('x', (d, i) => i * this.rect_width + this.rect_width/2)
      .attr('y', this.height / 3 * 2)
      .text(d => d3.format("(.1f")(d.avg));

    // individual heatmap -- fade
    grp1.append("g")
      .attr('class', 'indiv-grp')
      .attr('transform', (d, i) => 'translate(' + this.rect_width * i + ',0)')
      .selectAll('.indiv-heatmap')
      .data(d => d.indivs)
      .enter().append('rect')
      .attr('class', '.indiv-heatmap')
      .attr('x', (d, i) => i * this.rect_width / 3)
      .attr('width', this.rect_width / 3)
      .attr('y', 0)
      .attr('height', this.height)
      .style('fill', d => this.colorScale(d))
      .transition('fade')
      .delay(2000)
      .duration(500)
      .style('opacity', 0)

// inidividual heatmap:
      grp1.append("g")
        .attr('class', 'indiv-grp')
        .attr('transform', (d, i) => 'translate(' + this.rect_width * i + ',0)')
        .selectAll('.indiv-heatmap')
        .data(d => d.indivs)
        .enter().append('rect')
        .attr('class', '.indiv-heatmap')
        .attr('x', (d, i) => i * this.rect_width / 3)
        .attr('width', this.rect_width / 3)
        .attr('y', 0)
        .attr('height', this.height/3)
        .style('fill', d => this.colorScale(d))
  }


}
