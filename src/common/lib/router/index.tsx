import React from 'react';

type Props = { to?: string; className?: string; children?: React.ReactNode; [key: string]: unknown };

export function Link({ to = '', children, ...rest }: Props) {
  return <a href={to} {...rest}>{children}</a>;
}
