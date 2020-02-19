import { LitElement } from 'lit-element';
// import { shapeProperties } from '@preignition/multi-chart/src/helper/utils.js';
import { shapeProperties } from '@preignition/multi-chart';

import * as geo from 'd3-geo';
const instance = geo.geoAlbers();
const keys = Object.keys(instance || {});
const props = shapeProperties(keys);

// const projections = [
//   'geoAlbers',
//   'geoAlbersUsa',
//   'geoAzimuthalEqualArea',
//   'geoAzimuthalEquidistant',
//   'geoConicConformal',
//   'geoConicEqualArea',
//   'geoConicEquidistant',
//   'geoEquirectangular',
//   'geoGnomonic',
//   'geoProjection',
//   'geoMercator',
//   'geoOrthographic',
//   'geoStereographic',
//   'geoTransverseMercator'
// ];


/**
 * ## D3Projection
 *
 * `<d3-projection>` a webcompobent for wrapping geo projection as in [d3-geo](https://github.com/d3/d3-geo/blob/master/README.md#_projections)
 * It will expose `projection`.
 *
 * @memberof MultiChart
 * @customElement
 * @polymer
 * @appliesMixin MultiChart.mixin.D3Projection
 * @appliesMixin MultiChart.mixin.ConfigHelper
 * @demo
 **/
class D3Projection extends LitElement {

  static get properties() {
    return {

      ...super.properties,

      ...props,

      /*
       * `projectionType` projection type, one of `geoAlbers`,`geoAlbersUsa`,`geoAzimuthalEqualArea`,`geoAzimuthalEquidistant`,`geoConicConformal`,`geoConicEqualArea`,`geoConicEquidistant`,`geoEquirectangular`,`geoGnomonic`,`geoMercator`,`geoOrthographic`,`geoStereographic`,`geoTransverseMercator`
       */
      projectionType: {
        type: String,
        attribute: 'projection-type'
      },


      /**
       * [`scale`](https:github.com/d3/d3-geo#projection_scale)
       */
      // scale: {
      //   type: Number
      // }
      /**
       * `projection` the [projection](https://github.com/d3/d3-geo#projection) generator function
       */
      /**
       * [`clipAngle`](https:github.com/d3/d3-geo#projection_clipAngle)
       */

      /**
       * [`clipExtent`](https:github.com/d3/d3-geo#projection_clipExtent)
       */

      /**
       * [`center`](https:github.com/d3/d3-geo#projection_center)
       */
      /**
       * [`rotate`](https:github.com/d3/d3-geo#projection_rotate)
       */
      /**
       * [`precision`](https:github.com/d3/d3-geo#projection_precision)
       */

      /**
       * [`translate`](https:github.com/d3/d3-geo#projection_translate)
       */
    };
  }

  constructor() {
    super();
    this.__init = true;
  }

  updated(props) {
    super.updated(props);
    if (!this.projectionType && !props.has('projectionType')) {
      this.projectionType = 'geoMercator';
    }

    if (!this.projection || props.has('projectionType')) {
      this.projection = geo[this.projectionType]();
      this.dispatchProjectionChanged();
    }

    if (this.projection) {
      this.updateWrapper(props);
    }
  }

  dispatchProjectionChanged() {
    this.dispatchEvent(new CustomEvent('projection-changed', { detail: { value: this.projection, type: this.projectionType }, bubbles: true, composed: true }));
  }

  updateWrapper(props) {
    let shallNotify = this.__init;
    // let shallNotifyScale = false;
    props.forEach((value, key) => {
      if ((this[key] !== undefined) && key !== 'projection' && this.projection[key]) {
        shallNotify = true;
        this.log && console.info(`d3-projection ${this.projectionType} updates ${key} to ${JSON.stringify(this[key])}`);
        this.projection[key](this[key]);
        // if (key === 'scale') {
        //   shallNotifyScale = true
        // }
      }
    });
    if (shallNotify) {
      this.dispatchProjectionChanged();
      delete this.__init;
    }

    // if (shallNotifyScale) {
    //   this.dispatchEvent(new CustomEvent(`scale-changed`, { detail: { value: this.scale, type: this.projectionType }, bubbles: true, composed: true }));
    // }
  }

  /**
   * [`fitExtent`](https://github.com/d3/d3-geo#projection_fitExtent) Sets the projection’s scale and translate to fit the specified GeoJSON object in the center of the given `extent`.
   */
  fitExtent(extent, object) {
    this.projection && this.projection.fitExtent(extent, object);
    this.dispatchProjectionChanged();
    // this.syncProperties();
    // this.dispatchEvent(new CustomEvent('multi-refresh', { bubbles: true, composed: true }));
  }

  /**
   * [`fitSize`](https://github.com/d3/d3-geo#projection_fitSize) A convenience method for projection.fitExtent where the top-left corner of the extent is `[0,0]`.
   */
  fitSize(size, object) {
    this.projection && this.projection.fitSize(size, object);
    this.dispatchProjectionChanged();
    // this.syncProperties();
    // this.dispatchEvent(new CustomEvent('multi-refresh', { bubbles: true, composed: true }));
  }

  /**
   * [`invert`](https://github.com/d3/d3-geo#projection_invert) Returns a new array [longitude, latitude] in degrees representing the unprojected point of the given projected point.
   */
  invert(point) {
    this.projection && this.projection.invert(point);
    this.dispatchProjectionChanged();
    // this.syncProperties();
    // this.dispatchEvent(new CustomEvent('multi-refresh', { bubbles: true, composed: true }));
  }


  // _observeType(projectionType) {
  //   if (projections.indexOf(projectionType) < 0) {
  //     this._error('provided projectionType is not a d3.js projection');
  //   }

  //   const projection = d3[projectionType]();
  //   this.applyConfig(projection, ['clipAngle', 'clipExtent', 'scale', 'translate', 'center', 'rotate', 'precision']);

  //   // Note(cg): we need a way to tell this component that projection has changed to that we re set properties.
  //   projection.notifyChange = () => {
  //     this.syncProperties();
  //   };

  //   this._setProjection(projection);
  //   this.dispatchEvent(new CustomEvent('multi-refresh', { bubbles: true, composed: true}));
  // }

  // /*
  //  * `syncProperties` will sync component properties with projections
  //  */
  // syncProperties() {
  //   this.pauseObserver();
  //    ['clipAngle', 'clipExtent', 'scale', 'translate', 'center', 'rotate', 'precision'].forEach(prop =>{
  //     if(this.projection[prop]) {
  //       this[prop] = this.projection[prop]();
  //     }
  //    });
  //   this.dispatchEvent(new CustomEvent('multi-refresh', { bubbles: true, composed: true}));
  //   this.activateObserver();
  // }

}

export default D3Projection;
