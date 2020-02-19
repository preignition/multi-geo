import { LitElement } from 'lit-element';
// import { shapeProperties } from '@preignition/multi-chart/src/helper/utils.js';
import { shapeProperties } from '@preignition/multi-chart';

import { geoPath } from 'd3-geo';
const instance = geoPath();
const keys = Object.keys(instance || {});
const props = shapeProperties(keys);
/**
 * ## D3GeoPath
 *
 * `<d3-geo-path>` a wrapper for geographic path generator with the default settings as in [d3.geoPath](https://github.com/d3/d3-geo#geoPath)
 *
 **/


class D3GeoPath extends LitElement {

  static get properties() {
    return {

      ...super.properties,

      ...props,

      /**
       * `path` the [path](https://github.com/d3/d3-geo#geoPath) generator function
       */

      /**
       * [`projection`]((https://github.com/d3/d3-geo#path_projection)) to be applied to the path
       */
      projection: {
        type: Function,
        hasChanged: (newVal, oldVal) => {
          return true;
        }
      }

      /**
       * [`context`](https://github.com/d3/d3-geo#path_context) to be applied to the path
       */

    };
  }

  constructor() {
    super();
    this.path = geoPath();
  }

  update(props) {
    super.update(props);
    this.log && console.info(`d3-geo-path  update`, props);
    this.updateWrapper(props);
  }

  updateWrapper(props) {
    let shallNotify = false;
    props.forEach((value, key) => {
      if ((this[key] !== undefined) && key !== 'path') {
        shallNotify = true;
        this.path[key](this[key]);
      }
    });
    if (shallNotify) {
      this.dispatchEvent(new CustomEvent('path-changed', { detail: { value: this.path }, bubbles: true, composed: true }));
      this.dispatchEvent(new CustomEvent('multi-refresh', {bubbles: true, composed: true }));
    }
  }

  /**
   * [`area`](https://github.com/d3/d3-geo#path_area) returns the projected planar area for the specified GeoJSON `object`
   */
  area(object) {
    return this.path.area(object);
  }

  /**
   * [`bounds`](https://github.com/d3/d3-geo#path_bounds) returns the projected planar bounding box for the specified GeoJSON `object`
   */
  bounds(object) {
    return this.path.bounds(object);
  }

  /**
   * [`centroid`](https://github.com/d3/d3-geo#path_centroid) returns the projected planar centroid for the specified GeoJSON `object`
   */
  centroid(object) {
    return this.path.centroid(object);
  }
}

export default D3GeoPath;
