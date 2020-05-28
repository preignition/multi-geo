import '../../../common/local-f0e67514.js';
import { s as select } from '../../../common/select-8eacb60c.js';

function attrsFunction(selection, map) {
  return selection.each(function() {
    var x = map.apply(this, arguments), s = select(this);
    for (var name in x) s.attr(name, x[name]);
  });
}

function attrsObject(selection, map) {
  for (var name in map) selection.attr(name, map[name]);
  return selection;
}

function selection_attrs(map) {
  return (typeof map === "function" ? attrsFunction : attrsObject)(this, map);
}

export default selection_attrs;
