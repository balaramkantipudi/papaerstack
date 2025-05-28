interface CacheItem<T> {
    data: T
    timestamp: number
    expiry: number
  }
  
  export class CacheManager {
    private static instance: CacheManager
    private cache: Map<string, CacheItem<any>> = new Map()
    private defaultTTL = 5 * 60 * 1000 // 5 minutes
  
    static getInstance(): CacheManager {
      if (!CacheManager.instance) {
        CacheManager.instance = new CacheManager()
      }
      return CacheManager.instance
    }
  
    set<T>(key: string, data: T, ttl?: number): void {
      const expiry = Date.now() + (ttl || this.defaultTTL)
      this.cache.set(key, {
        data,
        timestamp: Date.now(),
        expiry
      })
    }
  
    get<T>(key: string): T | null {
      const item = this.cache.get(key)
      
      if (!item) {
        return null
      }
  
      if (Date.now() > item.expiry) {
        this.cache.delete(key)
        return null
      }
  
      return item.data
    }
  
    delete(key: string): void {
      this.cache.delete(key)
    }
  
    clear(): void {
      this.cache.clear()
    }
  
    // Cache dashboard metrics for better performance
    async getCachedDashboardMetrics(organizationId: string): Promise<any | null> {
      return this.get(`dashboard_metrics_${organizationId}`)
    }
  
    setCachedDashboardMetrics(organizationId: string, metrics: any): void {
      this.set(`dashboard_metrics_${organizationId}`, metrics, 2 * 60 * 1000) // 2 minutes
    }
  
    // Cache vendor list for better performance
    async getCachedVendors(organizationId: string): Promise<any[] | null> {
      return this.get(`vendors_${organizationId}`)
    }
  
    setCachedVendors(organizationId: string, vendors: any[]): void {
      this.set(`vendors_${organizationId}`, vendors, 10 * 60 * 1000) // 10 minutes
    }
  }