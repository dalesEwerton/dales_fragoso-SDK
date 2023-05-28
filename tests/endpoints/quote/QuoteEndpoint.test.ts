import axios from 'axios';
import { QuoteEndpoint } from '../../../src/endpoints/quote/QuoteEndpoint';
import { QuoteMock } from '../../__mocks__/QuoteMock';

jest.mock('axios');

describe('QuoteEndpoint', () => {
  let quoteEndpoint: QuoteEndpoint;
  const fakeApiUrl = 'https://example.com/api';
  const fakeApiKey = 'fake-api-key';
  const headers = {
    Authorization: `Bearer ${fakeApiKey}`,
    'Content-Type': 'application/json',
  };

  beforeEach(() => {
    quoteEndpoint = new QuoteEndpoint(fakeApiUrl, fakeApiKey);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getQuotes', () => {
    it('should fetch quotes successfully', async () => {
      const mockedQuotes = [
        QuoteMock.generate(),
        QuoteMock.generate(),
        QuoteMock.generate(),
      ];

      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { docs: mockedQuotes } });

      const quotes = await quoteEndpoint.getQuotes();

      expect(quotes).toBeDefined();
      expect(quotes.docs).toBeDefined();
      expect(quotes.docs).toHaveLength(mockedQuotes.length);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${fakeApiUrl}/quote`, { headers });
    });

    it('should accept a query parameter', async () => {
      const mockedQuotes = [
        QuoteMock.generate(),
        QuoteMock.generate(),
      ];

      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { docs: mockedQuotes } });

      const query = '?movie=The Lord of the Rings: The Fellowship of the Ring';
      const quotes = await quoteEndpoint.getQuotes(query);

      expect(quotes).toBeDefined();
      expect(quotes.docs).toBeDefined();
      expect(quotes.docs).toHaveLength(mockedQuotes.length);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${fakeApiUrl}/quote${query}`, { headers });
    });
  });
});