import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/**
 * ##  MultiGeoDrawable
 *
 * a mixin fo multi geo drawable. It will make sure we redraw when data is set.
 *
 * @memberof MultiChart.mixin
 * @polymer
 * @mixinFunction
 */
const MultiGeoDrawable = dedupingMixin(superClass => {

  return class extends superClass {

    static get properties() {
      return {

        ...super.properties,

        /*
         * `geoData` data to use for drawing geo chart.
         * we need another parameter as `data` because some chart - like choropleth - need both geo path data
         * and value data to display on the chart.
         */
        geoData: {
          type: Object,
          attribute: 'geo-data'
        }

      };
    }

    update(props) {
      this.log && console.info('update geo props', props, this);
      super.update(props);
      if (props.has('geoData')) {
        this._geoData = this.filterGeo(this.geoData);
      }
    }

    get drawableData() {
       return this._geoData;
    }

    filterGeo(data) {
      if (data) {
        // Note(cg): filter allows to dispay only a subset of the data.
        // This is usefull for instance when we want to display multiple groups.
        if (this.filter) {
          return data.filter(this.filter);
        }
        return data;
      }
    }
  };
});

export default MultiGeoDrawable;
