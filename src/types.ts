export type Issue <T> = {
  type: string;
  level: string; // "error" | "info"
  url: string | null;
  details: T;
};

export type Component = {
  componentUrl?: string;
  name?: string;
  source: string;
  target: string;
  onEvent?: string;
};

export type Schema = {
  styleguideUrl: string;
  breakpoints: number[];
  components: Component[];
  colorSources: string[];
};

export type Configuration = {
  styleguideUrl: string | null;
  breakpoints: number[];
  components: Component[];
  colorSources: string[];
  issues: Array<Issue<any>>;
};
