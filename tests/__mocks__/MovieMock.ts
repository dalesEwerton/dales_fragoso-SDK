import { Movie } from "../../src/types/Movie";
import { faker } from '@faker-js/faker';

export class MovieMock {
    public static generate(): Movie {
        return {
            _id: faker.string.uuid(),
            name: faker.lorem.words(3),
            runtimeInMinutes: faker.number.int(),
            budgetInMillions: faker.number.int(),
            boxOfficeRevenueInMillions: faker.number.int(),
            academyAwardNominations: faker.number.int(),
            academyAwardWins: faker.number.int(),
            rottenTomatoesScore: faker.number.int()
        };
    }
}
