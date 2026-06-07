import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import type { PoolOptions } from "mysql2/promise";
import * as schema from "./schema";

let pool: mysql.Pool | null = null;

function safeDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/** Parse mysql://user:pass@host:port/db without brittle decodeURIComponent on the full URL. */
function parseMysqlConnectionString(url: string): PoolOptions {
  const trimmed = url.trim().replace(/^["']|["']$/g, "");
  const withoutScheme = trimmed.replace(/^mysql2?:\/\//i, "");
  const atIdx = withoutScheme.lastIndexOf("@");

  if (atIdx === -1) {
    throw new Error(
      "DATABASE_URL must look like mysql://user:password@host:3306/database"
    );
  }

  const creds = withoutScheme.slice(0, atIdx);
  const hostPart = withoutScheme.slice(atIdx + 1);
  const colonIdx = creds.indexOf(":");
  const user =
    colonIdx === -1
      ? safeDecodeURIComponent(creds)
      : safeDecodeURIComponent(creds.slice(0, colonIdx));
  const password =
    colonIdx === -1 ? "" : safeDecodeURIComponent(creds.slice(colonIdx + 1));

  const slashIdx = hostPart.indexOf("/");
  if (slashIdx === -1) {
    throw new Error("DATABASE_URL is missing database name after host");
  }

  const hostPort = hostPart.slice(0, slashIdx);
  const database = hostPart
    .slice(slashIdx + 1)
    .split("?")[0]
    .split("#")[0];
  const [host, portStr] = hostPort.split(":");

  return {
    host,
    port: portStr ? Number(portStr) : 3306,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
  };
}

function poolOptionsFromEnv(): PoolOptions {
  if (process.env.MYSQL_HOST?.trim()) {
    return {
      host: process.env.MYSQL_HOST.trim(),
      port: Number(process.env.MYSQL_PORT ?? 3306),
      user: process.env.MYSQL_USER?.trim() ?? "root",
      password: process.env.MYSQL_PASSWORD ?? "",
      database: process.env.MYSQL_DATABASE?.trim() ?? "storetrace",
      waitForConnections: true,
      connectionLimit: 10,
    };
  }

  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set (or set MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE)"
    );
  }

  return parseMysqlConnectionString(url);
}

function getPool() {
  if (!pool) {
    pool = mysql.createPool(poolOptionsFromEnv());
  }
  return pool;
}

export function getDb() {
  return drizzle(getPool(), { schema, mode: "default" });
}

export { schema };
