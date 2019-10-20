import { default as MultiDrawableFeature } from './drawable-feature.js';
import { min as d3Min, max as d3Max } from 'd3-array';

/**
 * ## MultiDrawableChoropleth
 *
 * `<multi-drawable-choropleth>` polymer elements responsible for drawing choropleth area in a geo-chart
 *
 * ### Example
 *  ```html
 *     <topojson-feature feature="{{feature}}" data="{{geometries}}" name="counties" url="us.json"></topojson-feature>
 *    <!-- get a topojson mesh for states  -->
 *    <topojson-mesh mesh="{{mesh}}" data="[[geometries]]" name="states"></topojson-mesh>
 *    <!-- a multi-container-geo will expose path and projection -->
 *    <multi-container-geo id="chart" enable-zoom projection="{{projection}}" path="{{path}}" projection-type="[[projectionType]]" scale="{{scale}}">
 *        <!-- group of geo elements. When choropleth changes, contained elements will redraw -->
 *        <multi-container-layer>
 *
 *          <!-- draw choropleths with projected to projection -->
 *          <multi-drawable-choropleth data="[[data]]" auto-fit geo-data="[[feature]]" path="[[path]]" attrs="[[choroplethAttrs]]" scale-type="scaleQuantize" domain="[[colorDomain]]" range="[[colorRange]]" color-scale="{{colorScale}}" value-accessor-path="+rate" key-accessor-path="id"></multi-drawable-choropleth>
 *
 *          <!-- show US States -->
 *          <multi-drawable-path path="[[path]]" attrs="[[meshAttrs]]" geo-data="[[mesh]]"></multi-drawable-path>
 *        </multi-container-layer>
 *
 *        <!-- display a legend -->
 *        <multi-legend scale="[[colorScale]]" padding="10" title="Unemployment Rate" labels="[[labels]]" label-format=".0%" position="right"> </multi-legend>
 *      </multi-container-geo>
 *  ```
 *
 * @memberof MultiChart
 * @customElement
 * @polymer
 * @appliesMixin MultiChart.mixin.D3ScaleProperty
 * @demo index.html#multi-choropleth-demo
 **/
class MultiDrawableChoropleth extends MultiDrawableFeature {
  render() {
    return this.html `
    ${this.featurePath ? this.html`
        <multi-accessor 
          .path="${this.featurePath}"
          @accessor-changed="${e => this.featureAccessor = e.detail.value}" 
        ></multi-accessor>` : '' }    
     ${this.labelPath ? this.html`
        <multi-accessor 
          .path="${this.labelPath}"
          @accessor-changed="${e => this.labelAccessor = e.detail.value}" 
        ></multi-accessor>` : '' }    
        <svg>
          <g id="drawable" slot-svg="slot-layer" part="choropoleth" class="multi-drawable-choropleth"></g>
        </svg>
  `;
  }

  get dataProcessType() {
    return 'choropleth'
  }

  static get properties() {
    return {
      ...super.properties,

      /* 
       * `colorScale` scale to use for the choropleth
       */
      colorScale: {
        type: Function
      },

    };
  }

  /* 
   * `_observeData` will create a map for easy reference while applying the colorScale
   */

  _draw() {
    let chart = super._draw();
    if (chart) {

      const map = this.data;

      chart = chart
        .attr('fill', (d, i) => {
          const value = map.get(this.featureAccessor(d, i) + '');
          return this.colorScale(value);
        });
    }
    return chart;
  }
}


export default MultiDrawableChoropleth;