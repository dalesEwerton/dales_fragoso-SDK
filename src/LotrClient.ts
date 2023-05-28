import { MovieService } from "./services/movie/MovieService";
import { QuoteService } from "./services/quote/QuoteService";
import { Query } from "./types/Query";
import { ClientResponse } from "./types/ClientResponse";
import { Movie } from "./types/Movie";
import { Quote } from "./types/Quote";

/**
 * The main client for the Lotr API.
 * */
export class LotrClient {
  private movieService: MovieService;
  private quoteService: QuoteService;

  /**
   * @param apiKey The API key to use for authentication.
   * @param enableLogging Whether to enable logging or not.
   * @returns A new instance of the LotrClient.
   * */
  constructor(apiKey: string, enableLogging: boolean) {
    const baseUrl = 'https://the-one-api.dev/v2';
    this.movieService = new MovieService(baseUrl, apiKey, enableLogging);
    this.quoteService = new QuoteService(baseUrl, apiKey, enableLogging);
  }

  /**
   * Get all movies.
   * @param query The query to use for filtering
   * @returns A list of movies.
   * */
  public async getMovies(query?: Query): Promise<ClientResponse<Movie[]>> {
    return this.movieService.getMovies(query);
  }

  /**
   * Get a movie by id.
   * @param id The id of the movie.
   * @returns The movie with the given id.
   * */
  public async getMovieById(id: string): Promise<ClientResponse<Movie>> {
    return this.movieService.getMovieById(id);
  }

  /**
   * Get quotes from a movie.
   * @param id The id of the movie.
   * @param query The query to use for filtering.
   * @returns A list of characters.
   * */
  public async getMovieQuotes(id: string, query?: Query): Promise<ClientResponse<Quote[]>> {
    return this.movieService.getMovieQuotes(id, query);
  }

  /**
   * Get all quotes.
   * @param query The query to use for filtering.
   * @returns A list of quotes.
   * */
  public async getQuotes(query?: Query): Promise<ClientResponse<Quote[]>> {
    return this.quoteService.getQuotes(query);
  }

  /**
   * Get a quote by id.
   * @param id The id of the quote.
   * @returns The quote with the given id.
   * */
  public async getQuoteById(id: string): Promise<ClientResponse<Quote>> {
    return this.quoteService.getQuoteById(id);
  }
}