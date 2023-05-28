import { QuoteEndpoint } from "../../endpoints/quote/QuoteEndpoint";
import { Quote } from "../../types/Quote";
import { QueryParser } from "../../utils/QueryParser";
import { Logger } from "../../utils/Logger";
import { AxiosError } from "axios";
import { Query } from "../../types/Query";
import { ClientResponse } from "../../types/ClientResponse";

export class QuoteService {
  private quoteEndpoint: QuoteEndpoint;
  private logger: Logger;
  private enableLogging: boolean;

  constructor(baseUrl: string, ApiKey: string, enableLogging: boolean) {
    this.quoteEndpoint = new QuoteEndpoint(baseUrl, ApiKey);
    this.logger = new Logger("QuoteService");
    this.enableLogging = enableLogging;
  }

  public async getQuotes(query?: Query): Promise<ClientResponse<Quote[]>> {
    try {
      const parsedQuery = query? QueryParser.parse(query): '';
      const { docs, ...meta } = await this.quoteEndpoint.getQuotes(parsedQuery);
      return {
        data: docs,
        meta
      }
    } catch (error) {
      if (!this.enableLogging) {
        throw error;
      }
      
      if (error instanceof AxiosError) {
        this.logger.error(`Failed to get quotes. ${error.message}`);
      }
      else {
        this.logger.error(`Error on getting quotes. ${error}`);
      }

      throw error;
    }
  }

  public async getQuoteById(id: string): Promise<ClientResponse<Quote>> {
    try {
      const { docs } = await this.quoteEndpoint.getQuoteById(id);

      if (!docs.length) {
        throw new Error(`Quote with id ${id} not found`);
      }

      return {
        data: docs[0] as Quote,
      }
    } catch (error) {
      if (!this.enableLogging) {
        throw error;
      }

      if (error instanceof AxiosError) {
        this.logger.error(`Failed to get quote. ${error.message}`);
      }
      else {
        this.logger.error(`Error on getting quote. ${error}`);
      }

      throw error;
    }
  }
}