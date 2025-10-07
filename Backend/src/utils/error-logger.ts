import { promises as fs } from 'fs';
import * as path from 'path';

type PlainObject = Record<string, any>;

const LOG_DIR = path.resolve(process.cwd(), 'logs');

function ensureString(value: any): string {
  try {
    return typeof value === 'string' ? value : JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function redact(
  obj: any,
  keysToRedact: string[] = [
    'password',
    'pwd',
    'pass',
    'authorization',
    'cookie',
    'token',
    'access_token',
    'refresh_token',
  ],
): any {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map((v) => redact(v, keysToRedact));
  const out: PlainObject = {};
  for (const [k, v] of Object.entries(obj)) {
    if (keysToRedact.includes(k.toLowerCase())) {
      out[k] = '[REDACTED]';
    } else if (typeof v === 'object' && v !== null) {
      out[k] = redact(v, keysToRedact);
    } else {
      out[k] = v;
    }
  }
  return out;
}

export interface ErrorLogEntry {
  timestamp: string;
  level: 'error' | 'fatal';
  name?: string;
  message: string;
  stack?: string;
  state?: PlainObject;
  request?: {
    id?: string;
    method?: string;
    url?: string;
    ip?: string;
    headers?: PlainObject;
    params?: PlainObject;
    query?: PlainObject;
    body?: PlainObject;
    user?: PlainObject;
  };
  response?: {
    statusCode?: number;
    body?: any;
  };
}

export async function writeErrorLog(entry: ErrorLogEntry): Promise<void> {
  const date = new Date();
  const day = date.toISOString().slice(0, 10); // YYYY-MM-DD
  const logFile = path.join(LOG_DIR, `errors-${day}.log`);
  const line = ensureString({
    ...entry,
    // Guard against circulars by redacting/serializing shallowly
    request: entry.request ? redact(entry.request) : undefined,
    response: entry.response ? redact(entry.response) : undefined,
  });
  try {
    await fs.mkdir(LOG_DIR, { recursive: true });
    await fs.appendFile(logFile, line + '\n', { encoding: 'utf8' });
  } catch (err) {
    // As a last resort, print to console if file write fails
    // eslint-disable-next-line no-console
    console.error('[ErrorLogger] Failed to write log file:', err);
    // eslint-disable-next-line no-console
    console.error('[ErrorLogger] Original log entry:', line);
  }
}

export function buildProcessState(): PlainObject {
  return {
    pid: process.pid,
    platform: process.platform,
    node: process.version,
    uptimeSec: Math.round(process.uptime()),
    memory: process.memoryUsage(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      // add minimal env only; avoid dumping secrets
      APP_ENV: process.env.APP_ENV,
    },
  };
}
