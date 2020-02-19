// LitElement and html are the basic required imports
import { LitElement, html, css } from 'lit-element';
// import * as format from '/web_modules/d3-time-format.js';
// import { schemeCategory10 } from '/web_modules/d3-scale-chromatic.js';
import { transition} from 'd3-transition';

// Create a class definition for your component and extend the LitElement base class
class DemoFeature extends LitElement {

  static get styles() {
    return css `
    
    #chart::part(feature) {
      fill: var(--primary-color);
      stroke: white;
    }

    #chart {
      height: 600px;
     }
  `}

  render() {

    return html `
        <!-- fetch topojson features from  -->
        <topojson-feature id="feature" 
            @feature-changed="${ e => this.feature = e.detail.value}" 
            name="countries" url="/demo/data/worldSimplify01.json"
            ></topojson-feature>
        <!-- configure transition for this chart  -->
        <d3-transition 
            @transition-changed="${ e => this.transition = e.detail.value}" duration="700"
            ></d3-transition>
        <!-- a multi-container-geo will expose path and projection -->
        <multi-container-geo
            id="chart"
            enable-zoom
            @projection-changed="${e => this.projection = e.detail.value}"
            @path-changed="${ e => {this.path = e.detail.value;}}"
            .projectionType="${this.projectionType}"
            .rotate="${this.rotate}"
            .translate="${this.translate}"
            .scale="${this.scale}"
            >
            <!-- group of geo elements. When feature changes, contained elements will redraw -->
            <multi-container-layer log>
              <!-- draw features with with projected path-->
              <multi-drawable-feature 
                log
                _auto-fit
                .geoData="${this.feature}" 
                .transition="${this.transition}" 
                .path="${this.path}"
                ></multi-drawable-feature>             
            </multi-container-layer>
          </multi-container-geo>
          <div id="control">
             <label>select type of projection</label>
             <select .value="${this.projectionType}" @input="${e => this.projectionType = e.currentTarget.value}">
                 <option value="geoMercator">geo Mercator</option>
                 <option value="geoAzimuthalEqualArea">geo Azimuthal Equal Area</option>
                 <option value="geoTransverseMercator">geo Transverse Mercator</option>
               </select>
            <div>
               <label>scale</label><input  min="0" step="50"  type="number" .value="${this.scale}" @input=${(e) => this.scale= e.currentTarget.value}> 
            </div>     
            <div>
               <label>scale</label><input  min="0" step="1"  type="number" .value="${this.rotate}" @input=${(e) => this.rotate= e.currentTarget.value}> 
            </div>
            
          </div>
    `;
  }

  static get properties() {
    return {
      projectionType: {type: String},
      feature: {type: Array},
      geometries: { type: Array },
      translate: { type: Array },
      scale: {type: Number},
      rotate: {type: Number},
      transition: {type: Function},
      path: {type: Function},
      projection: {type: Function}
    };
  }

  constructor() {
    super();
    this.projectionType = 'geoMercator'
    this.scale = 200;
    this.rotate = 0;
    
  }
}

// Register your element to custom elements registry, pass it a tag name and your class definition
// The element name must always contain at least one dash
customElements.define('demo-feature', DemoFeature);