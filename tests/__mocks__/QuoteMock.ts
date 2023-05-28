import { Quote } from '../../src/types/Quote';
import { faker } from '@faker-js/faker';

export class QuoteMock {
    public static generate(): Quote {
        return {
            _id: faker.string.uuid(),
            dialog: faker.lorem.sentence(),
            movie: faker.string.uuid(),
            character: faker.person.fullName(),
        };
    }
}
