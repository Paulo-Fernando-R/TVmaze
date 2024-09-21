/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {BASE_URL} from 'src/services/api';

import {http, HttpResponse} from 'msw';
import {showMocks} from 'test/mocks/showMocks';

export const handlers = [
  http.get(`${BASE_URL}shows/:showId/episodes`, resolver => {
    return new HttpResponse(showMocks.episodeList, {status: 200}).json();
  }),
];
