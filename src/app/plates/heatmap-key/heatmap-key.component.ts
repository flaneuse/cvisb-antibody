import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';

import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

@Component({
  selector: 'app-heatmap-key',
  templateUrl: './heatmap-key.component.html',
  styleUrls: ['./heatmap-key.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class HeatmapKeyComponent implements OnInit {

  @ViewChild('chart') private chartContainer: ElementRef;

  private df: Array<Object> = [
    {
      'col': 1,
      'row': 'A',
      'sample_id': 'sample mean',
      'sample_mean': 83.11783666666666,
      'fluor_score': 85.83652 //, 72.33447, 91.18252],
    },
    {
      'col': 2,
      'row': 'A',
      'sample_id': 'sample mean',
      'sample_mean': 83.11783666666666,
      'fluor_score': 72.33447
    },
    {
      'col': 3,
      'row': 'A',
      'sample_id': 'sample mean',
      'sample_mean': 83.11783666666666,
      'fluor_score': 91.18252
    }
  ];

  // --- Plot sizing ---
  private element: any;
  private element_dims: any;
  private margin: any = { top: 25, bottom: 5, left: 5, right: 5 };
  private width: number;
  private height: number;
  private rect_width: number;

  // --- Selectors ---
  private heatmap: any;
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

    this.rect_width = this.width;

    this.x = d3.scaleBand().range([0, this.width]).domain(this.df.map((d: any) => d.col));
    this.xAxis = d3.axisTop(this.x);

    this.y = d3.scaleBand()
      // .padding(0.55)
      .range([0, this.height])
      .domain(this.df.map((d: any) => d.row));
    this.yAxis = d3.axisLeft(this.y);

    // Append SVG
    const svg = d3.select(this.element)
      .append('svg')
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom);

    // selectors
    this.heatmap = svg.append("g")
      .attr("id", "heatmap")
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

    let grp1 = this.heatmap.selectAll('.rects')
      .data(this.df)
      .enter().append('g');

    // merged average
    // TODO: fix the periodicity so not hard coded.
    this.sel_avg = this.heatmap.selectAll('.avg-heatmap')
      .data(this.df.filter((d, i) => !(i % 3)))
      .enter()
      .append('g')
      .style('opacity', 1);

    this.sel_avg.append('rect')
      .attr('class', 'avg-heatmap')
      .attr('x', (d, i) => this.x(d.col))
      .attr('width', this.x.bandwidth() * 3)
      .attr('y', d => this.y(d.row) + this.y.bandwidth() / 3)
      .attr('height', this.y.bandwidth() / 3 * 2)
      .style('fill', d => this.colorScale(d.sample_mean));


    // merged average
    // TODO: fix the periodicity so not hard coded.
    this.sel_avg.append('text')
      .attr('class', 'annotation')
      .attr('x', (d, i) => this.x(d.col) + this.x.bandwidth() * 1.5)
      .attr('y', d => this.y(d.row) + this.y.bandwidth() / 3 * 2)
      .text(d => d.sample_id);

    this.heatmap.append('text')
      // .attr('class', 'annotation')
      .attr('x', this.x.bandwidth()/2 - 5)
      .attr('y', -this.margin.top / 2)
      .text('replicates');


    // individual average
    this.sel_chg = grp1
      .append('rect')
      .attr('class', 'av-heatmap')
      .attr('x', (d, i) => this.x(d.col))
      .attr('width', this.x.bandwidth())
      .attr('y', d => this.y(d.row))
      .attr('height', this.y.bandwidth())
      .style('fill', d => this.colorScale(d.fluor_score));

    // individual measurements
    this.sel_indivs = grp1
      .append('rect')
      .attr('class', 'indiv-heatmap')
      .attr('x', (d, i) => this.x(d.col))
      .attr('width', this.x.bandwidth())
      .attr('y', d => this.y(d.row))
      .attr('height', this.y.bandwidth() / 3)
      .style('fill', d => this.colorScale(d.fluor_score));

// lines to the borders
      this.sel_indivs = grp1
        .append('line')
        .attr('class', 'repl-leader')
        .attr('x1', (d, i) => this.x(d.col) + this.x.bandwidth()/2)
        .attr('x2', (d, i) => this.x(d.col) + this.x.bandwidth()/2)
        .attr('y1', -this.margin.top / 2 + 5)
        .attr('y2', 10)

    // TODO: fix the periodicity so not hard coded.
    // border: avg
    this.heatmap.selectAll('.avg-border')
      .data(this.df.filter((d, i) => !(i % 3)))
      .enter()
      .append('rect')
      .attr('class', 'avg-border')
      .attr('x', (d, i) => this.x(d.col))
      .attr('width', this.x.bandwidth() * 3)
      .attr('y', d => this.y(d.row))
      .attr('height', this.y.bandwidth());


  }
}
