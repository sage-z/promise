import * as Immutable from 'immutable';
import { merge, scan } from 'rxjs';

var initialState = {
  foo: 'bar'
};

// var state = merge().scan((state, changeFn) => changeFn(state), Immutable.fromJS(initialState));

// export default state;