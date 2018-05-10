import { Component, OnInit, Input, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/';

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
  @Input() private plate_num: number;
  @Input() private df: Array<Object> = [];

  nested_df: Array<Object>;

  // df: Array<Object> = [
  //   { 'sample_id': 'TUL5', 'avg': 22.4791, 'indivs': [31.06754, 18.08720, 18.28256], 'row': "E", 'cols': [1, 2, 3] },
  //   { 'sample_id': 'TUL23', 'avg': 54.80144, 'indivs': [49.96560, 57.62928, 56.80943], 'row': "G", 'cols': [7, 8, 9] },
  //   { 'sample_id': 'TUL3', 'avg': 8.75909, 'indivs': [9.07368, 8.61540, 8.58819], 'row': "C", 'cols': [1, 2, 3] }
  // ]
  //
  //

// TODO: properly calc ref lines
  ref_lines: Array<Object> = [
    { 'label': 'negative control', 'value': 0.1438786667 },
    { 'label': 'positive control', 'value': 180.97593 },
    { 'label': 'plate median', 'value': d3.median(this.df.map(d => d.fluor_score)) }
  ];

  // --- Plot sizing ---
  private element: any;
  private element_dims: any;
  private margin: any = { top: 50, bottom: 50, left: 50, right: 50 };
  private width: number;
  private height: number;
  // private rect_width: number;

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


  constructor() {

  }



  ngOnInit() {
    this.df = this.df.filter(d => d.plate == this.plate_num);

    this.nested_df = d3.nest()
      .key(d => d.sample_id)
      .rollup(function(leaves: any) {
        return {
          'num_obs': leaves.length,
          'sample_mean': d3.mean(leaves, d => d.fluor_score),
          'indivs': leaves.map(d => d.fluor_score),
          'not_control': leaves.map(d => d.sample_type).includes('experiment sample')
        }
      })
      .entries(this.df)
      .sort((a, b) => a.value.sample_mean - b.value.sample_mean);

    // console.log(this.nested_df)

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

    // this.rect_width = this.width / this.df.length;

    this.x = d3.scaleBand().range([0, this.width]).domain(this.nested_df.map(d => d.key));

    let indiv_max = this.nested_df.map(d => d3.max(d.value.indivs))
    // this.y = d3.scaleLinear().range([this.height, 0]).domain([0, d3.max(indiv_max)])
    this.y = d3.scaleLog().range([this.height, 0]).domain([.05, d3.max(indiv_max)])


    // this.y = d3.scaleLinear().range([this.height, 0]).domain([0, d3.max(this.df.map(d => d.value.indivs.map(g => g)))]);

    // Append SVG
    const svg = d3.select(this.element)
      .append('svg')
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom);

    // selectors
    this.dotplot = svg.append("g")
      .attr("id", "dotplot")
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);


    let refs = this.dotplot.selectAll('.ctrl-line')
      .data(this.ref_lines)
      .enter().append('g');

    refs.append('line')
      .attr('class', 'ref-line')
      .classed('ctrl-line', d => d.label != 'plate median')
      .attr("y1", (d, i) => this.y(d.value))
      .attr("y2", (d, i) => this.y(d.value))
      .attr("x1", 0)
      .attr("x2", this.width);

    refs.append('text')
      .attr('class', 'ref-label')
      .classed('right', d => d.label == 'negative control')
      .attr("y", d => this.y(d.value))
      .attr('dy', -10)
      .attr("x", 0)
      .attr('dx', d => d.label == 'negative control' ? this.width : 10)
      .text(d => d.label);

    var grp = this.dotplot.selectAll('.avg')
      .data(this.nested_df).enter().append('g')
    // .enter().append('svg')
    // .attr("width", this.width/3)
    // .attr("height", this.height);

    //       grp.append(g)
    //       .attr('class', 'sm-mult')
    // .attr("transform", (d,i) => `translate(${this.width/3 * i}, 0)`);
    //

    // AXIS

    // this.dotplot.append("g")
    //   .attr("class", "axis axis--x")
    //   .attr("transform", "translate(0," + this.height + ")")
    //   .call(d3.axisBottom(this.x));

    this.dotplot.append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(0," + 0 + ")")
      .call(d3.axisLeft(this.y));







    grp.append('g')
      .attr('class', 'indiv-grp')
      .classed('expt-sample', d => d.value.not_control)
      .attr('transform', (d, i) => 'translate(' + (this.x(d.key) + this.x.bandwidth() / 2) + ',0)')
      .selectAll('.indiv')
      .data(d => d.value.indivs)
      .enter().append("circle")
      .attr("cy", (d, i) => this.y(d))
      .attr("cx", 0)
      .attr("r", this.indiv_r)
      .attr("class", "indiv");

    grp.append('line')
      .attr('class', 'avg-glow')
      .classed('expt-sample', d => d.value.not_control)
      .attr("y1", d => this.y(d.value.sample_mean))
      .attr("y2", d => this.y(d.value.sample_mean))
      .attr("x1", d => this.x(d.key) - this.avg_width + this.x.bandwidth() / 2)
      .attr("x2", d => this.x(d.key) + this.avg_width + this.x.bandwidth() / 2)
      .style("stroke", d => this.colorScale(d.value.sample_mean));

    grp.append('line')
      .attr('class', 'avg')
      .classed('expt-sample', d => d.value.not_control)
      .attr("y1", d => this.y(d.value.sample_mean))
      .attr("y2", d => this.y(d.value.sample_mean))
      .attr("x1", d => this.x(d.key) - this.avg_width + this.x.bandwidth() / 2)
      .attr("x2", d => this.x(d.key) + this.avg_width + this.x.bandwidth() / 2);

    grp.append('text')
      .attr('class', 'ctrl-label')
      .classed('display-off', d => d.value.not_control)
      .attr("y", d => this.y(d.value.sample_mean))
      .attr("dy", -50)
      .attr("x", d => this.x(d.key) + this.x.bandwidth() / 2)
      .text(d => d.key);

    // grp.append('line')
    //     .attr('class', 'divider')
    //     .attr("y1", 0)
    //     .attr("y2", this.height)
    //     .attr("x1", d => this.x(d.key) + this.x.bandwidth())
    //     .attr("x2", d => this.x(d.key) + this.x.bandwidth());
  }

}
