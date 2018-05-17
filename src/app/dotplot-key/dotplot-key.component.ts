import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';

import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

@Component({
  selector: 'app-dotplot-key',
  templateUrl: './dotplot-key.component.html',
  styleUrls: ['./dotplot-key.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class DotplotKeyComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;

  private nested_df: Array<Object> = [{
    'key': 'TUL 8',
    'value': {
      'indivs': [91.18252, 85.83652, 72.33447],
      'sample_mean': 83.11783666666666
    }
  }];

  // --- Plot sizing ---
  private element: any;
  private element_dims: any;
  private margin: any = { top: 15, bottom: 15, left: -25, right: 75 };
  private width: number;
  private height: number;
  private rect_width: number;
  private indiv_r: number = 6;
  private avg_width: number = 20;

  // --- Selectors ---
  private dotplot: any;
  private sel_avg: any;
  private sel_chg: any;
  private sel_indivs: any;

  // --- Scales ---
  private y: any;
  private x: any;
  private xAxis: any;
  private yAxis: any;

  private colorScale = d3.scaleSequential(d3Chromatic.interpolateYlGn).domain([0, 200]);

  constructor() { }

  ngOnInit() {
    this.createChart();
  }


  getSVGDims() {
    // Find container; define width/height of svg obj.
    this.element = this.chartContainer.nativeElement;
    this.element_dims = this.element.getBoundingClientRect();
    this.width = this.element.offsetWidth - this.margin.left - this.margin.right;
    this.height = this.element.offsetHeight - this.margin.top - this.margin.bottom;
  }


  // Data-independent setup
  createChart() {
    this.getSVGDims();

    this.x = d3.scaleBand()
      .range([0, this.width])
      .domain(this.nested_df
      .map(d => d.key));

    let indiv_min = this.nested_df.map(d => d3.min(d.value.indivs))
    let indiv_max = this.nested_df.map(d => d3.max(d.value.indivs))
    // this.y = d3.scaleLinear().range([this.height, 0]).domain([0, d3.max(indiv_max)])
    this.y = d3.scaleLog().range([this.height, 0]).domain([d3.min(indiv_min), d3.max(indiv_max)])


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




    var grp = this.dotplot.selectAll('.avg')
      .data(this.nested_df).enter().append('g')

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

    grp.append('text')
      .attr('class', 'key-label')
      .attr("y", d => this.y(d.value.sample_mean))
      .attr("x", this.width + this.margin.left)
      .attr("dx", -5)
      .html("&#8212; sample mean");

    grp.append('text')
      .attr('class', 'key-label')
      .attr("y", d => this.y(d.value.indivs[0]))
      .attr("dx", -5)
      .attr("x", this.width + this.margin.left)
      .html("&#8212; replicate");

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



  }
}
