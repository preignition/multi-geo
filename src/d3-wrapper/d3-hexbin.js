import { LitElement } from 'lit-element';

import { shapeProperties } from '@preignition/multi-chart/src/helper/utils.js';
import { hexbin } from 'd3-hexbin';

const instance = hexbin();
const keys = Object.keys(instance || {});
const props = shapeProperties(keys);

class D3Hexbin extends LitElement {

  static get properties() {

    return {

      ...props,
      /**
       * [`x`](https://github.com/d3/d3-hexbin#x) x-coordinate accessor function
       */

      /**
       * [`y`](https://github.com/d3/d3-hexbin#y) y-coordinate accessor function
       */
      /**
       * [`radius`](https://github.com/d3/d3-hexbin#radius) the radius of the hexagon
       */
      /**
       * [`radius`](https://github.com/d3/d3-hexbin#radius) the radius of the hexagon
       */

      /*
       * `points` [the hexbin points](https://github.com/d3/d3-hexbin#_hexbin)
       */
       points: {
         type: Array,
        },

    };
  }
  constructor() {
    super();
    this.hexbin = hexbin();
  }

  update(props) {
    super.update(props);
    this.updateWrapper(props);
    if (props.has('points') || props.has('extent')) {
      this.updatePoints();
    }

  }

  updateWrapper(props) {
    let shallNotify = false;
    props.forEach((value, key) => {
      if ((this[key] !== undefined) && this.hexbin[key]) {
        shallNotify = true;
        this.hexbin[key](this[key]);
      }
    });
    if (shallNotify) {
      this.dispatchEvent(new CustomEvent(`hexbin-changed`, { detail: { value: this.hexbin }, bubbles: true, composed: true }));
    }
  }
  updatePoints() {
    const bins = this.hexbin(this.points);
    bins.forEach((b, i) => {
      b.forEach((p) => {
        p.__bin__ = i;
      });
    });
   this.dispatchEvent(new CustomEvent(`bins-changed`, { detail: { value: bins }, bubbles: true, composed: true }));
  }

}

export default D3Hexbin;