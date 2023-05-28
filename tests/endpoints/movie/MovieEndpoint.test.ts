import axios from 'axios';
import { MovieEndpoint } from '../../../src/endpoints/movie/MovieEndpoint';
import { Movie } from '../../../src/types/Movie';
import { MovieMock } from '../../__mocks__/MovieMock';
import { Quote } from '../../../src/types/Quote';
import { QuoteMock } from '../../__mocks__/QuoteMock';

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

  describe('getMovieById', () => {
    it('should fetch a movie successfully', async () => {
      const mockedMovie = [MovieMock.generate()];
      const id = 'fake-id';

      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { docs: mockedMovie } });

      const movie = await movieEndpoint.getMovieById(id);

      expect(movie).toBeDefined();
      expect(movie.docs).toBeDefined();
      expect(movie.docs).toHaveLength(mockedMovie.length);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${fakeApiUrl}/movie/${id}`, { headers });
    });
  });

  describe('getMovieQuotes', () => {
    it('should fetch movie quotes successfully', async () => {
      const mockedQuotes = [
        QuoteMock.generate(),
        QuoteMock.generate(),
        QuoteMock.generate(),
      ];
      const movieId = 'fake-movie-id';

      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { docs: mockedQuotes } });

      const quotes = await movieEndpoint.getMovieQuotes(movieId);

      expect(quotes).toBeDefined();
      expect(quotes.docs).toBeDefined();
      expect(quotes.docs).toHaveLength(mockedQuotes.length);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${fakeApiUrl}/movie/${movieId}/quote`, { headers });
    });

    it('should accept a query parameter', async () => {
      const mockedQuotes = [
        QuoteMock.generate(),
        QuoteMock.generate(),
      ];
      const movieId = 'fake-movie-id';
      const query = '?character=Gandalf';

      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { docs: mockedQuotes } });

      const quotes = await movieEndpoint.getMovieQuotes(movieId, query);

      expect(quotes).toBeDefined();
      expect(quotes.docs).toBeDefined();
      expect(quotes.docs).toHaveLength(mockedQuotes.length);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${fakeApiUrl}/movie/${movieId}/quote${query}`, { headers });
    });
  }); 
});
