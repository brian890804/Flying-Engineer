/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// Provide minimal typings for Vite's import.meta.glob used in this repo
declare global {
  interface ImportMeta {
    // dynamic import map returning loaders
    glob(pattern: string): Record<string, () => Promise<any>>;
    // eager import map returning module objects
    globEager(pattern: string): Record<string, any>;
  }
}

export {};
