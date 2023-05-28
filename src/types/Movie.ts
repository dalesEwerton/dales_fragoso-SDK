/**
 * Represents a movie.
 */
export interface Movie {
    /**
     * The unique identifier of the movie.
     */
    _id: string;
  
    /**
     * The name of the movie.
     */
    name: string;
  
    /**
     * The runtime of the movie in minutes.
     */
    runtimeInMinutes: number;
  
    /**
     * The budget of the movie in millions.
     */
    budgetInMillions: number;
  
    /**
     * The box office revenue of the movie in millions.
     */
    boxOfficeRevenueInMillions: number;
  
    /**
     * The number of Academy Award nominations received by the movie.
     */
    academyAwardNominations: number;
  
    /**
     * The number of Academy Awards won by the movie.
     */
    academyAwardWins: number;
  
    /**
     * The Rotten Tomatoes score of the movie.
     */
    rottenTomatoesScore: number;
  }
  