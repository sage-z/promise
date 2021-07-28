import * as React from 'react';
import { Component } from 'react';
import type { ReactText } from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import { CSSMotionList } from 'rc-motion';
import type { NoticeProps } from './Notice';
import Notice from './Notice';

let seed = 0;
const now = Date.now();

function getUuid() {
  const id = seed;
  seed += 1;
  return `rcNotification_${now}_${id}`;
}

export interface NoticeContent
  extends Omit<NoticeProps, 'prefixCls' | 'children' | 'noticeKey' | 'onClose'> {
  prefixCls?: string;
  key?: React.Key;
  updateMark?: string;
  content?: React.ReactNode;
  onClose?: () => void;
}

export type NoticeFunc = (noticeProps: NoticeContent) => void;

export interface NotificationInstance {
  notice: NoticeFunc;
  removeNotice: (key: React.Key) => void;
  destroy: () => void;
  component: Notification;
}

export interface NotificationProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  transitionName?: string;
  animation?: string | object;
}

interface NotificationState {
  notices: {
    notice: NoticeContent & {
      userPassKey?: React.Key;
    };
  }[];
}

class Notification extends Component<NotificationProps, NotificationState> {
  static newInstance: (
    properties: NotificationProps & { getContainer?: () => HTMLElement },
    callback: (instance: NotificationInstance) => void,
  ) => void;

  static defaultProps = {
    prefixCls: 'command',
    animation: 'fade',
    style: {
      top: 65,
      left: '50%',
    },
  };

  state: NotificationState = {
    notices: [],
  };

  getTransitionName() {
    const { prefixCls, animation } = this.props;
    let { transitionName } = this.props;
    if (!transitionName && animation) {
      transitionName = `${prefixCls}-${animation}`;
    }
    return transitionName;
  }

  add = (originNotice: NoticeContent) => {
    const key = originNotice.key || getUuid();
    const notice: NoticeContent & { key: React.Key; userPassKey?: React.Key } = {
      ...originNotice,
      key,
    };
    this.setState({ notices: [{ notice }]})
  };

  remove = (removeKey: React.Key) => {
    this.setState({notices: []})
  };

  noticePropsMap: Record<
    React.Key,
    {
      props: NoticeProps & {
        key: ReactText;
      };
    }
  > = {};

  render() {
    const { notices } = this.state;
    const { prefixCls, className, style } = this.props;

    const noticeKeys: React.Key[] = [];

    notices.forEach(({ notice }, index) => {
      const updateMark = index === notices.length - 1 ? notice.updateMark : undefined;
      const { key, userPassKey } = notice;

      const noticeProps = {
        prefixCls,
        ...notice,
        ...notice.props,
        key,
        noticeKey: userPassKey || key,
        updateMark,
        onClose: (noticeKey: React.Key) => {
          this.remove(noticeKey);
          notice.onClose?.();
        },
        onClick: notice.onClick,
        children: notice.content,
      } as NoticeProps & { key: ReactText };

      // Give to motion
      noticeKeys.push(key as React.Key);
      this.noticePropsMap[key as React.Key] = { props: noticeProps };
    });

    return (
      <div className={classNames(prefixCls, className)} style={style}>
        <CSSMotionList
          keys={noticeKeys}
          motionName={this.getTransitionName()}
          onVisibleChanged={(changedVisible, { key }) => {
            if (!changedVisible) {
              delete this.noticePropsMap[key];
            }
          }}
        >
          {({ key, className: motionClassName, style: motionStyle, visible }) => {
            const { props: noticeProps } = this.noticePropsMap[key];

            return (
              <Notice
                {...noticeProps}
                className={classNames(motionClassName, noticeProps?.className)}
                style={{ ...motionStyle, ...noticeProps?.style }}
                visible={visible}
              />
            );
          }}
        </CSSMotionList>
      </div>
    );
  }
}

Notification.newInstance = function newNotificationInstance(properties, callback) {
  const { getContainer, ...props } = properties || {};
  const div = document.createElement('div');
  if (getContainer) {
    const root = getContainer();
    root.appendChild(div);
  } else {
    document.body.appendChild(div);
  }
  let called = false;
  function ref(notification: Notification) {
    if (called) {
      return;
    }
    called = true;
    callback({
      notice(noticeProps) {
        notification.add(noticeProps);
      },
      removeNotice(key) {
        notification.remove(key);
      },
      component: notification,
      destroy() {
        ReactDOM.unmountComponentAtNode(div);
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
      }
    });
  }

  ReactDOM.render(<Notification {...props} ref={ref} />, div);
};

export default Notification;