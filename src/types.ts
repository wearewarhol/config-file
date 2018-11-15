export type SelectorComponentMap = Array<[ HTMLElement | string, string ]>;

export type Issue <T> = {
  type: string;
  level: string; // "error" | "info"
  url: string | null;
  details: T;
};

export type Component = {
  componentUrl?: string;
  source: string;
  target: string;
};

export type Schema = {
  styleguideUrl: string;
  breakpoints: number[];
  components: Component[];
};

export type Configuration = {
  styleguideUrl: string | null;
  breakpoints: number[];
  components: SelectorComponentMap;
  issues: Array<Issue<any>>;
};
