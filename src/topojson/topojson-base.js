import { html } from 'lit-element'
import { default as Base } from '../base-class.js'


class TopojsonBase extends Base {

  render() {
    return html `<d3-fetch 
      .url="${this.url}" 
      .type="${this.handleAs}" 
      @data-changed="${ e => this.data = e.detail.value}"
      @error-changed="${ e => this.error = e.detail.value}"
      ></d3-fetch>`
  }

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
       * `url` url to use for fetching geo mesh data.
       */
      url: {
        type: String
      },

      /**
       * `data` topojson or geojson object. It is either retrieved iron-ajax or passed as an argument
       */
      data: {
        type: Object,
        notify: true
      },

      /**
       * `geoType` the type of data object (topojson or geojson)
       */
      geoType: {
        type: String,
        value: 'topojson'
      },

      /**
       * `name` the name of the property to extract from the geo data object
       */
      name: {
        type: String
      },

      /**
       * [`handleAs`](https://elements.polymer-project.org/elements/iron-ajax#property-handleAs) 
       */
      handleAs: {
        type: String,
        value: 'json'
      },

      /* 
       * `error` 
       */
      error: {
        type: Object,
        notify: true
      }

    };
  }

}

export default TopojsonBase;