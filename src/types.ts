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
  name: string;
  components: string[];
};

export type UtilsConfiguration = {
  utilsUrl: string | null;
  sources: Util[];
} | null;

export type Cookie = {
  name: string;
  value: string;
  path?: string;
  domain?: string;
  expires?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "Lax" | "Strict";
};

export type Configuration = {
  patternLibUrl: string | null;
  patternLibHeaders: Record<string, string>;
  patternLibCookies: Cookie[];
  breakpoints: number[];
  components: ComponentConfiguration[];
  theme: ThemeConfiguration;
  utils: UtilsConfiguration;
};
