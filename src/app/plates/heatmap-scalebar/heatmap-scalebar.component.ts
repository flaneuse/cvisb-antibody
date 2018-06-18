import { Component, OnInit, Input, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';

import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

@Component({
  selector: 'app-heatmap-scalebar',
  templateUrl: './heatmap-scalebar.component.html',
  styleUrls: ['./heatmap-scalebar.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class HeatmapScalebarComponent implements OnInit {

  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private plate_num: number;
  @Input() private df: Array<Object> = [];
  @Input() private colorScale: any;

  nested_df: Array<Object>;


  ref_lines: Array<Object> = [];

  // --- Plot sizing ---
  private element: any;
  private element_dims: any;
  private margin: any = { top: 15, bottom: 50, left: 50, right: 50 };
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


  private scalebar_width: number = 15;


  constructor() { }

  ngOnInit() {
    // console.log(this.nested_df)

    this.df = this.df.filter((d: any) => d.plate == this.plate_num);


    this.nested_df = d3.nest()
      .key((d: any) => d.sample_id)
      .rollup(function (leaves: any): any {
        return {
          'num_obs': leaves.length,
          'sample_mean': d3.mean(leaves, (d: any) => d.fluor_score),
          'indivs': leaves.map(d => d.fluor_score),
          'not_control': leaves.map(d => d.sample_type).includes('experiment sample')
        }
      })
      .entries(this.df)
      .sort((a: any, b: any) => a.value.sample_mean - b.value.sample_mean);
    // console.log(this.nested_df)
    this.createChart();

    // }
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


    // update domains of scales
    this.x.domain(this.nested_df.map((d: any) => d.key));

    let indiv_max = this.nested_df.map((d: any) => d3.max(d.value.indivs));
    this.y.domain([.05, d3.max(indiv_max)]);

    //Append a defs (for definition) element to your SVG
    var defs = svg.append("defs");

    //Append a linearGradient element to the defs and give it a unique id
    var linearGradient = defs.append("linearGradient")
      .attr("id", "linear-gradient_" + this.plate_num);

    linearGradient.selectAll('stop')
      .data(this.nested_df)
      .enter().append('stop')
      .attr('offset', (d: any, i) => i / (this.nested_df.length - 1))
      .attr('stop-color', (d: any, i) => this.colorScale(d.value.sample_mean));



    //Draw the rectangle and fill with gradient
    this.dotplot.append("rect")
      .attr('class', 'scalebar')
      .attr("width", this.width)
      .attr("height", this.scalebar_width)
      .style("fill", `url(#linear-gradient_${this.plate_num})`);

    this.dotplot.append("text")
      .attr('class', 'scalebar-label')
      .attr("x", this.width / 2)
      .attr("y", -5)
      .html("increasing fluorescence score &#8594;");

  }

}
