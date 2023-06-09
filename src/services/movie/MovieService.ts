import { MovieEndpoint } from "../../endpoints/movie/MovieEndpoint";
import { Movie } from "../../types/Movie";
import { QueryParser } from "../../utils/QueryParser";
import { Logger } from "../../utils/Logger";
import { AxiosError } from "axios";
import { Query } from "../../types/Query";
import { ClientResponse } from "../../types/ClientResponse";
import { Quote } from "../../types/Quote";

export class MovieService {
  private movieEndpoint: MovieEndpoint;
  private logger: Logger;
  private enableLogging: boolean;

  constructor(baseUrl: string, ApiKey: string, enableLogging: boolean) {
    this.movieEndpoint = new MovieEndpoint(baseUrl, ApiKey);
    this.logger = new Logger("MovieService");
    this.enableLogging = enableLogging;
  }

  public async getMovies(query?: Query): Promise<ClientResponse<Movie[]>> {
    try {
      const parsedQuery = query? QueryParser.parse(query): '';
      const { docs, ...meta } = await this.movieEndpoint.getMovies(parsedQuery);
      return {
        data: docs,
        meta
      }
    } catch (error) {
      if (!this.enableLogging) {
        throw error;
      }
      
      if (error instanceof AxiosError) {
        this.logger.error(`Failed to get movies. ${error.message}`);
      }
      else {
        this.logger.error(`Error on getting movies. ${error}`);
      }

      throw error;
    }
  }

  public async getMovieById(id: string): Promise<ClientResponse<Movie>> {
    try {
      const { docs } = await this.movieEndpoint.getMovieById(id);
      
      if (!docs.length) {
        throw new Error(`Movie with id ${id} not found`);
      }

      return {
        data: docs[0] as Movie,
      }
    } catch (error) {
      if (!this.enableLogging) {
        throw error;
      }
      
      if (error instanceof AxiosError) {
        this.logger.error(`Failed to get movie by id. ${error.message}`);
      }
      else {
        this.logger.error(`Error on getting movie by id. ${error}`);
      }

      throw error;
    }
  }

  public async getMovieQuotes(id: string, query?: Query): Promise<ClientResponse<Quote[]>> {
    try {
      const parsedQuery = query? QueryParser.parse(query): '';
      const { docs, ...meta } = await this.movieEndpoint.getMovieQuotes(id, parsedQuery);
      return {
        data: docs,
        meta
      }
    } catch (error) {
      if (!this.enableLogging) {
        throw error;
      }
      
      if (error instanceof AxiosError) {
        this.logger.error(`Failed to get movie quotes. ${error.message}`);
      }
      else {
        this.logger.error(`Error on getting movie quotes. ${error}`);
      }

      throw error;
    }
  }
}