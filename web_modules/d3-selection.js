import { e as creator } from './common/index-e369b43e.js';
export { e as creator, m as matcher, n as namespace, f as namespaces, s as selection, a as selector, b as selectorAll, c as style, g as window } from './common/index-e369b43e.js';
import { s as select } from './common/select-d9849a38.js';
export { s as select } from './common/select-d9849a38.js';
import { a as sourceEvent, p as pointer } from './common/selectAll-52b2c3d9.js';
export { p as pointer, s as selectAll } from './common/selectAll-52b2c3d9.js';

function create(name) {
  return select(creator(name).call(document.documentElement));
}

var nextId = 0;

function local() {
  return new Local;
}

function Local() {
  this._ = "@" + (++nextId).toString(36);
}

Local.prototype = local.prototype = {
  constructor: Local,
  get: function(node) {
    var id = this._;
    while (!(id in node)) if (!(node = node.parentNode)) return;
    return node[id];
  },
  set: function(node, value) {
    return node[this._] = value;
  },
  remove: function(node) {
    return this._ in node && delete node[this._];
  },
  toString: function() {
    return this._;
  }
};

function pointers(events, node) {
  if (events.target) { // i.e., instanceof Event, not TouchList or iterable
    events = sourceEvent(events);
    if (node === undefined) node = events.currentTarget;
    events = events.touches || [events];
  }
  return Array.from(events, event => pointer(event, node));
}

export { create, local, pointers };
