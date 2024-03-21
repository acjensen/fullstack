import { randomUUID } from "crypto";

export interface Record {
  uuid: string;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
}

export const newRecord = (): Record => {
  return {
    uuid: randomUUID(),
    createdAt: Date.now(),
  };
};
