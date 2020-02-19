import { Drawable } from '@preignition/multi-chart';
import { html, css } from 'lit-element';
import { select } from 'd3-selection';

// import { transition } from 'd3-transition';
import { transition } from 'd3-transition';
import { multiSelection, multiTransition } from '../helper/utils.js';
import { default as MultiGeoMixin } from './mixin/drawable-geo-mixin.js';

// Note(cg): multi-select is not part of d3-selection.
// This is to allow selection.attrs.
multiSelection(select().constructor);
multiTransition(transition().constructor);
/**
 * ## MultiDrawableFeature
 *
 * `<multi-drawable-feature>` polymer elements responsible for drawing choropleth area in a geo-chart
 *
 * ### Example
 * ```html
 *    <!-- fetch topojson features from  -->
 *    <topojson-feature id="feature" feature="{{feature}}" data="{{geometries}}" name="countries" url="worldSimplify01.json"></topojson-feature>
 *    <!-- configure transition for this chart  -->
 *    <d3-transition transition="{{transition}}" duration="500"></d3-transition>
 *    <!-- a multi-container-geo will expose path and projection -->
 *    <multi-container-geo
 *      id="chart"
 *      projection="{{projection}}"
 *      path="{{path}}"
 *      projection-type="[[projectionType]]"
 *      rotate="[[rotate]]"
 *      translate="[[translate]]"
 *      scale="[[scale]]"
 *      >
 *        <!-- group of geo elements. When feature changes, contained elements will redraw -->
 *        <multi-container-layer data="[[feature]]" >
 *          <!-- draw features with projected to projection -->
 *          <multi-drawable-feature transition="[[transition]]" projection="[[projection]]" path="[[path]]">
 *          </multi-drawable-feature>
 *        </multi-container-layer>
 *      </multi-container-geo>
 * ```
 *
 * @element multi-drawable-feature 
 * @cssprops --multi-drawable-feature-stroke-color -  stroke color for features
 * @cssprops --multi-drawable-feature-fill-color -  fill color for features
 **/

class MultiDrawableFeature extends
  MultiGeoMixin(Drawable) {

  // Note(cg): style to add to svghost while dispatching SVG.
  static get hostStyles() {
    return css `
       .multi-drawable-feature {
        stroke: var(--multi-drawable-feature-stroke-color, var(--secondary-text-color, grey));
        fill: var(--multi-drawable-feature-fill-color, none);
      }

      .feature.selectable:hover  {
        stroke-opacity: 0.7;
        fill-opacity: 0.7;
      }
      `;
  }


  // Note(cg): stores all ids under this.$
  // firstUpdated(props) {
  //   super.firstUpdated(props);
  //   console.info("FIRST")
  // }
  render() {
    return this.html `
     ${this.featurePath ? this.html`
        <multi-accessor 
          .path="${this.featurePath}"
          @accessor-changed="${e => this.featureAccessor = e.detail.value}" 
        ></multi-accessor>` : ''}    
     ${this.labelPath ? this.html`
        <multi-accessor 
          .path="${this.labelPath}"
          @accessor-changed="${e => this.labelAccessor = e.detail.value}" 
        ></multi-accessor>` : ''}
    <svg>
      <g id="drawable" part="feature" slot-svg="slot-layer" class="multi-drawable-feature"></g>
    </svg>
    `;
  }

  static get properties() {
    return {

      ...super.properties,

      /**
       * `path` the [path](https://github.com/d3/d3-geo#geoPath) generator function
       */
      path: {
        type: Function
      },

      /**
       * `attrs` default attributes to be set on the chart
       */
      attrs: {
        type: Object,
        value: function() {
          return null;
        }
      },

      /*
       * `autoFit` if true, will recalculate the projectoin so as to fit features
       * within chart size.
       */
      autoFit: {
        type: Boolean,
        attribute: 'auto-fit'
      },

      /**
       * `featureAccessorPath` the path for accessing the feature keys/ids
       */
      featurePath: {
        type: String,
        value: 'id',
        attribute: 'feature-path'
      },

      /**
       * `featureAccessor the accessor function from featureAccessorPath.
       */
      featureAccessor: {
        type: Function,
        notify: true,
        attribute: 'feature-accessor'
      },

      /**
       * `labelAccessorPath` the path for accessing the feature keys/ids
       */
      labelPath: {
        type: String,
        attribute: 'label-path'
      },

      /**
       * `labelAccessor the accessor function from labelAccessorPath.
       */
      labelAccessor: {
        type: Function,
        attribute: 'label-accessor'
      },
    };
  }

  get shapeName() {
    return 'path';
  }

  get shapeClass() {
    return 'feature';
  }

  draw(feature) {
    if (!this.path) {
      this.log && console.warn('trying to draw but geo path is not yet set');
      return false;
    }
    const drawable = this.drawableData;

    if (!drawable) {
      this.log && console.warn('data not yet set');
      return false;
    }

    if (!drawable.features) {
      this.log && console.error('data must contain features');
      return false;
    }

    this.log && console.info('draw path');

    this.doFit();

    let chart = select(this.targetElement).selectAll(`${this.shapeName}.${this.shapeClass}`);
    chart = chart.data(drawable.features);

    chart.exit().remove();

    chart = chart.enter().append(this.shapeName)
      .attr('class', `${this.shapeClass} selectable`)
      .merge(chart);

    //  we add a title element when labelAccessor exists
    if (this.labelAccessor) {
      chart.selectAll('title')
        .data(d => [d])
        .enter()
        .append('title')
        .text((d, i) => this.labelAccessor(d, i));
    }

    if (this.shallTransition && this.transition) {
      chart = this.applyTransition(chart, this.transition);
    }

    return chart
      .attrs(this.attrs)
      .attr('key', (d, i) => this.featureAccessor(d, i))
      .attr('d', this.path);
  }

  resize(width, height) {
    super.resize(width, height);
    this.doFit();
  }

  doFit() {
    if (this.autoFit && this.drawableData && this.path && !this._isFitting) {
      const projection = this.path.projection();
      projection.fitExtent([
        [0, 0],
        [this.width, this.height]
      ], this.drawableData);

    }
  }
}

export default MultiDrawableFeature;
