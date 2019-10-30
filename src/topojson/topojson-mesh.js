import {default as TopoBase} from './topojson-base.js';
import { mesh } from 'topojson-client';

/**
 * ## TopojsonMesh
 *
 * `<topojson-mesh>` wrapper around [topoJSON.mesh](https://github.com/topojson/topojson-client/blob/master/README.md#mesh)
 * exposes geo mesh from an url or topojson data
 *
 **/
class TopojsonMesh extends TopoBase {
  static get properties() {
    return {

      ...super.properties,

      /**
       * `feature` the geo feature to be exposed by this component
       */
      mesh: {
        type: Array,
        notify: true
      },

      /**
       * `filter` filter to be used for the mesh
       */
      filter: {
        type: Function,
        value: function() {
          return function(a, b) {
            return a !== b;
          };
        }
      }
    };
  }

  updated(props) {
     super.updated(props);
    if (props.has('data') || props.has('name') || props.has('filter')) {
      this._observeData(this.data, this.name, this.filter);
    }
  }

  _observeData(data, name, filter) {
    if (data && name) {
      this.mesh = mesh(data, data.objects[name], filter);
    }
  }
}

export default TopojsonMesh;
