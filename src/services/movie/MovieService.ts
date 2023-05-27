import { MovieEndpoint } from "../../endpoints/movie/MovieEndpoint";
import { Movie } from "../../types/Movie";
import { QueryParser } from "../../utils/QueryParser";
import { Logger } from "../../utils/Logger";
import { AxiosError } from "axios";
import { Query } from "../../types/Query";
import { Metadata } from "../../types/Metadata";
import { ClientResponse } from "../../types/ClientResponse";

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
      if (!this.enableLogging) throw error;
      
      if (error instanceof AxiosError)
      this.logger.error(`Failed to get movies: ${error.message}`);
      else this.logger.error(`Failed to get movies: ${error}`);

      throw error;
    }
  }
}