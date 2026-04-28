/**
 * Sharding-Ready Data Repository
 * Abstracting data access allows us to "shard" requests to different backends
 * or handle vertical partitioning as the platform scales.
 */

import { supabase } from '../lib/supabase';

export interface Entity {
  id?: string;
  created_at?: string;
}

export class DataRepository<T extends Entity> {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  /**
   * Fetch data with implicit sharding logic
   * (In a real sharded environment, here we would decide WHICH DB node to query)
   */
  async getAll(limit = 100): Promise<T[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .limit(limit)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as T[];
  }

  async getById(id: string): Promise<T | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as T;
  }

  async create(item: T): Promise<T> {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert([item])
      .select()
      .single();

    if (error) throw error;
    return data as T;
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const { data, error } = await supabase
      .from(this.tableName)
      .update(updates as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as T;
  }
}

// Example "Shards" for different platform features
export const simulationRepo = new DataRepository('simulations');
export const userProfileRepo = new DataRepository('profiles');
export const quizRepo = new DataRepository('quiz_attempts');
