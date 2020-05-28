import { f as creator } from './common/local-f0e67514.js';
export { f as creator, c as customEvent, e as event, l as local, m as matcher, n as namespace, g as namespaces, s as selection, a as selector, b as selectorAll, d as style, h as window } from './common/local-f0e67514.js';
import { s as select } from './common/select-8eacb60c.js';
export { s as select } from './common/select-8eacb60c.js';
import { a as sourceEvent, p as point } from './common/touch-fee1814e.js';
export { p as clientPoint, m as mouse, s as selectAll, t as touch } from './common/touch-fee1814e.js';

function create(name) {
  return select(creator(name).call(document.documentElement));
}

function touches(node, touches) {
  if (touches == null) touches = sourceEvent().touches;

  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
    points[i] = point(node, touches[i]);
  }

  return points;
}

export { create, touches };
