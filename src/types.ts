export type ThemeColorsConfiguration = {
  colorsUrl: string | null;
  sources: string;
  properties: string[];
} | null;

export type ThemeTypographyConfiguration = {
  typographyUrl: string | null;
  sources: string;
  properties: string[];
} | null;

export type ThemeIconsConfiguration = {
  iconsUrl: string | null;
  sources: string;
  isFont: boolean;
} | null;

export type ThemeConfiguration = {
  themeUrl: string | null;
  colors: ThemeColorsConfiguration;
  typography: ThemeTypographyConfiguration;
  icons: ThemeIconsConfiguration;
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
