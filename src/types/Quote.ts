/**
 * Represents a quote from a movie.
 */
export interface Quote {
    /**
     * The unique identifier of the quote.
     */
    _id: string;
  
    /**
     * The dialog or text of the quote.
     */
    dialog: string;
  
    /**
     * The movie associated with the quote.
     */
    movie: string;
  
    /**
     * The character who said the quote.
     */
    character: string;
  }
  