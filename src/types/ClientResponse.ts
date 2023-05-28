import { Metadata } from './Metadata';

export interface ClientResponse<T> {
  data: T;
  meta?: Metadata;
}