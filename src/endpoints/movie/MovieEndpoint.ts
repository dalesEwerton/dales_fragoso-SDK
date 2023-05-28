import axios, { AxiosRequestConfig } from 'axios';
import { Movie } from '../../types/Movie';
import { Quote } from '../../types/Quote';
import { ApiResponse } from '../../types/ApiResponse';

export class MovieEndpoint {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private getConfig(): AxiosRequestConfig {
    return {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    };
  }

  public async getMovies(query?: string): Promise<ApiResponse<Movie[]>> {
    const url = `${this.baseUrl}/movie${query ? `${query}` : ''}`;
    const config = this.getConfig();
    const response = await axios.get(url, config);

    return response.data;
  }

  public async getMovieById(id: string): Promise<ApiResponse<Movie[]>> {
    const url = `${this.baseUrl}/movie/${id}`;
    const config = this.getConfig();
    const response = await axios.get(url, config);

    return response.data;
  }

  public async getMovieQuotes(id: string, query?: string): Promise<ApiResponse<Quote[]>> {
    const url = `${this.baseUrl}/movie/${id}/quote${query ? `${query}` : ''}`;
    const config = this.getConfig();
    const response = await axios.get(url, config);

    return response.data;
  }
}
