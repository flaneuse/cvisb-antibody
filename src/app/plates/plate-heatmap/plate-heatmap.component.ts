import { Component, OnInit, OnChanges, ViewChild, ViewEncapsulation, ElementRef, Input } from '@angular/core';

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
  @Input() private plate_num: number;
  @Input() private df: Array<Object> = [];
  @Input() private colorScale: any;


  // df: Array<Object> = [
  //   { 'sample_id': 'TUL5', 'avg': 22.4791, 'indivs': [31.06754, 18.08720, 18.28256], 'row': "E", 'cols': [1, 2, 3] },
  //   { 'sample_id': 'TUL23', 'avg': 54.80144, 'indivs': [49.96560, 57.62928, 56.80943], 'row': "G", 'cols': [7, 8, 9] },
  //   { 'sample_id': 'TUL3', 'avg': 8.75909, 'indivs': [9.07368, 8.61540, 8.58819], 'row': "C", 'cols': [1, 2, 3] }
  // ]


  // --- Plot sizing ---
  private element: any;
  private element_dims: any;
  private margin: any = { top: 50, bottom: 0, left: 50, right: 50 };
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

  // private colorScale = d3.scaleSequential(d3Chromatic.interpolateYlGn).domain([0, 200]);

  constructor() { }

  ngOnInit() {
    this.df = this.df.filter(d => d.plate == this.plate_num);
    // console.log(this.colorScale.domain())

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
    this.width = this.element.offsetWidth - this.margin.left - this.margin.right;
    this.height = this.element.offsetHeight - this.margin.top - this.margin.bottom;
  }

  showAvg(event) {
    this.sel_indivs
      .transition()
      .style('stroke-opacity', 0)
      .transition('fade')
      // .delay(1500)
      .duration(100)
      .attr('height', this.y.bandwidth() / 3)
      .style('stroke', 'grey')
      .style('stroke-dasharray', "4,4")
      .transition()
      .delay(0)
      .duration(1500)
      .style('stroke-opacity', 1)

      this.sel_chg
       .transition('fade')
            .delay(1000)
            .duration(1500)
            .style('fill', d => this.colorScale(d.sample_mean))

      this.sel_avg
        .transition('fade')
        .delay(1000)
        .duration(1500)
        .style('opacity', 1)

  }

  // Data-independent setup
  createChart() {
  // console.log(this.df)
    this.getSVGDims();

    this.rect_width = this.width / this.df.length;

    this.x = d3.scaleBand().range([0, this.width]).domain(this.df.map(d => d.col));
    this.xAxis = d3.axisTop(this.x);
    // console.log(this.x.domain())

    this.y = d3.scaleBand()
      // .padding(0.55)
      .range([0, this.height])
      .domain(this.df.map(d => d.row));
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

    this.heatmap.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + 0 + ")")
      .call(this.xAxis);

    this.heatmap.append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(0," + 0 + ")")
      .call(this.yAxis);


    let grp1 = this.heatmap.selectAll('.rects')
      .data(this.df)
      .enter().append('g');

    // merged average
    // TODO: fix the periodicity so not hard coded.
    this.sel_avg = this.heatmap.selectAll('.avg-heatmap')
      .data(this.df.filter((d, i) => !(i % 3)))
      .enter()
      .append('g')
            .style('opacity', 0);

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
      .attr('x', (d, i) => this.x(d.col) + this.x.bandwidth()*1.5)
      .attr('y', d => this.y(d.row) + this.y.bandwidth() / 3 * 2)
      .attr('dy', "-0.5em")
      .text(d => d.sample_id);


    this.sel_avg.append('text')
      .attr('class', 'annotation fluor-value')
      .attr('x', (d, i) => this.x(d.col) + this.x.bandwidth()*1.5)
      .attr('y', d => this.y(d.row) + this.y.bandwidth() / 3 * 2)
      .attr('dy', "0.8em")
      .text(d => d3.format(".1f")(d.sample_mean));



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
      .attr('height', this.y.bandwidth())
      .style('fill', d => this.colorScale(d.fluor_score));

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



    // NESTED VERSION
    //   let grp1 = this.heatmap.selectAll('.avg')
    //     .data(this.df)
    //     .enter().append('g');
    //
    //   // TODO: fix sizes for width/height
    //   // Avg heatmap
    //   grp1
    //     .append('rect')
    //     .attr('class', '.avg-heatmap')
    //     .attr('x', (d, i) => i * this.rect_width)
    //     .attr('width', this.rect_width)
    //     .attr('y', this.height / 3)
    //     .attr('height', this.height / 3 * 2)
    //     .style('fill', d => this.colorScale(d.avg))
    //
    //   // Avg label
    //   grp1.append('text')
    //     .attr('class', 'annotation avg-label')
    //     .attr('x', (d, i) => i * this.rect_width + this.rect_width / 2)
    //     .attr('y', this.height / 3 * 2)
    //     .text(d => d3.format("(.1f")(d.avg));
    //
    //   // individual heatmap -- fade
    //   grp1.append("g")
    //     .attr('class', 'indiv-grp')
    //     .attr('transform', (d, i) => 'translate(' + this.rect_width * i + ',0)')
    //     .selectAll('.indiv-heatmap')
    //     .data(d => d.indivs)
    //     .enter().append('rect')
    //     .attr('class', 'indiv-heatmap')
    //     .attr('x', (d, i) => i * this.rect_width / 3)
    //     .attr('width', this.rect_width / 3)
    //     .attr('y', 0)
    //     .attr('height', this.height)
    //     .style('fill', d => this.colorScale(d))
    //     .transition('fade')
    //     .delay(2000)
    //     .duration(500)
    //     // .attr('height', this.height/3)
    //     .style('opacity', 0)
    //
    //   // inidividual heatmap:
    //   grp1.append("g")
    //     .attr('class', 'indiv-grp')
    //     .attr('transform', (d, i) => 'translate(' + this.rect_width * i + ',0)')
    //     .selectAll('.indiv-heatmap')
    //     .data(d => d.indivs)
    //     .enter().append('rect')
    //     .attr('class', 'indiv-heatmap')
    //     .attr('x', (d, i) => i * this.rect_width / 3)
    //     .attr('width', this.rect_width / 3)
    //     .attr('y', 0)
    //     .attr('height', this.height / 3)
    //     .style('fill', d => this.colorScale(d))
    //
    //   // inidividual heatmap labels:
    //   grp1.append("g")
    //     .attr('class', 'indiv-grp')
    //     .attr('transform', (d, i) => 'translate(' + this.rect_width * i + ',0)')
    //     .selectAll('.indiv-label')
    //     .data(d => d.indivs)
    //     .enter().append('text')
    //     .attr('class', 'annotation indiv-label')
    //     .attr('x', (d, i) => i * this.rect_width / 3 + this.rect_width / 6)
    //     .attr('y', this.rect_width / 6)
    //     .text((d, i) => "A" + i);
    // }


  }
