import { Component, OnInit, OnChanges, Input, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/';

import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

import { FluorData } from '../../_classes';

@Component({
  selector: 'app-distrib-plot',
  templateUrl: './distrib-plot.component.html',
  styleUrls: ['./distrib-plot.component.scss'],
  encapsulation: ViewEncapsulation.Native
})

export class DistribPlotComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private plate_num: number;
  @Input() private df: Array<FluorData> = [];
  @Input() private colorScale: any;

  nested_df: Array<any>;


  ref_lines: Array<Object> = [];

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

  constructor() {

  }



  ngOnInit() {
    // console.log(this.nested_df)

    this.createChart();
  }

  ngOnChanges() {
    this.df = this.df.filter(d => d.plate == this.plate_num);

    this.calcSummaryStats();

    this.createChart();
    this.nested_df = d3.nest()
      .key((d: any) => d.sample_id)
      .rollup(function(leaves: any): any {
        return {
          'num_obs': leaves.length,
          'sample_mean': d3.mean(leaves, (d:any) => d.fluor_score),
          'indivs': leaves.map(d => d.fluor_score),
          'not_control': leaves.map(d => d.sample_type).includes('experiment sample')
        }
      })
      .entries(this.df)
      .sort((a: any, b: any) => a.value.sample_mean - b.value.sample_mean);

    this.populateChart();
    // }
  }

  getSVGDims() {
    // Find container; define width/height of svg obj.
    this.element = this.chartContainer.nativeElement;
    this.element_dims = this.element.getBoundingClientRect();
    this.width = this.element.offsetWidth - this.margin.left - this.margin.right;
    this.height = this.element.offsetHeight - this.margin.top - this.margin.bottom;
  }

  calcSummaryStats() {
    this.ref_lines = [
      { 'label': 'negative control', 'value': d3.mean(this.df.filter(d => d.sample_type === 'negative control').map(d => d.fluor_score)) },
      { 'label': 'positive control', 'value': d3.mean(this.df.filter(d => d.sample_type === 'positive control').map(d => d.fluor_score)) },
      { 'label': 'plate median', 'value': d3.median(this.df.map(d => d.fluor_score)) }
    ];
  }

  // Data-independent setup
  createChart() {
    this.getSVGDims();

    // this.rect_width = this.width / this.df.length;

    this.x = d3.scaleBand().range([0, this.width]);
    // this.y = d3.scaleLinear().range([this.height, 0]).domain([0, d3.max(indiv_max)])
    this.y = d3.scaleLog().range([this.height, 0]);


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

  }

  populateChart() {
    // update domains of scales
    this.x.domain(this.nested_df.map(d => d.key));

    let indiv_max = this.nested_df.map(d => d3.max(d.value.indivs));
    this.y.domain([.05, d3.max(indiv_max)]);

    this.yAxis = d3.axisLeft(this.y)
    .ticks(3)
    .tickFormat(d3.format(".0f"));

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
      .call(this.yAxis);







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
