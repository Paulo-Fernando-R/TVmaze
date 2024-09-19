/* eslint-disable prettier/prettier */
import {api} from '../../api';
import {showService} from '../showService';
import {episode1, episode2, episode22, episode23, episodeList} from './mocks';

describe('showService', () => {
  describe('getEpisodes', () => {
    beforeAll(before);
    test('functionCalled', isCalled);
    test('when API return episode list return all season names', seasonNames);

    test(
      'when API return episode list return the episodes grouped by season',
      episodes,
    );
  });
});

function before() {
  jest
    .spyOn(api, 'get')
    .mockImplementation(() => Promise.resolve({data: episodeList}));
}

async function isCalled() {
  const spyFn = jest.spyOn(api, 'get').mockResolvedValue({data: episodeList});
  await showService.getEpisodes('1');
  expect(spyFn).toBeCalledTimes(1);
}

async function seasonNames() {
  const groupedEpisodes = await showService.getEpisodes('250');

  expect(groupedEpisodes.seasonNames.includes('1')).toBeTruthy();
  expect(groupedEpisodes.seasonNames.includes('2')).toBeTruthy();
  expect(groupedEpisodes.seasonNames.length).toBe(2);
}

async function episodes() {
  const groupedEpisodes = await showService.getEpisodes('250');

  const temp1 = groupedEpisodes.seasons[1];
  const temp2 = groupedEpisodes.seasons[2];

  expect(temp1.includes(episode1)).toBeTruthy();
  expect(temp1.includes(episode2)).toBeTruthy();

  expect(temp2.includes(episode22)).toBeTruthy();
  expect(temp2.includes(episode23)).toBeTruthy();
}
