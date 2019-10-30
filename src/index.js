export * from './topojson/index.js';
export * from './drawable/index.js';
export * from './d3-wrapper/index.js';

export { default as MultiProject } from './helper/multi-project.js';
export { default as ContainerGeo } from './container/multi-container-geo.js';
export { default as Choropleth } from './chart/multi-chart-choropleth.js';

export const define = (name, cls) => {

  if (customElements.get(name)) {
    return console.warn(`custom element ${name} has already been registered`);
  }
  customElements.define(name, cls);
};