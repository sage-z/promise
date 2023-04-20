'use strict';

import utils from './utils';
import bind from './helpers/bind';
import Axios from './core/Axios';
import mergeConfig from './core/mergeConfig';
import defaults from './defaults';



// Expose Cancel & CancelToken
export { Cancel } from './cancel/Cancel';
export { CancelToken } from './cancel/CancelToken';
export { isCancel } from './cancel/isCancel';
export { spread } from './helpers/spread';

// Expose isAxiosError
export { isAxiosError } from './helpers/isAxiosError';
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
export {Axios};

// Factory for creating new instances
export const create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios['defaults'], instanceConfig));
};


// Expose all/spread
export const all = function all(promises) {
  return Promise.all(promises);
};

export default axios;

// Allow use of default import syntax in TypeScript
// module.exports.default = axios;
