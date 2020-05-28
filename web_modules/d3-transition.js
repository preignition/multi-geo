import './common/local-f0e67514.js';
import { S as SCHEDULED, T as Transition } from './common/index-7a73d836.js';
export { i as interrupt, t as transition } from './common/index-7a73d836.js';
import './common/cubehelix-c56427ca.js';
import './common/cubehelix-dc76d2a7.js';
import './common/string-4249d4c4.js';
import './common/index-1705e9a2.js';

var root = [null];

function active(node, name) {
  var schedules = node.__transition,
      schedule,
      i;

  if (schedules) {
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule = schedules[i]).state > SCHEDULED && schedule.name === name) {
        return new Transition([[node]], root, name, +i);
      }
    }
  }

  return null;
}

export { active };
