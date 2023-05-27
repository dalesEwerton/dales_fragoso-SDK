import axios from 'axios';
import { MovieEndpoint } from '../../../src/endpoints/movie/MovieEndpoint';
import { Movie } from '../../../src/types/Movie';
import { MovieMock } from '../../__mocks__/MovieMock';

jest.mock('axios');

describe('MovieEndpoint', () => {
  let movieEndpoint: MovieEndpoint;
  const fakeApiUrl = 'https://example.com/api';
  const fakeApiKey = 'fake-api-key';
  const headers = {
    Authorization: `Bearer ${fakeApiKey}`,
    'Content-Type': 'application/json',
  };


  beforeEach(() => {
    movieEndpoint = new MovieEndpoint(fakeApiUrl, fakeApiKey);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMovies', () => {
    it('should fetch movies successfully', async () => {
      const mockMovies: Movie[] = [
        MovieMock.generate(),
        MovieMock.generate(),
        MovieMock.generate(),
      ];

      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { docs: mockMovies } });

      const movies = await movieEndpoint.getMovies();

      expect(movies).toBeDefined();
      expect(movies.docs).toBeDefined();
      expect(movies.docs).toHaveLength(mockMovies.length);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${fakeApiUrl}/movie`, { headers });
    });

    it('should accept a query parameter', async () => {
      const mockMovies: Movie[] = [
        MovieMock.generate(),
        MovieMock.generate(),
      ];

      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { docs: mockMovies } });

      const query = '?name=The Lord of the Rings: The Fellowship of the Ring';
      const movies = await movieEndpoint.getMovies(query);

      expect(movies).toBeDefined();
      expect(movies.docs).toBeDefined();
      expect(movies.docs).toHaveLength(mockMovies.length);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${fakeApiUrl}/movie${query}`, { headers });
    });
  });
});
