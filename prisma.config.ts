import path from 'node:path';
import type { PrismaConfig } from 'prisma';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  schema: path.join('prisma', 'schema'),
  migrations: { path: path.join('prisma', 'migrations') },
} satisfies PrismaConfig;
