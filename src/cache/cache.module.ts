import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        CacheModule.registerAsync({
            useFactory: () => ({
                ttl: 10,
                max: 100
            }),
        })
    ],
    providers: [CacheService],
    exports: [CacheService],
})
export class CacheCustomModule {}
