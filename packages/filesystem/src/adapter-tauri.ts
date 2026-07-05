import type { BaseDirectory, FileEntry, FsDirOptions } from "@tauri-apps/api/fs";
import type * as TauriFS from "@tauri-apps/api/fs";
import type { AsyncFileSystemAdapter } from "./types.ts";

export const makeTauriFileSystem = (options: FsDirOptions = { dir: 22 as BaseDirectory.AppData }): AsyncFileSystemAdapter | null =>
  (taurifs =>
    taurifs
      ? {
          async: true as const,
          getType: (path: string) =>
            taurifs.exists(path, options).then((present: boolean) =>
              present
                ? taurifs
                    .readDir(path)
                    .then(() => "dir" as const)
                    .catch(() => "file" as const)
                : null,
            ),
          mkdir: (path: string) => taurifs.createDir(path, { ...options, recursive: true }),
          readdir: (path: string) =>
            taurifs.readDir(path, options).then((entries: FileEntry[]) =>
              entries.reduce((list, entry) => {
                entry.name && list.push(entry.name);
                return list;
              }, [] as string[]),
            ),
          readFile: (path: string) => taurifs.readTextFile(path, options),
          rename: (previous: string, next: string) => taurifs.renameFile(previous, next),
          rm: (path: string) =>
            taurifs
              .readDir(path)
              .then(() => taurifs.removeDir(path, { ...options, recursive: true }))
              .catch(() => taurifs.removeFile(path, options)),
          writeFile: (path: string, data: string) => taurifs.writeTextFile(path, data),
        }
      : null)((globalThis as any).__TAURI__?.fs as typeof TauriFS);
