import {server} from './server/server';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());


/*
"setupFilesAfterEnv": [
      "./test/setup-env.js"
    ],
*/