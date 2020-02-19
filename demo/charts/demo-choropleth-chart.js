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

        <multi-chart-choropleth
            id="chart"
            log
            enable-zoom
            auto-fit
            min="0.02"
            max="0.18"
            @color-scale-changed="${e => {this.colorScale = e.detail.value}}"
              
            .data="${this.data}"
            
            feature-url="/demo/data/us.json"
            feature-name="counties"
            projection-type="geoAlbersUsa"
            
            .choroplethAttrs="${{stroke:'none'}}"
            value-path="+rate"  
            key-path="id"  

            mesh-name="states"
            .meshAttrs="${{fill: 'none', stroke: '#fff', 'stoke-width': 3}}" 
            
            .scale="${this.scale}"
            >
            
         
            <!-- display a legend -->
            <multi-legend 
              .scale="${this.colorScale}" 
              padding="10" 
              title="Unemployment Rate"
              .labels="${legendHelpers.thresholdLabels}"
              label-format=".0%" 
              position="right" > </multi-legend>

         </multi-chart-choropleth>

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
    // this.colorScale = scaleQuantize().range(schemeBlues[8]).domain([0.02, 0.18]).unknown('#ccc');
    // this.colorScale = scaleQuantize().range(schemeBlues[8]).unknown('#ccc');
    this.scale=800;
  }


}

customElements.define('demo-choropleth-chart', Chart);