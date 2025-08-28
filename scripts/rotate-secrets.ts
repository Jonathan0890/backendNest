import * as fs from 'fs';
import * as crypto from 'crypto';

const envPath = '.env';
const envContent = fs.readFileSync(envPath, 'utf-8');

const newSecret = crypto.randomBytes(32).toString('hex');
const updated = envContent.replace(/JWT_SECRET=.*/g, `JWT_SECRET=${newSecret}`);

fs.writeFileSync(envPath, updated);
console.log('✅ JWT_SECRET actualizado');
