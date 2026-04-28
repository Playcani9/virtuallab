/**
 * Simple In-Memory Caching Layer
 * Provides an efficient way to store and retrieve expensive calculation results.
 */

class CacheService {
  private cache: Map<string, { value: any; expiry: number }> = new Map();
  private readonly defaultTTL = 1000 * 60 * 10; // 10 minutes

  /**
   * Set a value in the cache with a specific key and optional TTL
   */
  set(key: string, value: any, ttl: number = this.defaultTTL): void {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { value, expiry });
    
    // Auto-cleanup if cache grows too large (simple LRU-ish behavior)
    if (this.cache.size > 500) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }
  }

  /**
   * Get a value from the cache. Returns null if expired or missing.
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    if (entry.expiry < Date.now()) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.value as T;
  }

  /**
   * Clear the entire cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Generate a stable cache key for mathematical operations
   */
  generateKey(operation: string, data: any): string {
    return `${operation}:${JSON.stringify(data)}`;
  }
}

export const cacheService = new CacheService();
