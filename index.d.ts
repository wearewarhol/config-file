// Type definitions for @warhol/config-file
// Project: Warhol Config File

declare module "@warhol/config-file" {
  export type SelectorComponentMap = Array<[ HTMLElement | string, string ]>;

  export type Issue <T> = {
    type: string;
    level: string; // "error" | "info"
    url: string | null;
    details: T;
  };


  export type Schema = {
    url: string;
    breakpoints: number[];
    components: Array<{ sourceSelector: string, targetSelector: string }>;
  };


  export type Configuration = {
    url: string;
    breakpoints: number[];
    components: SelectorComponentMap[];
    issues: Array<Issue<any>>;
  };

  export function configFromFile(path: string): Promise<Configuration>;
}
