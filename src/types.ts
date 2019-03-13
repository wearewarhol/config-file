export type ComponentConfiguration = {
  componentUrl: string | null;
  name: string | null;
  source: string;
  target: string;
};

export type Configuration = {
  styleguideUrl: string | null;
  breakpoints: number[];
  components: ComponentConfiguration[];
  theme: {
    colors: {
      sources: string;
      properties: string[];
    } | null;
  } | null;
};
