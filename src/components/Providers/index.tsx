'use client';

import { Analytics } from '@vercel/analytics/react';
import ReactQueryClientProvider from '@/components/Providers/ReactQueryClientProvider';
import { FC, ReactNode } from 'react';

const Providers: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <ReactQueryClientProvider>
      {children}
      <Analytics />
    </ReactQueryClientProvider>
  </>
);

export default Providers;
