import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'production', 'test'],
    default: 'development',
  }),

  JWT_SECRET: str({ default: '' }),

  DATABASE_URL: str({ default: '' }),

  FIREBASE_API_KEY: str({ default: '' }),
  FIREBASE_AUTH_DOMAIN: str({ default: '' }),
  FIREBASE_PROJECT_ID: str({ default: '' }),
  FIREBASE_STORAGE_BUCKET: str({ default: '' }),
  FIREBASE_MESSAGING_SENDER_ID: str({ default: '' }),
  FIREBASE_APP_ID: str({ default: '' }),
  FIREBASE_MEASUREMENT_ID: str({ default: '' }),
});

export default env;
