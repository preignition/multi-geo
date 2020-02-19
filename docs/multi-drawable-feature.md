# multi-drawable-feature

## MultiDrawableFeature

`<multi-drawable-feature>` polymer elements responsible for drawing choropleth area in a geo-chart

### Example
```html
    <!-- fetch topojson features from  -->
    <topojson-feature id="feature" feature="{{feature}}" data="{{geometries}}" name="countries" url="worldSimplify01.json"></topojson-feature>
    <!-- configure transition for this chart  -->
    <d3-transition transition="{{transition}}" duration="500"></d3-transition>
    <!-- a multi-container-geo will expose path and projection -->
    <multi-container-geo
      id="chart"
      projection="{{projection}}"
      path="{{path}}"
      projection-type="[[projectionType]]"
      rotate="[[rotate]]"
      translate="[[translate]]"
      scale="[[scale]]"
      >
        <!-- group of geo elements. When feature changes, contained elements will redraw -->
        <multi-container-layer data="[[feature]]" >
          <!-- draw features with projected to projection -->
          <multi-drawable-feature transition="[[transition]]" projection="[[projection]]" path="[[path]]">
          </multi-drawable-feature>
        </multi-container-layer>
      </multi-container-geo>
```

**Mixins:** MultiGeoMixin

## Properties

| Property          | Attribute          | Modifiers | Type      | Default | Description                                      |
|-------------------|--------------------|-----------|-----------|---------|--------------------------------------------------|
| `attrs`           | `attrs`            |           | `object`  |         | `attrs` default attributes to be set on the chart |
| `autoFit`         | `auto-fit`         |           | `boolean` |         | `autoFit` if true, will recalculate the projectoin so as to fit features<br />within chart size. |
| `drawableData`    |                    | readonly  |           |         |                                                  |
| `featureAccessor` | `feature-accessor` |           |           |         | `featureAccessor the accessor function from featureAccessorPath. |
| `featurePath`     | `feature-path`     |           | `string`  | "id"    | `featureAccessorPath` the path for accessing the feature keys/ids |
| `geoData`         | `geo-data`         |           | `object`  |         | `geoData` data to use for drawing geo chart.<br />we need another parameter as `data` because some chart - like choropleth - need both geo path data<br />and value data to display on the chart. |
| `labelAccessor`   | `label-accessor`   |           |           |         | `labelAccessor the accessor function from labelAccessorPath. |
| `labelPath`       | `label-path`       |           | `string`  |         | `labelAccessorPath` the path for accessing the feature keys/ids |
| `path`            | `path`             |           |           |         | `path` the [path](https://github.com/d3/d3-geo#geoPath) generator function |
| `shapeClass`      |                    | readonly  | `string`  |         |                                                  |
| `shapeName`       |                    | readonly  | `string`  |         |                                                  |

## Methods

| Method      | Type                              |
|-------------|-----------------------------------|
| `doFit`     | `(): void`                        |
| `draw`      | `(feature: any): any`             |
| `filterGeo` | `(data: any): any`                |
| `resize`    | `(width: any, height: any): void` |
