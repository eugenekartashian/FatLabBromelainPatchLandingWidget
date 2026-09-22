import React from 'react';

type Props = { Lib: unknown; partition: 'landings'; children: React.ReactNode };

export function LandingChunkTranslations({ children }: Props) {
  return <>{children}</>;
}
