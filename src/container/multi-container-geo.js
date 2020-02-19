import { Container } from '@preignition/multi-chart';
import { default as Projection } from '../d3-wrapper/d3-projection.js';
import { RelayTo, CacheId } from '@preignition/preignition-mixin';
import { default as Path } from '../d3-wrapper/d3-geo-path.js';

/**
 * ## MultiContainerGeo
 *
 * `<multi-container-geo>` a container for geographical chart. It exposes the current geo projection
 *
 * * @element multi-container-geo
 *
 **/
class MultiContainerGeo extends
   CacheId(
      RelayTo(Container)) {

  getContentRender() {
    return this.html `
    <d3-projection 
      id="d3-projection"
      @projection-changed=" ${e => this.projection = e.detail.value}" 
      ></d3-projection>

    <d3-geo-path 
      id="d3-path"
      @path-changed=" ${e => this.path = e.detail.value}" 
      ></d3-geo-path>
    `;
  }

  static get properties() {
    return {

      ...super.properties,

      ...Path.properties,

      ...Projection.properties,

      /**
       * `projection` the [projection](https://github.com/d3/d3-geo#projection) generator function
       */
      projection: {
        type: Function,
        notify: true,
        // Note(cg): trigger an update anytime projection is set
        hasChanged: (newVal, oldVal) => {
          return true;
        }
      },

      /**
       * `path` the [path](https://github.com/d3/d3-geo#geoPath) generator function
       */
      path: {
        type: Function,
        notify: true,
      },

      /**
       * [`context`](https://github.com/d3/d3-geo#path_context) to be applied to the path
       */
      context: {
        type: Function
      },


    };
  }

  constructor() {
    super();
    this.addEventListener('multi-refresh', this.refresh);
  }

  update(props) {
    super.update(props);
    this.relayTo(props, 'd3-projection');
    this.relayTo(props, 'd3-path');
  }

  shallRelayTo(key, name) {
    if (name === 'd3-projection') {
      return Projection.properties[key];
    }
    if (name === 'd3-path') {
      return Path.properties[key];
    }
  }

}


export default MultiContainerGeo;
