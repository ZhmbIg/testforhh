import { google } from 'googleapis';
import * as path from 'path';
import * as fs from 'fs';
import { JWT } from 'google-auth-library';
import dotenv from 'dotenv'

dotenv.config();
const SERVICE_ACCOUNT_KEY_FILE = path.resolve(process.env.SERVICE_ACCOUNT_KEY_FILE_PATH!);


export async function getAuthClient() {
  const credentials = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_KEY_FILE, 'utf8'));

  const auth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  await auth.authorize();
  return auth;
}
