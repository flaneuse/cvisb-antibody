import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';

import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

@Component({
  selector: 'app-distrib-plot',
  templateUrl: './distrib-plot.component.html',
  styleUrls: ['./distrib-plot.component.scss'],
  encapsulation: ViewEncapsulation.Native
})

export class DistribPlotComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;


  df: Array<Object> = [
    { 'sample_id': 'TUL5', 'avg': 22.4791, 'indivs': [31.06754, 18.08720, 18.28256], 'row': "E", 'cols': [1, 2, 3] },
    { 'sample_id': 'TUL23', 'avg': 54.80144, 'indivs': [49.96560, 57.62928, 56.80943], 'row': "G", 'cols': [7, 8, 9] },
    { 'sample_id': 'TUL3', 'avg': 8.75909, 'indivs': [9.07368, 8.61540, 8.58819], 'row': "C", 'cols': [1, 2, 3] }
  ]

  ref_lines: Array<Object> = [
    { 'label': 'negative control', 'value': 9.65 },
    { 'label': 'positive control', 'value': 105.48 },
    { 'label': 'plate median', 'value': 33.61 }
  ];

  // --- Plot sizing ---
  private element: any;
  private element_dims: any;
  private margin: any = { top: 50, bottom: 50, left: 50, right: 50 };
  private width: number;
  private height: number;
  private rect_width: number;

  // --- Selectors ---
  private dotplot: any;

  // --- Scales ---
  private x: any;
  private y: any;
  private xAxis: any;
  private yAxis: any;

  private indiv_r: number = 6;
  private avg_width: number = 20;

  private colorScale = d3.scaleSequential(d3Chromatic.interpolateYlGn).domain([0, 200]);


  constructor() { }

  ngOnInit() {
    this.df = this.df.sort((a,b) => a.avg - b.avg);

    this.createChart();
  }

  getSVGDims() {
    // Find container; define width/height of svg obj.
    this.element = this.chartContainer.nativeElement;
    this.element_dims = this.element.getBoundingClientRect();
    this.width = this.element.offsetWidth / 2 - this.margin.left - this.margin.right;
    this.height = this.element.offsetHeight - this.margin.top - this.margin.bottom;
  }

  // Data-independent setup
  createChart() {
    this.getSVGDims();

    this.rect_width = this.width / this.df.length;

    this.x = d3.scaleBand().range([0, this.width]).domain(this.df.map(d => d.sample_id));

    this.y = d3.scaleLinear().range([this.height, 0]).domain([0, 150]);

    // Append SVG
    const svg = d3.select(this.element)
      .append('svg')
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom);

    // selectors
    this.dotplot = svg.append("g")
      .attr("id", "heatmap")
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);


    var grp = this.dotplot.selectAll('.avg')
      .data(this.df).enter().append('g')
    // .enter().append('svg')
    // .attr("width", this.width/3)
    // .attr("height", this.height);

    //       grp.append(g)
    //       .attr('class', 'sm-mult')
    // .attr("transform", (d,i) => `translate(${this.width/3 * i}, 0)`);
    //

    // AXIS

    this.dotplot.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + 0 + ")")
      .call(d3.axisTop(this.x));

    this.dotplot.append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(0," + 0 + ")")
      .call(d3.axisLeft(this.y));


    grp.selectAll('.ctrl-line')
      .data(this.ref_lines)
      .enter().append('line')
      .attr('class', 'ref-line')
      .classed('ctrl-line', d => d.label != 'plate median')
      .attr("y1", (d, i) => this.y(d.value))
      .attr("y2", (d, i) => this.y(d.value))
      .attr("x1", 0)
      .attr("x2", this.width);


    grp.append('g')
      .attr('class', 'indiv-grp')
      .attr('transform', (d, i) => 'translate(' + (this.x(d.sample_id) + this.x.bandwidth()/2) + ',0)')
      .selectAll('.indiv')
      .data(d => d.indivs)
      .enter().append("circle")
      .attr("cy", (d, i) => this.y(d))
      .attr("cx", 0)
      .attr("r", this.indiv_r)
      .attr("class", "indiv")

    grp.append('line')
      .attr('class', 'avg-glow')
      .attr("y1", d => this.y(d.avg))
      .attr("y2", d => this.y(d.avg))
      .attr("x1", d => this.x(d.sample_id) - this.avg_width + this.x.bandwidth()/2)
      .attr("x2", d => this.x(d.sample_id) + this.avg_width + this.x.bandwidth()/2)
      .style("stroke", d => this.colorScale(d.avg));

    grp.append('line')
      .attr('class', 'avg')
      .attr("y1", (d, i) => this.y(d.avg))
      .attr("y2", (d, i) => this.y(d.avg))
      .attr("x1", d => this.x(d.sample_id) - this.avg_width + this.x.bandwidth()/2)
      .attr("x2", d => this.x(d.sample_id) + this.avg_width + this.x.bandwidth()/2);
  }

}
