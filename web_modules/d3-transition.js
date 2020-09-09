import './common/index-e369b43e.js';
import { S as SCHEDULED, T as Transition } from './common/index-68c863de.js';
export { i as interrupt, t as transition } from './common/index-68c863de.js';
import './common/rgb-3087d777.js';
import './common/string-25a4a3cd.js';
import './common/index-181a2926.js';

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
