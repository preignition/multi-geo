import { default as Base } from '../base-class.js';
// import { ObserverResizeMixin } from '@preignition/multi-chart'
import { html } from 'lit-element';

/**
 * ## MultiProject
 *
 * `<multi-project>` use `projection` to project `data` and expose it under `projectedData`
 *
 * @memberof MultiChart
 * @customElement
 * @polymer
 * @appliesMixin MultiChart.mixin.PolymerExtends
 * @demo
 **/
class MultiProject extends Base {

  render() {
    return html `
     <multi-accessor 
      @accessor-changed="${e => {this.coordinateAccessor = e.detail.value;}}"
      path="${this.coordinateAccessorPath}" 
      ></multi-accessor>
      `;
  }

  static get properties() {
    return {

      ...super.properties,

      /**
       * `projection` the [projection](https://github.com/d3/d3-geo#projection) generator function
       */
      projection: {
        type: Function,
        // Note(cg): trigger an update anytime projection is set
        hasChanged: (newVal, oldVal) => {
          return true;
        }
      },

      /**
       * [`data`] data with points to be projected
       */
      data: {
        type: Array,
      },

      /**
       * [`data`] data with points to be projected
       */
      projectedData: {
        type: Array,
        attribute: 'projected-data',
        notify: true
      },

      /**
       * `coordinateAccessorPath` path for computing the `valueAccessor` function
       * a value of ´key´ will generate  an accessor function like ´function(d) {return d.key}´
       * a value of ´+value.count´ will generate  an accessor function like ´function(d) {return +d.value.count}´
       */
      coordinateAccessorPath: {
        type: String,
        attribute: 'coordinate-accessor-path'
      },

      /**
       * `coordinates` accessor function returning [x,y] coordinates from the data. Passed directly or through a coordinatePath
       */
      coordinateAccessor: {
        type: Function,
        attribute: 'coordinate-accessor'
      },

      /**
       * `key` the key under which projected coordinates are stored
       */
      key: {
        type: String,
        value: '__point__'
      }
    };
  }

  // onResize() {
  //   console.info('ONRESIZE');

  //   this._computeProjection()
  // }

  updated(props) {
    super.updated(props);
    if (props.has('projection') || props.has('coordinateAccessor') || props.has('data') || props.has('key')) {
      this._computeProjection();
    }
  }

  _computeProjection() {
    const {projection, coordinateAccessor, data, key} = this;

    if (projection && coordinateAccessor && data && key) {
      data.forEach(function(d) {
        d[key] = projection(coordinateAccessor(d));
      });
      this.projectedData = data;
    }
  }
}

export default MultiProject;