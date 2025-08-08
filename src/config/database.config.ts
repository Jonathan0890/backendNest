import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        port: parseInt(process.env.MYSQL_PORT || '3306', 10),
        username: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || '',
    },
    /*postgres: {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
        username: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || '1834',
        database: process.env.POSTGRES_DATABASE || 'mibasededatos',
    },
    mongo: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/testdb',
    },*/
}));
