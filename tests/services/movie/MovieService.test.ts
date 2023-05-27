import { MovieService } from '../../../src/services/movie/MovieService';
import { MovieEndpoint } from '../../../src/endpoints/movie/MovieEndpoint'
import { Movie } from '../../../src/types/Movie';
import { Pagination } from '../../../src/types/Pagination';
import { QueryParser } from '../../../src/utils/QueryParser';
import { Logger } from '../../../src/utils/Logger';
import { MovieMock } from '../../__mocks__/MovieMock';
import { ApiResponseMock } from '../../__mocks__/ApiResponseMock';

jest.mock('../../../src/endpoints/movie/MovieEndpoint');
jest.mock('../../../src/utils/Logger');

describe('MovieService', () => {
  const baseUrl = 'https://example.com/api';
  const apiKey = 'fake-api-key';
  const enableLogging = true;

  let movieService: MovieService;
  let movieEndpointMock: jest.Mocked<MovieEndpoint>;
  let loggerMock: jest.Mocked<Logger>;

  beforeEach(() => {
    movieEndpointMock = new MovieEndpoint(baseUrl, apiKey) as jest.Mocked<MovieEndpoint>;
    loggerMock = new Logger('') as jest.Mocked<Logger>;
    movieService = new MovieService(baseUrl, apiKey, enableLogging);
    (movieService as any).movieEndpoint = movieEndpointMock;
    (movieService as any).logger = loggerMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMovies', () => {
    it('should fetch movies successfully', async () => {
      const pagination: Pagination = {
        page: 1,
        limit: 10,
      };
      const query = QueryParser.parse({ pagination });
      const mockMovies: Movie[] = [
        MovieMock.generate(),
        MovieMock.generate(),
      ];
      const response = ApiResponseMock.generate<Movie[]>(mockMovies);

      movieEndpointMock.getMovies.mockResolvedValueOnce(response);

      const movies = await movieService.getMovies({ pagination });

      expect(movies.data).toEqual(mockMovies);
      expect(movieEndpointMock.getMovies).toHaveBeenCalledTimes(1);
      expect(movieEndpointMock.getMovies).toHaveBeenCalledWith(query);
      expect(loggerMock.error).not.toHaveBeenCalled();
    });

    it('should log error and re-throw when enableLogging is true', async () => {
      const pagination: Pagination = {
        page: 1,
        limit: 10,
      };
      const query = QueryParser.parse({ pagination });
      const errorMessage = 'Request failed';
      const error = new Error(errorMessage);

      movieEndpointMock.getMovies.mockRejectedValueOnce(error);

      await expect(movieService.getMovies({ pagination })).rejects.toThrow(error);

      expect(movieEndpointMock.getMovies).toHaveBeenCalledTimes(1);
      expect(movieEndpointMock.getMovies).toHaveBeenCalledWith(query);
      expect(loggerMock.error).toHaveBeenCalledWith(`Failed to get movies: Error: ${errorMessage}`);
    });

    it('should log and re-throw error when enableLogging is true', async () => {
      const pagination: Pagination = {
        page: 1,
        limit: 10,
      };
      const query = QueryParser.parse({ pagination });
      const errorMessage = 'Request failed';
      const error = new Error(errorMessage);
    
      movieEndpointMock.getMovies.mockRejectedValueOnce(error);
    
      await expect(movieService.getMovies({ pagination })).rejects.toThrow(error);
    
      expect(movieEndpointMock.getMovies).toHaveBeenCalledTimes(1);
      expect(movieEndpointMock.getMovies).toHaveBeenCalledWith(query);
      expect(loggerMock.error).toHaveBeenCalledWith(`Failed to get movies: Error: ${errorMessage}`);
    }); 

    it('should re-throw error when enableLogging is false', async () => {
      const pagination: Pagination = {
        page: 1,
        limit: 10,
      };
      const errorMessage = 'Request failed';
      const error = new Error(errorMessage);
      movieService = new MovieService(baseUrl, apiKey, false);
      
      (movieService as any).movieEndpoint = movieEndpointMock;
      (movieService as any).logger = loggerMock;
      movieEndpointMock.getMovies.mockRejectedValueOnce(error);

      await expect(movieService.getMovies({ pagination })).rejects.toThrow(error);

      expect(movieEndpointMock.getMovies).toHaveBeenCalledTimes(1);
      expect(movieEndpointMock.getMovies).toHaveBeenCalledWith(QueryParser.parse({ pagination }));
      expect(loggerMock.error).not.toHaveBeenCalled();
    });
  });
});
