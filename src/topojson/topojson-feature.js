import { default as TopoBase } from './topojson-base.js'
import { feature as topofeature } from 'topojson-client'

/**
 * ## TopojsonFeature
 *
 * `<topojson-feature>` a wrapper around [topojson feature](https://github.com/topojson/topojson-client/blob/master/README.md#feature)
 * exposes geo feature from an url
 * 
 **/
class TopojsonFeature extends TopoBase {
  static get properties() {
    return {

      ...super.properties,

      /**
       * `feature` the GeoJSON Feature or FeatureCollection to be exposed by this component
       */
      feature: {
        type: Array,
        notify: true
      },

      /* 
       * `filter` the filter to use for filtering features
       * ex: function(f) {return f.id !== 10} // remove antartic from a world map
       */
      filter: {
        type: Function
      },

      /* 
       * `forEach` a function that will run for each feature
       * ex: function(f) {return f.properties.id = lookup(f.id) } // take lookup code
       */
      forEach: {
        type: Function
      }
    };
  }

  updated(props) {
    super.updated(props)
    if (props.has('data') || props.has('name') || props.has('geoType') || props.has('filter' || props.has('forEach'))) {
      this._observeData(this.data, this.name, this.geoType, this.filter, this.forEach)
    }
  }



  _observeData(data, name, geoType, filter, forEach) {
    if (data && name && geoType) {
      let feature;

      if (geoType === 'topojson') {
        if (!data.objects[name]) {
          throw `no topologies for name ${name}`;
        }
        feature = topofeature(data, data.objects[name]);
      } else {
        feature = data.objects[name].geometries;
      }

      if (feature && feature.features && filter && typeof filter === 'function') {
        feature.features = feature.features.filter(filter);
      }

      if (feature && feature.features && forEach && typeof forEach === 'function') {
        feature.features.forEach(forEach);
      }
      this.feature = feature;
    }
  }
}

export default TopojsonFeature;