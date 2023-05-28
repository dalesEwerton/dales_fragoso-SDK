# Dales Fragoso Lord of the Rings SDK

This is an SDK for the LOTR API, providing convenient methods to interact with the API and retrieve data related to movies and quotes from The Lord of the Rings.

## Getting an API Key

To use the Dales Fragoso SDK Lotr, you need an API key from the Lotr API. Here's how you can obtain one:

1. Visit [https://the-one-api.dev/](https://the-one-api.dev/) in your web browser.
2. Click on the "Sign Up" button on the top right menu.
3. Sign up for an account if you don't have one. If you already have an account, log in.
4. Once you're logged in, you'll see your API key displayed on their homepage.
5. Copy the API key and use it when initializing the `LotrClient` in your code.

**Note:** The API key is a secret credential that grants access to the Lotr API on your behalf. Keep your API key secure and do not share it publicly.

For more information on the Lotr API and API key usage, refer to the [Lotr API Documentation](https://the-one-api.dev/documentation).

## Installation

Using npm:

```shell
npm install dales_fragoso-sdk-lotr
```

Using yarn:

```shell
yarn add dales_fragoso-sdk-lotr
```

Using pnpm:

```shell
pnpm add dales_fragoso-sdk-lotr
```

## Basic Usage

```typescript
import { LotrClient, Pagination } from 'dales_fragoso-sdk-lotr';

async function main() {
  const apiKey: string = 'your-api-key';
  const enableLogging: boolean = true;

  const client: LotrClient = new LotrClient(apiKey, enableLogging);

  try {
    // Example: Get all movies with pagination
    const pagination: Pagination = {
      limit: 10,
      page: 2
    };
    const moviesResponse = await client.getMovies(pagination);
    console.log(moviesResponse.data); // List of movies for the specified page

    // Example: Get a movie by ID
    const movieId: string = 'your-movie-id';
    const movieResponse = await client.getMovieById(movieId);
    console.log(movieResponse.data); // Movie with the given ID

    // Example: Get quotes from a movie with pagination
    const movieQuotesPagination: Pagination = {
      limit: 5,
      page: 1
    };
    const movieQuotesResponse = await client.getMovieQuotes(movieId, movieQuotesPagination);
    console.log(movieQuotesResponse.data); // List of quotes from the movie for the specified page

    // Example: Get all quotes with pagination
    const quotesPagination: Pagination = {
      limit: 20,
      page: 3
    };
    const quotesResponse = await client.getQuotes(quotesPagination);
    console.log(quotesResponse.data); // List of all quotes for the specified page

    // Example: Get a quote by ID
    const quoteId: string = 'your-quote-id';
    const quoteResponse = await client.getQuoteById(quoteId);
    console.log(quoteResponse.data); // Quote with the given ID
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

Replace `'your-api-key'`, `'your-movie-id'`, and `'your-quote-id'` with the actual values you need for your requests.

## Advanced Usage

You can use the `Pagination`, `Filter`, and `Sort` objects to filter, paginate, and sort data in your API requests. Here's an example of using the revised `LotrClient` with the separate parameters for pagination, filters, and sorting:

```typescript
import { LotrClient, Pagination, Filter, Sort } from 'dales_fragoso-sdk-lotr';

const client: LotrClient = new LotrClient(apiKey, enableLogging);

async function main() {
  try {
    // Example: Get all movies with pagination, filters, and sorting
    const pagination: Pagination = {
      limit: 10,
      page: 1
    };
    const filters: Filter[] = [
      {
        match: {
          attribute: 'name',
          operation: '=',
          value: 'Fellowship of the Ring'
        }
      },
      {
        comparator: {
          attribute: 'rottenTomatoesScore',
          value: 90,
          operation: '>'
        }
      }
    ];
    const sort: Sort = {
      attribute: 'name',
      order: 'asc'
    };

    const response = await client.getMovies(pagination, filters, sort);
    console.log(response.data); // List of movies matching the filters, sorted, and paginated
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
