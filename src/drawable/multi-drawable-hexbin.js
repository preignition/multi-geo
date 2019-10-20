import { html, css } from 'lit-element';
import { default as MultiDrawable } from './multi-drawable.js';
import { default as DrawableSerie } from './mixin/drawable-serie-mixin.js';
import { default as Shaper } from './mixin/drawable-shaper-mixin.js';
import { default as MultiGeoMixin } from './mixin/drawable-geo-mixin.js';

import { Hexbin } from '../d3-wrapper/d3-hexbin.js';
import { select } from 'd3-selection.js';

class MultiDrawableHexbin extends
MultiGeoMixin(
  MultiDrawable) {

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
    return html `
    <d3-hexbin 
      @hexbin-changed="${this.onSetHexbin}" 
      @bins-changed="${this.onSetBins}" 
      .y="${this.y}" 
      .x="${this.x}" 
      .extent="${this.extent}"
      .radius="${this.radius}" 
    ></d3-hexbin>
    <svg>
      <g id="drawable" slot-svg="slot-chart" part="drawable-hexbin"  class="drawable hexbin"></g>
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
      bins: {
        type: Array,
      },
      /* 
       * `colorScale` scale to use for the choropleth
       */
      colorScale: {
        type: Function,
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

  onSetHexbin(hexbin) {
    this.hexbin = hexbin;
  }
  onSetBins(bins) {
    this.geoData = bins;

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

  _draw() {
    const data = this.drawableData;
    if (!this.width || !this.height || !data || this.hexbin) {
      return;
    }

    // TODO(cg): comment.
    // const color = scaleSequential(interpolateViridis)
    //   .domain([0, 50]);

    let chart = select(this.targetElement);

    // if (this.shallTransition) {
    //   chart = this.applyTransition(chart, this.transition);
    // }
     
    chart
      .data(data)
      .enter().append('path')
      .attr('d', function(d) { return 'M' + d.x + ',' + d.y + this.hexbin.hexagon(); })
      .style('fill', function(d) {
        return this.colorScale(d.length);
      });

    return chart;

  }
}

export default MultiDrawableHexbin;