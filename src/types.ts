export type ThemeColorsConfiguration = {
  colorsUrl: string | null;
  sources: string;
  properties: string[];
} | null;

export type ThemeConfiguration = {
  themeUrl: string | null;
  colors: ThemeColorsConfiguration;
} | null;

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
  theme: ThemeConfiguration;
};
