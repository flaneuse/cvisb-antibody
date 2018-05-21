import { Component, OnInit, Input, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';

import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

import { DilutionData } from '../../_classes/dilution-data';

@Component({
  selector: 'app-line-trace',
  templateUrl: './line-trace.component.html',
  styleUrls: ['./line-trace.component.scss'],
  encapsulation: ViewEncapsulation.Native
})

export class LineTraceComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private colorScale: any;
  private yMax: number = 152;

  private df: DilutionData = {
    'expt_id': 'BMGEXP573-ADCP',
    'sample_id': 'TUL 28',
    'values': [
      { 'dilution_factor': 150, 'fluor_score': 133.508235 },
      { 'dilution_factor': 750, 'fluor_score': 121.869465 },
      { 'dilution_factor': 3750,'fluor_score': 35.419185 }],
    'sample_mean': 312549
  };

  // -- Plot aes params --
  dot_radius: number = 6;

  // --- Plot sizing ---
  private element: any;
  private element_dims: any;
  private margin: any = { top: 40, bottom: 40, left: 40, right: 40 };
  private width: number;
  private height: number;

  // --- Selectors ---
  private plot: any;

  // --- Scales ---
  private x: any;
  private y: any;
  private xAxis: any;
  private yAxis: any;

  constructor() { }

  ngOnInit() {
    // this.df.dilution = this.df.dilution_factor.map(d => 1 / d);
    console.log(this.df)

    this.createChart();
    this.updateChart();
  }

  getSVGDims() {
    // Find container; define width/height of svg obj.
    this.element = this.chartContainer.nativeElement;
    this.element_dims = this.element.getBoundingClientRect();
    this.width = this.element.offsetWidth - this.margin.left - this.margin.right;
    this.height = this.element.offsetHeight - this.margin.top - this.margin.bottom;
  }

  createChart() {
    this.getSVGDims();

    // Set up axes
    this.x = d3.scaleLinear()
      .range([0, this.width]);

    this.y = d3.scaleLinear()
      .range([this.height, 0]);

    // Append SVG
    const svg = d3.select(this.element)
      .append('svg')
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom);

    // selectors
    this.plot = svg.append("g")
      .attr('class', 'plot')
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);
  }

  updateChart() {
    // Update the axis limits
    let xVals = (this.df.values.map(d => d.dilution_factor));
    let xRange = [d3.min(xVals) - 300, d3.max(xVals) + 320];
    this.x.domain(xRange);
    this.xAxis = d3.axisBottom(this.x)
    .tickValues(xVals)
    .tickFormat(d => "1:" + d);

    let yRange = [0, this.yMax];
    this.y.domain(yRange)
    this.yAxis = d3.axisLeft(this.y);

    // polygon generator
    var area_init = d3.area()
    .curve(d3.curveLinear)
    .x(d => this.x(d.dilution_factor))
    .y0(this.y(0))
    .y1(d => this.y(0));

    var area = d3.area()
    .curve(d3.curveLinear)
    .x(d => this.x(d.dilution_factor))
    .y0(this.y(0))
    .y1(d => this.y(d.fluor_score));

    var path_init = d3.line()
    .x(d => this.x(d.dilution_factor))
    .y(d => this.y(0));

    var path = d3.line()
    .x(d => this.x(d.dilution_factor))
    .y(d => this.y(d.fluor_score));

    // AXIS
    this.plot.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(this.xAxis);

    this.plot.append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(0," + 0 + ")")
      .call(this.yAxis);

    // Append filled polygon underneath
     this.plot.append("path")
      .datum(this.df.values)
      .attr("class", "fluor-area")
      .attr("d", area_init)
      .attr("fill", 'green')
      .transition('animate-initial')
      .duration(1000)
      .attr("d", area);

      this.plot.append("path")
       .datum(this.df.values)
       .attr("class", "fluor-path")
       .attr("d", path_init)
       .transition('animate-initial')
       .duration(1000)
       .attr("d", path);

    // Append data measurements
    let dots = this.plot.append("g");

    dots.selectAll('fluor-dots')
      .data(this.df.values)
      .enter().append('circle')
      .attr('class', 'fluor-dots')
      .attr('cx', d => this.x(d.dilution_factor))
      .attr('cy', this.y(0))
      .attr('r', this.dot_radius)
      .transition('animate-initial')
      .duration(1000)
      .attr('cy', d => this.y(d.fluor_score));

  }

}
