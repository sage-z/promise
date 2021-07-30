import 'reflect-metadata';
import { Injector, rootInjector } from './injector';

export type InjectOptions = {
  provide?: any;
  injector?: Injector;
};

/**
 * For declearation dependence in Class
 *
 * @export
 * @param {InjectOptions} [injectOptions]
 * @returns {(_constructor: any, propertyName: string) => any}
 */
export function Inject(injectOptions?: InjectOptions): (_constructor: any, propertyName: string) => any {
  return function (_constructor: any, propertyName: string): any {
    const  propertyType: any = injectOptions && injectOptions.provide ? injectOptions.provide : Reflect.getMetadata('design:type', _constructor, propertyName);
    const injector: Injector = injectOptions && injectOptions.injector ? injectOptions.injector : rootInjector;

    const providerInsntance = injector.getInstance(propertyType);
    _constructor[propertyName] = providerInsntance;

    return (_constructor as any)[propertyName];
  };
}