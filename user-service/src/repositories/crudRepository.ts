// src/repositories/CrudRepository.ts
import { Model } from "mongoose";

export class CrudRepository<T> {
  constructor(private model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    const doc = await this.model.create(data);
    return doc as T;
  }

  async findOne(data: Partial<T>): Promise<T>{
    const doc = await this.model.findOne(data);
    return doc as T;
  }

  async get(id: string): Promise<T> {
    const doc = await this.model.findById(id).select("-password");
    if (!doc) {
      throw new Error("Not able to find the resource");
    }
    return doc as T;
  }

  async getAll(): Promise<T[]> {
    const docs = await this.model.find();
    return docs as T[];
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const doc = await this.model.findByIdAndUpdate(id, data, { new: true });
    if (!doc) {
      throw new Error("Not able to find the resource");
    }
    return doc as T;
  }

  async destroy(id: string): Promise<T> {
    const doc = await this.model.findByIdAndDelete(id);
    if (!doc) {
      throw new Error("Not able to find the resource");
    }
    return doc as T;
  }
}