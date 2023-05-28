import axios, { AxiosRequestConfig } from 'axios';
import { Quote } from '../../types/Quote';
import { ApiResponse } from '../../types/ApiResponse';

export class QuoteEndpoint {
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

  public async getQuotes(query?: string): Promise<ApiResponse<Quote[]>> {
    const url = `${this.baseUrl}/quote${query ? `${query}` : ''}`;
    const config = this.getConfig();
    const response = await axios.get(url, config);

    return response.data;
  }

  public async getQuoteById(id: string): Promise<ApiResponse<Quote[]>> {
    const url = `${this.baseUrl}/quote/${id}`;
    const config = this.getConfig();
    const response = await axios.get(url, config);

    return response.data;
  }
}