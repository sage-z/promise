import * as React from 'react';
import { SizeType } from './SizeContext';

export interface CSPConfig {
  nonce?: string;
}

export type DirectionType = 'ltr' | 'rtl' | undefined;

export interface ConfigConsumerProps {
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  rootPrefixCls?: string;
  iconPrefixCls?: string;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
  input?: {
    autoComplete?: string;
  };
  pageHeader?: {
    ghost: boolean;
  };
  direction?: DirectionType;
  space?: {
    size?: SizeType | number;
  };
  virtual?: boolean;
  dropdownMatchSelectWidth?: boolean;
}

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `ant-${suffixCls}` : 'ant';
};

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  // We provide a default function for Context without provider
  getPrefixCls: defaultGetPrefixCls,

});

export const ConfigConsumer = ConfigContext.Consumer;

// =========================== withConfigConsumer ===========================
// We need define many types here. So let's put in the block region
type IReactComponent<P = any> =
  | React.FC<P>
  | React.ComponentClass<P>
  | React.ClassicComponentClass<P>;

interface BasicExportProps {
  prefixCls?: string;
}

interface ConsumerConfig {
  prefixCls: string;
}

interface ConstructorProps {
  displayName?: string;
}

/** @deprecated Use hooks instead. This is a legacy function */
export function withConfigConsumer<ExportProps extends BasicExportProps>(config: ConsumerConfig) {
  return function withConfigConsumerFunc<ComponentDef>(
    Component: IReactComponent,
  ): React.FC<ExportProps> & ComponentDef {
    // Wrap with ConfigConsumer. Since we need compatible with react 15, be care when using ref methods
    const SFC = ((props: ExportProps) => (
      <ConfigConsumer>
        {(configProps: ConfigConsumerProps) => {
          const { prefixCls: basicPrefixCls } = config;
          const { getPrefixCls } = configProps;
          const { prefixCls: customizePrefixCls } = props;
          const prefixCls = getPrefixCls(basicPrefixCls, customizePrefixCls);
          return <Component {...configProps} {...props} prefixCls={prefixCls} />;
        }}
      </ConfigConsumer>
    )) as React.FC<ExportProps> & ComponentDef;

    const cons: ConstructorProps = Component.constructor as ConstructorProps;
    const name = (cons && cons.displayName) || Component.name || 'Component';

    SFC.displayName = `withConfigConsumer(${name})`;

    return SFC;
  };
}
