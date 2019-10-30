import { scaleQuantize } from 'd3-scale';
import { schemeBlues } from 'd3-scale-chromatic';
import { default as GeoContainer } from '../container/multi-container-geo.js';

/**
 * ## MultiChartChoropleth
 *
 * `<multi-chart-choropleth>` a choropleth-chart
 *
 * @memberof MultiChart
 * @customElement
 * @polymer
 * @appliesMixin MultiChart.mixin.D3Projection
 * @appliesMixin MultiChart.mixin.ZoomableProperty
 * @appliesMixin MultiChart.mixin.ColorScale
 * @demo
 **/
class MultiChartChoropleth extends
// MultiChart.mixin.ColorScale(
GeoContainer {

  getContentRender() {
    return this.html `
        ${super.getContentRender()}
        <topojson-feature
          @feature-changed=" ${e => this.feature = e.detail.value}" 
          @data-changed=" ${e => this.geometries = e.detail.value}" 
          .name="${this.featureName}" 
          .geoType="${this.geoType}"
          .filter="${this.featureFilter}"
          .forEach="${this.featureForEach}"
          .url="${this.featureUrl}"
          ></topojson-feature>

        ${this.meshName ? this.html`  
          <topojson-mesh 
            @mesh-changed="${e => this.mesh = e.detail.value}" 
            .data="${this.geometries}" 
            .name="${this.meshName}"></topojson-mesh>` : ''}

        ${this.valuePath ? this.html`
        <multi-accessor 
          .path="${this.valuePath}"
          @accessor-changed="${e => this.valueAccessor = e.detail.value}" 
        ></multi-accessor>` : ''}    

        ${this.keyPath ? this.html`
        <multi-accessor 
          .path="${this.keyPath}"
          @accessor-changed="${e => this.keyAccessor = e.detail.value}" 
        ></multi-accessor>` : ''}    

        <!-- group of geo elements. When feature changes, contained elements will redraw -->
          <multi-container-layer group="default">
            
          <!-- draw features with with projected path-->
          <multi-drawable-choropleth 
            .log="${this.log}"
            ?auto-fit="${this.autoFit}"
            
            .attrs="${this.choroplethAttrs}"
            .geoData="${this.feature}" 
            .path="${this.path}"
            .colorScale="${this.colorScale}" 
            .labelPath="${this.labelPath}"  
            .labelAccessor="${this.labelAccessor}"  
            .featurePath="${this.featurePath}"  
            .featureAccessor="${this.featureAccessor}"  
          ></multi-drawable-choropleth>             
          </multi-container-layer>
            
          ${this.mesh ? this.html`  
             <multi-drawable-path 
              .path="${this.path}" 
              .attrs="${this.meshAttrs}" 
              .geoData="${this.mesh}"></multi-drawable-path>
             ` : ''}    
          
         
       `;
  }

  constructor() {
    super();
    this.processType = 'choropleth';
    this.valuePosition = 'color';
    this.addEventListener('data-group-rescaled', this.onDataGroupRescaled);
  }


  onDataGroupRescaled(e) {
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
       * `featureUrl` url to use for fetching geo mesh data.
       */
      featureUrl: {
        type: String,
        attribute: 'feature-url'
      },

      /**
       * `geometries` topojson or geojson object. It is either retrieved iron-ajax or passed as an argument
       */
      geometries: {
        type: Object,
        notify: true
      },

      /**
       * `geoType` the type of data object (topojson or geojson)
       */
      geoType: {
        type: String,
        value: 'topojson',
        attribute: 'geo-type'
      },

      /**
       * `featureName` the name of the property to extract from the geo data object
       */
      featureName: {
        type: String,
        attribute: 'feature-name'
      },

      /*
       * `featureFilter` the filter to use for filtering features
       * ex: function(f) {return f.id !== 10} // remove antartic from a world map
       */
      featureFilter: {
        type: Function,
        attribute: 'feature-filter'
      },

      /*
       * `featureForEach` a function that will run for each feature
       * ex: function(f) {return f.properties.id = lookup(f.id) } // take lookup code
       */
      featureForEach: {
        type: Function,
        attribute: 'feature-for-each'
      },

      /**
       * `feature` the geo feature to be exposed by this component
       */
      mesh: {
        type: Array,
        notify: true
      },


      /**
       * `meshName` the name of the property to extract from the geo data object
       */
      meshName: {
        type: String,
        attribute: 'mesh-name'
      },

      /*
       * `meshAttrs` attributes to be set on the mesh
       */
      meshAttrs: {
        type: String,
        attribute: 'mesh-attrs'
      },


      /*
       * `colorScale` scale to use for the choropleth
       */
      colorScale: {
        type: Function,
        notify: true,
        attribute: 'color-scale',
        // hasChanged: () => {return true;},
        value: () => {
          return scaleQuantize().range(schemeBlues[8]).unknown('#ccc');
        },
       },

      /*
       * `choroplethAttrs` default attributes to be set on the chart
       */
      choroplethAttrs: {
        type: String,
        attribute: 'choropleth-attrs'
      },


      /**
       * `valueAccessorPath` path for computing the `valueAccessor` function
       * a value of ´key´ will generate  an accessor function like ´function(d) {return d.key}´
       * a value of ´+value.count´ will generate  an accessor function like ´function(d) {return +d.value.count}´
       */
      valuePath: {
        type: String,
        attribute: 'value-path',
        value: 'key'
      },

      /**
       * `valueAccessor` the value accessor function
       * example function : `d => {return +d.count}`
       */
      valueAccessor: {
        attribute: 'value-accessor',
        type: Function
      },

      /**
       * `keyAccessorPath` path for computing the `keyAccessor` function
       * a key of ´key´ will generate  an accessor function like ´function(d) {return d.key}´
       * a key of ´+key.count´ will generate  an accessor function like ´function(d) {return +d.key.count}´
       */
      keyPath: {
        type: String,
        attribute: 'key-path',
        value: 'key'
      },

      /**
       * `keyAccessor` the value accessor function
       * example function : `d => {return +d.count}`
       */
      keyAccessor: {
        attribute: 'key-accessor',
        type: Function
      },

      /**
       * `featurePath` the path for accessing the feature keys/ids
       */
      featurePath: {
        type: String,
        attribute: 'feature-path',
        value: 'id'
      },

      /**
       * `featureAccessor the accessor function from featureAccessorPath.
       */
      featureAccessor: {
        type: Function,
        attribute: 'feature-accessor',
        notify: true
      },

      /**
       * `path` the [path](https://github.com/d3/d3-geo#geoPath) generator function
       */
      path: {
        type: Function,
        notify: true,
      },

      /*
       * `elastic` indicate whether colorscale shall be re-computed on data-change
       */
      elastic: {
        type: Boolean
      },

      /*
       * `autoFit` true to automatically fit geometries
       */
       autoFit: {
         type: Boolean,
         attribute: 'auto-fit'
         },


    };
  }

}

export default MultiChartChoropleth;
