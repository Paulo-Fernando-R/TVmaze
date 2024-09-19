/* eslint-disable prettier/prettier */
import React, {ReactNode} from 'react';
import {render} from '@testing-library/react-native';
import {EpisodeList} from '../EpisodeList';
import {mocks} from './mocks';
import {QueryClient, QueryClientProvider} from 'react-query';
import {showService} from '../../../../../services/show/showService';

type Aux = {
  children: ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //resolve o erro do jest não parar ao terminar os testes
      cacheTime: Infinity,
    },
  },
});

const wrapper = ({children}: Aux) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('EpisodeList', () => {
  test('show all season one episodes at first', showSeasonOneFirst);
});

async function showSeasonOneFirst() {
  jest.spyOn(showService, 'getEpisodes').mockResolvedValueOnce({
    seasonNames: ['1', '2'],
    seasons: {
      1: [mocks.episode1, mocks.episode2],
      2: [mocks.episode22, mocks.episode23],
    },
  });

  const {getByText, findByText} = render(<EpisodeList show={mocks.show} />, {
    wrapper: wrapper,
  });

  //? necessário para funcção assíncrona na renderização
  const episode1 = await findByText(mocks.episode1.name);
  // o de baixo é diferente para evitar varios await e erro no console
  const episode2 = getByText(mocks.episode2.name);

  expect(episode1).toBeTruthy();
  expect(episode2).toBeTruthy();
}
