import { ApiResponse } from '../../src/types/ApiResponse';
import { faker } from '@faker-js/faker'

export class ApiResponseMock {
    public static generate<T>(docs: T): ApiResponse<T> {
        return {
            docs: docs,
            total: faker.number.int(),
            limit: faker.number.int(),
            page: faker.number.int(),
            pages: faker.number.int()
        };
    }
}
