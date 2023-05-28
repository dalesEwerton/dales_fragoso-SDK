import { QuoteService } from "../../../src/services/quote/QuoteService";
import { QuoteEndpoint } from "../../../src/endpoints/quote/QuoteEndpoint";
import { QuoteMock } from "../../__mocks__/QuoteMock";
import { Logger } from "../../../src/utils/Logger";
import { ApiResponseMock } from "../../__mocks__/ApiResponseMock";
import { Quote } from "../../../src/types/Quote";
import { Filter } from "../../../src/types/Filter";

jest.mock("../../../src/endpoints/quote/QuoteEndpoint");
jest.mock("../../../src/utils/Logger");

describe("QuoteService", () => {
  const baseUrl = "https://example.com/api";
  const apiKey = "fake-api-key";
  const enableLogging = true;

  let quoteService: QuoteService;
  let quoteEndpointMock: jest.Mocked<QuoteEndpoint>;
  let loggerMock: jest.Mocked<Logger>;

  beforeEach(() => {
    quoteEndpointMock = new QuoteEndpoint(baseUrl, apiKey) as jest.Mocked<
      QuoteEndpoint
    >;
    loggerMock = new Logger("") as jest.Mocked<Logger>;
    quoteService = new QuoteService(baseUrl, apiKey, enableLogging);
    (quoteService as any).quoteEndpoint = quoteEndpointMock;
    (quoteService as any).logger = loggerMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getQuotes", () => {
    it('should fetch quotes successfully', async () => {
      const mockQuotes = [
        QuoteMock.generate(),
        QuoteMock.generate(),
      ];
      const response = ApiResponseMock.generate<Quote[]>(mockQuotes);

      quoteEndpointMock.getQuotes.mockResolvedValueOnce(response);

      const quotes = await quoteService.getQuotes();

      expect(quotes.data).toEqual(mockQuotes);
      expect(quoteEndpointMock.getQuotes).toHaveBeenCalledTimes(1);
      expect(loggerMock.error).not.toHaveBeenCalled();
    });

    it('should accept query parameters', async () => {
      const mockQuotes = [
        QuoteMock.generate(),
        QuoteMock.generate(),
      ];
      const response = ApiResponseMock.generate<Quote[]>(mockQuotes);
      const query = {
        filters: [
          {
            match: {
              attribute: 'movie',
              value: 'The Lord of the Rings: The Fellowship of the Ring',
              operation: '='
            }
          } as Filter
        ]
      }
      const parsedQuery = "?movie=The Lord of the Rings: The Fellowship of the Ring";

      quoteEndpointMock.getQuotes.mockResolvedValueOnce(response);

      const quotes = await quoteService.getQuotes(query);

      expect(quotes.data).toEqual(mockQuotes);
      expect(quoteEndpointMock.getQuotes).toHaveBeenCalledTimes(1);
      expect(quoteEndpointMock.getQuotes).toHaveBeenCalledWith(parsedQuery);
      expect(loggerMock.error).not.toHaveBeenCalled();
    });

    it('should throw error when failed to fetch quotes', async () => {
      const error = new Error('Failed to fetch quotes');
      quoteEndpointMock.getQuotes.mockRejectedValueOnce(error);

      await expect(quoteService.getQuotes()).rejects.toThrow(error);
      expect(quoteEndpointMock.getQuotes).toHaveBeenCalledTimes(1);
      expect(loggerMock.error).toHaveBeenCalledTimes(1);
    });

    it('should log error when failed to fetch quotes', async () => {
      const error = new Error('Failed to fetch quotes');
      quoteEndpointMock.getQuotes.mockRejectedValueOnce(error);

      await expect(quoteService.getQuotes()).rejects.toThrow(error);
      expect(quoteEndpointMock.getQuotes).toHaveBeenCalledTimes(1);
      expect(loggerMock.error).toHaveBeenCalledTimes(1);
    });
  });

  describe("getQuoteById", () => {
    it('should fetch quote successfully', async () => {
      const mockQuote = QuoteMock.generate();
      const response = ApiResponseMock.generate<Quote[]>([mockQuote]);

      quoteEndpointMock.getQuoteById.mockResolvedValueOnce(response);

      const quote = await quoteService.getQuoteById(mockQuote._id);

      expect(quote.data).toEqual(mockQuote);
      expect(quoteEndpointMock.getQuoteById).toHaveBeenCalledTimes(1);
      expect(loggerMock.error).not.toHaveBeenCalled();
    });

    it('should throw error when failed to fetch quote', async () => {
      const error = new Error('Failed to fetch quote');
      quoteEndpointMock.getQuoteById.mockRejectedValueOnce(error);

      await expect(quoteService.getQuoteById('fake-id')).rejects.toThrow(error);
      expect(quoteEndpointMock.getQuoteById).toHaveBeenCalledTimes(1);
      expect(loggerMock.error).toHaveBeenCalledTimes(1);
    });

    it('should throw error when quote is not found', async () => {
      const response = ApiResponseMock.generate<Quote[]>([]);

      quoteEndpointMock.getQuoteById.mockResolvedValueOnce(response);

      await expect(quoteService.getQuoteById('fake-id')).rejects.toThrow('Quote with id fake-id not found');
      expect(quoteEndpointMock.getQuoteById).toHaveBeenCalledTimes(1);
      expect(loggerMock.error).toHaveBeenCalled();
    });
  });
});