import { MovieService } from "./services/movie/MovieService";
import { Query } from "./types/Query";

/**
 * The main client for the Lotr API.
 * */
export class LotrClient {
  private movieService: MovieService;

  /**
   * @param apiKey The API key to use for authentication.
   * @param enableLogging Whether to enable logging or not.
   * @returns A new instance of the LotrClient.
   * */
  constructor(apiKey: string, enableLogging: boolean) {
    const baseUrl = 'https://the-one-api.dev/v2';
    this.movieService = new MovieService(baseUrl, apiKey, enableLogging);
  }

  /**
   * Get all movies.
   * @param query The query to use for filtering
   * @returns A list of movies.
   * */
  public async getMovies(query?: Query) {
    return this.movieService.getMovies(query);
  }

  /**
   * Get a movie by id.
   * @param id The id of the movie.
   * @returns The movie with the given id.
   * */
  public async getMovieById(id: string) {
    return this.movieService.getMovieById(id);
  }
}