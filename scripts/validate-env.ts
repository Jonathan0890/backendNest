import * as dotenv from 'dotenv';
dotenv.config();

const required = ['DB_HOST', 'DB_PORT', 'JWT_SECRET'];
const missing = required.filter(key => !process.env[key]);

if (missing.length) {
    console.error(`❌ Faltan variables en .env: ${missing.join(', ')}`);
    process.exit(1);
} else {
    console.log('✅ .env validado correctamente');
}
