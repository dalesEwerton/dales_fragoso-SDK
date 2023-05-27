import axios, { AxiosRequestConfig } from 'axios';
import { Movie } from '../../types/Movie';
import { ApiResponse } from '../../types/ApiResponse';

export class MovieEndpoint {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly headers: Record<string, string>;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  public async getMovies(query?: string): Promise<ApiResponse<Movie[]>> {
    const url = `${this.baseUrl}/movie${query ? `${query}` : ''}`;
    const config: AxiosRequestConfig = {
      headers: this.headers,
    };
    const response = await axios.get(url, config);

    return response.data;
  }
}
