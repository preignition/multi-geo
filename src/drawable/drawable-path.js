import { Drawable } from '@preignition/multi-chart';
import { html, css } from 'lit-element';
// import { select } from 'd3-selection-multi';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { multiSelection, multiTransition } from '../helper/utils.js';

import { default as MultiGeoMixin } from './mixin/drawable-geo-mixin.js';

// Note(cg): multi-select is not part of d3-selection.
// This is to allow selection.attrs.
multiSelection(select().constructor);
multiTransition(transition().constructor);
/**
 * ## MultiDrawablePath
 *
 * `<multi-drawable-path>` draw a line from a geo path in a given projection
 *
 * ### Styling
 * `<multi-drawable-feature>` provides the following custom properties and mixins
 * for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--multi-drawable-feature-stroke-color` | stroke color for features | `--secondary-text-color` or grey
 * `--multi-drawable-feature-fill-color` | fill color for features | none
 * `--multi-drawable-feature` | Mixin applied to features | `{}`
 *
 * @memberof MultiChart
 * @customElement
 * @polymer
 * @appliesMixin MultiChart.mixin.MultiGeoMixin
 * @demo
 **/
class MultiDrawablePath extends
MultiGeoMixin(Drawable) {

  // Note(cg): style to add to svghost while dispatching SVG.
  static get hostStyles() {
    return css `
        .multi-drawable-path {
          stroke: var(--multi-drawable-path-stroke-color, var(--secondary-text-color, grey));
          fill: var(--multi-drawable-path-fill-color, none);
        }
      `;
  }


  render() {
    return this.html `
      <svg>
        <g id="drawable" slot-svg="slot-layer" part="path" class="multi-drawable-path"></g>
      </svg>
    `;
  }

  static get properties() {
    return {

      ...super.properties,

      /**
       * `path` the [path](https://github.com/d3/d3-geo#geoPath) generator function
       */
      path: {
        type: Function
      },

      /**
       * `attrs` default attributes to be set on the chart
       */
      attrs: {
        type: Object
      }
    };
  }

  /*
   * `registerOrder` - registerable elements are sorted on the basis of this property.
   */
  get registerOrder() {
    return 50;
  }

  draw(data) {
    if (!this.path) {
      this.log && console.warn('trying to draw path but geo path is not yet set');
      return false;
    }

    if (!this.drawableData) {
      this.log && console.warn('data not yet set');
      return false;
    }

    this.log && console.info('draw path');

    const chart = select(this.targetElement);

    chart.selectAll('*').remove();

    return chart
      .append('path')
      .datum(this.drawableData)
      .attrs(this.attrs)
      .attr('d', this.path);
  }
}


export default MultiDrawablePath;