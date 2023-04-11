import * as React from 'react';
import IconContext from '@ant-design/icons/lib/components/Context';
import { FormProvider as RcFormProvider } from 'rc-field-form';
import { ValidateMessages } from 'rc-field-form/lib/interface';
import useMemo from 'rc-util/lib/hooks/useMemo';
import {
  ConfigConsumer,
  ConfigContext,
  CSPConfig,
  DirectionType,
  ConfigConsumerProps,
} from './context';
import SizeContext, { SizeContextProvider, SizeType } from './SizeContext';

export {
  ConfigContext,
  ConfigConsumer,
  CSPConfig,
  DirectionType,
  ConfigConsumerProps,
};

export const configConsumerProps = [
  'getTargetContainer',
  'getPopupContainer',
  'rootPrefixCls',
  'getPrefixCls',
  'renderEmpty',
  'csp',
  'autoInsertSpaceInButton',
  'locale',
  'pageHeader',
];

// These props is used by `useContext` directly in sub component
const PASSED_PROPS: Exclude<keyof ConfigConsumerProps, 'rootPrefixCls' | 'getPrefixCls'>[] = [
  'getTargetContainer',
  'getPopupContainer',
  'pageHeader',
  'input',
];

export interface ConfigProviderProps {
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  prefixCls?: string;
  iconPrefixCls?: string;
  children?: React.ReactNode;
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
  form?: {
    validateMessages?: ValidateMessages;
  };
  input?: {
    autoComplete?: string;
  };
  pageHeader?: {
    ghost: boolean;
  };
  componentSize?: SizeType;
  direction?: DirectionType;
  space?: {
    size?: SizeType | number;
  };
  virtual?: boolean;
  dropdownMatchSelectWidth?: boolean;
}

interface ProviderChildrenProps extends ConfigProviderProps {
  parentContext: ConfigConsumerProps;
}

export const defaultPrefixCls = 'ant';
let globalPrefixCls: string;

const setGlobalConfig = (params: Pick<ConfigProviderProps, 'prefixCls'>) => {
  if (params.prefixCls !== undefined) {
    globalPrefixCls = params.prefixCls;
  }
};

function getGlobalPrefixCls() {
  return globalPrefixCls || defaultPrefixCls;
}

export const globalConfig = () => ({
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
  },
  getRootPrefixCls: (rootPrefixCls?: string, customizePrefixCls?: string) => {
    // Customize rootPrefixCls is first priority
    if (rootPrefixCls) {
      return rootPrefixCls;
    }

    // If Global prefixCls provided, use this
    if (globalPrefixCls) {
      return globalPrefixCls;
    }

    // [Legacy] If customize prefixCls provided, we cut it to get the prefixCls
    if (customizePrefixCls && customizePrefixCls.includes('-')) {
      return customizePrefixCls.replace(/^(.*)-[^-]*$/, '$1');
    }

    // Fallback to default prefixCls
    return getGlobalPrefixCls();
  },
});

const ProviderChildren: React.FC<ProviderChildrenProps> = props => {
  const {
    children,
    csp,
    autoInsertSpaceInButton,
    form,
    componentSize,
    direction,
    space,
    virtual,
    dropdownMatchSelectWidth,
    parentContext,
    iconPrefixCls,
  } = props;

  const getPrefixCls = React.useCallback(
    (suffixCls: string, customizePrefixCls?: string) => {
      const { prefixCls } = props;

      if (customizePrefixCls) return customizePrefixCls;

      const mergedPrefixCls = prefixCls || parentContext.getPrefixCls('');

      return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
    },
    [parentContext.getPrefixCls, props.prefixCls],
  );

  const config = {
    ...parentContext,
    csp,
    autoInsertSpaceInButton,
    direction,
    space,
    virtual,
    dropdownMatchSelectWidth,
    getPrefixCls,
  };

  // Pass the props used by `useContext` directly with child component.
  // These props should merged into `config`.
  PASSED_PROPS.forEach(propName => {
    const propValue: any = props[propName];
    if (propValue) {
      (config as any)[propName] = propValue;
    }
  });

  // https://github.com/ant-design/ant-design/issues/27617
  const memoedConfig = useMemo(
    () => config,
    config,
    (prevConfig: Record<string, any>, currentConfig) => {
      const prevKeys = Object.keys(prevConfig);
      const currentKeys = Object.keys(currentConfig);
      return (
        prevKeys.length !== currentKeys.length ||
        prevKeys.some(key => prevConfig[key] !== currentConfig[key])
      );
    },
  );

  const memoIconContextValue = React.useMemo(() => ({ prefixCls: iconPrefixCls, csp }), [
    iconPrefixCls,
  ]);

  let childNode = children;
  // Additional Form provider
  let validateMessages: ValidateMessages = {};

  if (form && form.validateMessages) {
    validateMessages = { ...validateMessages, ...form.validateMessages };
  }

  if (Object.keys(validateMessages).length > 0) {
    childNode = <RcFormProvider validateMessages={validateMessages}>{children}</RcFormProvider>;
  }

  if (iconPrefixCls) {
    childNode = (
      <IconContext.Provider value={memoIconContextValue}>{childNode}</IconContext.Provider>
    );
  }

  if (componentSize) {
    childNode = <SizeContextProvider size={componentSize}>{childNode}</SizeContextProvider>;
  }

  return <ConfigContext.Provider value={memoedConfig}>{childNode}</ConfigContext.Provider>;
};

const ConfigProvider: React.FC<ConfigProviderProps> & {
  ConfigContext: typeof ConfigContext;
  SizeContext: typeof SizeContext;
  config: typeof setGlobalConfig;
} = props => {
  React.useEffect(() => {

  }, [props.direction]);

  return (
        <ConfigConsumer>
          {context => (
            <ProviderChildren
              parentContext={context}
              {...props}
            />
          )}
        </ConfigConsumer>
  );
};

/** @private internal Usage. do not use in your production */
ConfigProvider.ConfigContext = ConfigContext;
ConfigProvider.SizeContext = SizeContext;
ConfigProvider.config = setGlobalConfig;

export default ConfigProvider;
