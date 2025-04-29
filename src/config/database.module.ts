import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [databaseConfig],
            isGlobal: true
        }),

        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('database.mysql.host'),
                port: configService.get<number>('database.mysql.port'),
                password: configService.get<string>('database.mysql.password'),
                database: configService.get<string>('database.mysql.database'),
                username: configService.get<string>('database.mysql.username'),
                entities: [__dirname + '/../**/*.entity.{ts,js}'],
                synchronize: true,
                name: 'mysqlConnection',
            }),
        }),

        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('database.postgres.host'),
                port: configService.get<number>('database.postgres.port'),
                password: configService.get<string>('database.postgres.password'),
                database: configService.get<string>('database.postgres.database'),
                username: configService.get<string>('database.postgres.username'),
                entities: [__dirname + '/../**/*.entity.{ts,js}'],
                synchronize: true,
                name: 'postgresConnection',
            }),
        }),

        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('database.mongo.uri'),
                //connectionName: 'mongodbConnection',
            }),
        }),
    ],
})
export class DatabaseModule { }
