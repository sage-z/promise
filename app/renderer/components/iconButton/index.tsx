import * as React from 'react'
import { Ref, forwardRef,  PropsWithChildren } from 'react'
import { cx, css } from '@emotion/css'
interface BaseProps {
    className: string
    [key: string]: unknown
  }

type OrNull<T> = T | null

export const Button = forwardRef(
    (
      {
        className,
        active,
        reversed,
        ...props
      }: PropsWithChildren<
        {
          active: boolean
          reversed: boolean
        } & BaseProps
      >,
      ref: Ref<OrNull<HTMLSpanElement>>
    ) => (
      <span
        {...props}
        ref={ref}
        className={cx(
          className,
          css`
            cursor: pointer;
            color: ${reversed
              ? active
                ? 'white'
                : '#aaa'
              : active
              ? 'black'
              : '#ccc'};
          `
        )}
      />
    )
  )