[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://webcomponents.org/element/polymerEl/multi-geo)

# \<multi-geo\>
Build composable, markup-based, extensible geo visualizations for the web. 

\<multi-geo\> (alon with \<multi-chart\>) is a Polymer/Webcomponent library to compose markup-driven and data-driven geo vizualization layers.

## Motivation
While building vizualisation for the web, it is difficult to find the right balance between low-level vizualization kernel (like d3) that requires a lot of development work, and high-level black box library that are difficult to configure beyond a certain point. 

\<multi-geo\> is a attempt to provide the best of two the worlds: low level extensible webcomponents (often wrapper around d3.js modules like d3-axis) composed together to build complex charts. The library proposes ready-to-use configurable charts, but also the building blocks for accomodating more complex use case. 

\<multi-geo\>, plays well with [\<multi-chart\>](https://github.com/PolymerEl/multi-chart) (similar library for standart charts) and [\<multi-verse\>](https://github.com/PolymerEl/multi-verse), a graphical interactive multi-dimensional analysis tool. Together, they offer a markup based alternative to tools like [dc.js](https://dc-js.github.io/dc.js/)

## Examples
[Demo](https://webcomponents.org/element/polymerEl/multi-geo/demo/index.html) are [and API documentation available here](https://webcomponents.org/element/polymerEl/multi-geo).

### Features
<div>
  <img src="https://raw.githubusercontent.com/PolymerEl/multi-geo/master/images/features.png" width="300"></img>
</div>

### Choropleth
<div>
  <img src="https://raw.githubusercontent.com/PolymerEl/multi-geo/master/images/choropleth.png" width="300"></img>
</div>


## Dependencies
For using \<multi-chart\>, please make sure that the following packages a available on the client: 
- [d3.js v5](https://d3js.org/) 
- [d3-svg-legend](http://d3-legend.susielu.com/)
- [d3-tip](https://github.com/Caged/d3-tip)
- [topojson](https://github.com/topojson/topojson)

The easiest is to import [d3-bundle-element/d3-bundle-element-multi.html](https://github.com/PolymerEl/d3-bundle) and [topojson-element/d3-bundle-element-multi.html](https://github.com/PolymerEl/d3-bundle), which already includes all required rependencies. 





