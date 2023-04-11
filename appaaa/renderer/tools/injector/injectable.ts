import { rootInjector, Injector } from './injector';
import { InjectOptions } from './inject';

/**
 * Decorator @Injectable
 * 
 * to decorate an Service
 * defalut injector is rootInjector
 * defalut provide is Class which is decorated
 *
 * @export
 * @param {InjectOptions} [injectOptions]
 * @returns {(_constructor: any) => any}
 */
export function Injectable(injectOptions?: InjectOptions): (_constructor: any) => any {
  return function (_constructor: any): any {
    let injector: Injector = rootInjector;
    let provide: any = _constructor;
    if (injectOptions && injectOptions.injector) injector = injectOptions.injector;
    if (injectOptions && injectOptions.provide) provide = injectOptions.provide;
    injector.setProvider(provide, _constructor);
    return _constructor;
  };
}