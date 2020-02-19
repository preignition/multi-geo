import { LitElement, html, css } from 'lit-element';
import { scaleOrdinal, scaleQuantize } from 'd3-scale';
import { schemeCategory10, schemeBlues } from 'd3-scale-chromatic';
import { legendHelpers } from 'd3-svg-legend';

class Chart extends LitElement {

  static get styles() {
    return css `
       #chart {
        height: 600px;
       }
     `
  }

  render() {
    return html `
        <!-- get unemployment data -->
        <d3-fetch type="tsv" url="/demo/data/unemployment.tsv" @data-changed="${e => this.data = e.detail.value}"></d3-fetch>

        <!-- fetch topojson features from us.json -->
        <topojson-feature id="feature" 
            @feature-changed="${ e => this.feature = e.detail.value}" 
            @data-changed="${ e => this.geometries = e.detail.value}" name="counties" url="/demo/data/us.json"
            ></topojson-feature>
       
       <!-- get a topojson mesh for states  -->
       <topojson-mesh @mesh-changed="${e => this.mesh = e.detail.value}" .data="${this.geometries}" name="states"></topojson-mesh>

        <multi-container-geo
            id="chart"
            enable-zoom
            process-type="choropleth"
            value-position="color"
            @projection-changed="${e => this.projection = e.detail.value}"
            @path-changed="${ e => {this.path = e.detail.value;}}"
            projection-type="geoAlbersUsa"
            .data="${this.data}"
            .scale="${this.scale}"
            .valueAccessor="${d => +d.rate}"  
            .keyAccessor="${d => d.id}"  
            
            >
            
            <!-- group of geo elements. When feature changes, contained elements will redraw -->
            <multi-container-layer 
              log
              >
            
              <!-- draw features with with projected path-->
              <multi-drawable-choropleth 
                log
                auto-fit
                
                .attrs="${{stroke:'none'}}"
                .geoData="${this.feature}" 
                .path="${this.path}"
                .colorScale="${this.colorScale}" 
  
                ></multi-drawable-choropleth>             

            <!-- show US States -->
            <multi-drawable-path 
              .path="${this.path}" 
              .attrs="${{fill: 'none', stroke: '#fff', 'stoke-width': 3}}" 
              .geoData="${this.mesh}"></multi-drawable-path>    
            </multi-container-layer>
          
          <!-- display a legend -->
          <multi-legend 
            .scale="${this.colorScale}" 
            padding="10" 
            title="Unemployment Rate"
            .labels="${legendHelpers.thresholdLabels}"
            label-format=".0%" 
            position="right" > </multi-legend>

         </multi-container-geo>

    `;
  }

  static get properties() {
    return {

      data: { type: Array },
      feature: { type: Array },
      geometries: { type: Array },
      mesh: { type: Array },
      colorScale: { type: Function },
      scale: {type: Number},

    };
  }

  constructor() {
    super();
    this.colorScale = scaleQuantize().range(schemeBlues[8]).domain([0.02, 0.18]).unknown('#ccc');
    this.scale=800;
  }


}

customElements.define('demo-choropleth-compose', Chart);