# multi-chart-choropleth

## MultiChartChoropleth

`<multi-chart-choropleth>` a choropleth-chart

**Mixins:** CacheId, RelayTo

## Properties

| Property          | Attribute          | Type      | Default      | Description                                      |
|-------------------|--------------------|-----------|--------------|--------------------------------------------------|
| `autoFit`         | `auto-fit`         | `boolean` |              | `autoFit` true to automatically fit geometries   |
| `choroplethAttrs` | `choropleth-attrs` | `string`  |              | `choroplethAttrs` default attributes to be set on the chart |
| `colorScale`      | `color-scale`      |           |              | `colorScale` scale to use for the choropleth     |
| `context`         | `context`          |           |              | [`context`](https://github.com/d3/d3-geo#path_context) to be applied to the path |
| `elastic`         | `elastic`          | `boolean` |              | `elastic` indicate whether colorscale shall be re-computed on data-change |
| `feature`         | `feature`          | `array`   |              | `feature` the GeoJSON Feature or FeatureCollection to be exposed by this component |
| `featureAccessor` | `feature-accessor` |           |              | `featureAccessor the accessor function from featureAccessorPath. |
| `featureFilter`   | `feature-filter`   |           |              | `featureFilter` the filter to use for filtering features<br />ex: function(f) {return f.id !== 10} // remove antartic from a world map |
| `featureForEach`  | `feature-for-each` |           |              | `featureForEach` a function that will run for each feature<br />ex: function(f) {return f.properties.id = lookup(f.id) } // take lookup code |
| `featureName`     | `feature-name`     | `string`  |              | `featureName` the name of the property to extract from the geo data object |
| `featurePath`     | `feature-path`     | `string`  | "id"         | `featurePath` the path for accessing the feature keys/ids |
| `featureUrl`      | `feature-url`      | `string`  |              | `featureUrl` url to use for fetching geo mesh data. |
| `geoType`         | `geo-type`         | `string`  | "topojson"   | `geoType` the type of data object (topojson or geojson) |
| `geometries`      | `geometries`       | `object`  |              | `geometries` topojson or geojson object. It is either retrieved iron-ajax or passed as an argument |
| `keyAccessor`     | `key-accessor`     |           |              | `keyAccessor` the value accessor function<br />example function : `d => {return +d.count}` |
| `keyPath`         | `key-path`         | `string`  | "key"        | `keyAccessorPath` path for computing the `keyAccessor` function<br />a key of ´key´ will generate  an accessor function like ´function(d) {return d.key}´<br />a key of ´+key.count´ will generate  an accessor function like ´function(d) {return +d.key.count}´ |
| `mesh`            | `mesh`             | `array`   |              | `feature` the geo feature to be exposed by this component |
| `meshAttrs`       | `mesh-attrs`       | `string`  |              | `meshAttrs` attributes to be set on the mesh     |
| `meshName`        | `mesh-name`        | `string`  |              | `meshName` the name of the property to extract from the geo data object |
| `path`            | `path`             |           |              | `path` the [path](https://github.com/d3/d3-geo#geoPath) generator function |
| `processType`     |                    | `string`  | "choropleth" |                                                  |
| `projection`      | `projection`       |           |              | `projection` the [projection](https://github.com/d3/d3-geo#projection) generator function |
| `valueAccessor`   | `value-accessor`   |           |              | `valueAccessor` the value accessor function<br />example function : `d => {return +d.count}` |
| `valuePath`       | `value-path`       | `string`  | "key"        | `valueAccessorPath` path for computing the `valueAccessor` function<br />a value of ´key´ will generate  an accessor function like ´function(d) {return d.key}´<br />a value of ´+value.count´ will generate  an accessor function like ´function(d) {return +d.value.count}´ |
| `valuePosition`   |                    | `string`  | "color"      |                                                  |

## Methods

| Method                | Type                         |
|-----------------------|------------------------------|
| `getContentRender`    | `(): any`                    |
| `onDataGroupRescaled` | `(e: any): void`             |
| `shallRelayTo`        | `(key: any, name: any): any` |
