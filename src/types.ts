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
};

export type Schema = {
  styleguideUrl: string;
  breakpoints: number[];
  components: Component[];
};

export type Configuration = {
  styleguideUrl: string | null;
  breakpoints: number[];
  components: Component[];
  issues: Array<Issue<any>>;
};
