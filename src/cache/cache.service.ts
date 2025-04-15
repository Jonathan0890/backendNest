import { Inject, Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager:Cache) {}

    async getCacheData(key: string) : Promise<any> {
        return await this.cacheManager.get(key);
    }

    async setCacheData(key: string, value: any, ttl = 10) : Promise<void> {
        await this.cacheManager.set(key, value,  ttl );
    }
}
