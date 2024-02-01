'use client';

import ReactQueryClientProvider from '@/components/Providers/ReactQueryClientProvider';
import { FC, ReactNode } from 'react';

const Providers: FC<{ children: ReactNode }> = ({ children }) => (
  <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
);

export default Providers;
