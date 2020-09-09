import { s as selection } from './common/index-e369b43e.js';
import { s as select } from './common/select-d9849a38.js';
import { t as transition } from './common/index-68c863de.js';
import './common/rgb-3087d777.js';
import './common/string-25a4a3cd.js';
import './common/index-181a2926.js';
import selection_attrs from './d3-selection-multi/src/selection/attrs.js';
import transition_attrs from './d3-selection-multi/src/transition/attrs.js';

function stylesFunction(selection, map, priority) {
  return selection.each(function() {
    var x = map.apply(this, arguments), s = select(this);
    for (var name in x) s.style(name, x[name], priority);
  });
}

function stylesObject(selection, map, priority) {
  for (var name in map) selection.style(name, map[name], priority);
  return selection;
}

function selection_styles(map, priority) {
  return (typeof map === "function" ? stylesFunction : stylesObject)(this, map, priority == null ? "" : priority);
}

function propertiesFunction(selection, map) {
  return selection.each(function() {
    var x = map.apply(this, arguments), s = select(this);
    for (var name in x) s.property(name, x[name]);
  });
}

function propertiesObject(selection, map) {
  for (var name in map) selection.property(name, map[name]);
  return selection;
}

function selection_properties(map) {
  return (typeof map === "function" ? propertiesFunction : propertiesObject)(this, map);
}

function stylesFunction$1(transition, map, priority) {
  return transition.each(function() {
    var x = map.apply(this, arguments), t = select(this).transition(transition);
    for (var name in x) t.style(name, x[name], priority);
  });
}

function stylesObject$1(transition, map, priority) {
  for (var name in map) transition.style(name, map[name], priority);
  return transition;
}

function transition_styles(map, priority) {
  return (typeof map === "function" ? stylesFunction$1 : stylesObject$1)(this, map, priority == null ? "" : priority);
}

selection.prototype.attrs = selection_attrs;
selection.prototype.styles = selection_styles;
selection.prototype.properties = selection_properties;
transition.prototype.attrs = transition_attrs;
transition.prototype.styles = transition_styles;
