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
  type: "font";
} | null;

export type ThemeConfiguration = {
  themeUrl: string | null;
  colors: ThemeColorsConfiguration;
  typography: ThemeTypographyConfiguration;
  icons: ThemeIconsConfiguration;
} | null;

export type ComponentConfiguration = {
  componentUrl: string | null;
  name: string;
  source: string;
  target: string;
};

export type Util = {
  readonly type: "rule" | "element";
  selector: string;
  name: string | null;
  components: string[];
};

export type UtilsConfiguration = {
  utilsUrl: string | null;
  sources: Util[];
} | null;

export type Configuration = {
  patternLibUrl: string | null;
  breakpoints: number[];
  components: ComponentConfiguration[];
  theme: ThemeConfiguration;
  utils: UtilsConfiguration;
};
