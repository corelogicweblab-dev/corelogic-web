import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

function getDataDir() {
  if (process.env.VERCEL) {
    return path.join("/tmp", "corelogic-data");
  }
  return path.join(process.cwd(), "data");
}

async function ensureDir(dir: string) {
  await mkdir(dir, { recursive: true });
}

export async function appendJsonRecord<T extends Record<string, unknown>>(
  filename: string,
  record: T
): Promise<void> {
  const dir = getDataDir();
  await ensureDir(dir);
  const filePath = path.join(dir, filename);
  let existing: T[] = [];
  try {
    const raw = await readFile(filePath, "utf-8");
    existing = JSON.parse(raw) as T[];
  } catch {
    existing = [];
  }
  existing.push({ ...record, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
  await writeFile(filePath, JSON.stringify(existing, null, 2), "utf-8");
}
