/* eslint-disable prettier/prettier */
import {render} from '@testing-library/react-native';
import React, {ReactElement, ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

type Aux = {
  children: ReactNode;
};

//? extrai a tipagem de um parametro de uma função (muito util caso a tipagem não seja exportada)
type Options = Parameters<typeof render>[1];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //resolve o erro do jest não parar ao terminar os testes
      cacheTime: Infinity,
    },
  },
});

const allTheProviders = ({children}: Aux) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const customRender = (ui: ReactElement, options?: Omit<Options, 'wrapper'>) =>
  render(ui, {wrapper: allTheProviders, ...options});

export * from '@testing-library/react-native';
export {customRender as render};
