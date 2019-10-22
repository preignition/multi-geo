import { html, css } from 'lit-element';
import { Drawable } from '@preignition/multi-chart';
// import { default as MultiDrawable } from './multi-drawable.js';
import { default as MultiGeoMixin } from './mixin/drawable-geo-mixin.js';

import Hexbin  from '../d3-wrapper/d3-hexbin.js';
import { select } from 'd3-selection';
import { scaleSequential } from 'd3-scale';
import { interpolateViridis } from 'd3-scale-chromatic';

class MultiDrawableHexbin extends
MultiGeoMixin(
  Drawable) {

  // Note(cg): style to add to svghost while dispatching SVG.
  static get hostStyles() {
    return css `
        #drawable.hexbin {
          fill: var(--drawable-hexbin-fill);
          stroke: var(--drawable-hexbin-stroke);
        }
      `;
  }

  render() {
    return this.html `
    <d3-hexbin 
      @hexbin-changed="${this.onSetHexbin}" 
      @bins-changed="${this.onSetBins}" 
      .y="${this.y}" 
      .x="${this.x}" 
      .extent="${this.extent}"
      .radius="${this.radius}" 
      .points="${this.points}"
    ></d3-hexbin>
    <svg>
      <g id="drawable"  part="drawable-hexbin"  class="drawable hexbin"></g>
    </svg>
`;
  }



  static get properties() {
    return {

      ...super.properties,

      ...Hexbin.properties,

      /*
       * `hexbin` [the hexbin generator](https://github.com/d3/d3-hexbin#hexbin)
       */
      hexbin: {
        type: Function,
      },

      /*
       * `bins` [result of hexbin(data)](https://github.com/d3/d3-hexbin#_hexbin)
       */

      /* 
       * `colorScale` scale to use for the choropleth
       */
      colorScale: {
        type: Function,
      },

      /*
       * `multiPosition` position used to re-order items when appended by dispatch-svg
       * nodePosition larger than 0 will render on top. 
       */
       multiPosition: {
         type: Number,
         attribute:'multi-position',
         value: 10 
       },

    };
  }

  constructor() {
    super();
    this.x = d => d.__point__[0];
    this.y = d => d.__point__[1];
  }

  get shapeClass() {
    return 'hexbin';
  }

  get shapeName() {
    return 'path';
  }

  onSetHexbin(e) {
    this.hexbin = e.detail.value;
  }
  onSetBins(e) {
    this.geoData = e.detail.value;

  }

  resize(width, height) {
    super.resize(...arguments);
    if (this.hexbin) {
      this.extent = [
        [0, 0],
        [width, height]
      ];
    }
  }

  draw() {
    const data = this.drawableData;
    if (!this.width || !this.height || !data || !this.hexbin) {
      return;
    }

    // TODO(cg): comment.
    
     const color = this.colorScale || scaleSequential(interpolateViridis).domain([0, 50]);

    let chart = select(this.targetElement).selectAll(`${this.shapeName}.${this.shapeClass}`);

    // if (this.shallTransition) {
    //   chart = this.applyTransition(chart, this.transition);
    // }
    
    chart = chart.data(data)

    chart.exit().remove();

    chart = chart.enter().append(this.shapeName)
      .attr('class',`${this.shapeClass} selectable shape`)
      .merge(chart);

    chart
      .attr('d', (d) => { return 'M' + d.x + ',' + d.y + this.hexbin.hexagon(); })
      .style('fill', function(d) {
        return color(d.length);
      });

    return chart;

  }
}

export default MultiDrawableHexbin;