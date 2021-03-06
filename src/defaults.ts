// This module provides functions to fill up partial configuration objects with
// sensible defaults. This is a messy cascading mechanism that will never be
// beautiful and that will only ever grow larger.

import { Optional } from "@warhol/utilities";
import {
  Configuration,
  ComponentConfiguration,
  ThemeConfiguration,
  ThemeColorsConfiguration,
  ThemeTypographyConfiguration,
  ThemeIconsConfiguration,
  UtilsConfiguration,
  Util,
  CookieConfiguration,
} from "./types";

// Each of the sub properties of theme configuration is optional, nullable and
// its URL and (properties if applicable) are optional with the url being
// cascaded from the rest of the config and the properties defaulting to some
// built-in value
type MinimalColorsConfig =
  | Optional<NonNullable<ThemeColorsConfiguration>, "colorsUrl" | "properties">
  | null
  | undefined;
type MinimalTypographyConfig =
  | Optional<NonNullable<ThemeTypographyConfiguration>, "typographyUrl" | "properties"> // eslint-disable-line
  | null
  | undefined;
type MinimalIconsConfig =
  | Optional<NonNullable<ThemeIconsConfiguration>, "iconsUrl">
  | null
  | undefined;

const colorsWithDefaults = (
  input: MinimalColorsConfig,
  themeUrl: string | null
): ThemeColorsConfiguration => {
  if (!input || !input.sources) {
    return null;
  } else {
    const properties =
      input.properties && input.properties.length > 0
        ? input.properties
        : ["background-color"];
    return {
      colorsUrl: input.colorsUrl || themeUrl,
      sources: input.sources,
      properties,
    };
  }
};

const typographyWithDefaults = (
  input: MinimalTypographyConfig,
  themeUrl: string | null
): ThemeTypographyConfiguration => {
  if (!input || !input.sources) {
    return null;
  } else {
    const properties =
      input.properties && input.properties.length > 0
        ? input.properties
        : ["font-family", "font-size", "font-weight", "font-style"];
    return {
      typographyUrl: input.typographyUrl || themeUrl,
      sources: input.sources,
      properties,
    };
  }
};

const iconsWithDefaults = (
  input: MinimalIconsConfig,
  themeUrl: string | null
): ThemeIconsConfiguration => {
  if (!input || !input.sources || input.sources.length === 0) {
    return null;
  } else {
    return {
      iconsUrl: input.iconsUrl || themeUrl,
      sources: input.sources,
      type: "font",
    };
  }
};

// Everything about a theme is optional and nullable
type ThemeConfig = {
  themeUrl?: string | null;
  colors?: MinimalColorsConfig;
  typography?: MinimalTypographyConfig;
  icons?: MinimalIconsConfig;
};
type MinimalThemeConfig = ThemeConfig | null | undefined;

const themeWithDefaults = (
  inputTheme: MinimalThemeConfig,
  patternLibUrl: string | null
): ThemeConfiguration => {
  if (!inputTheme) {
    return null;
  } else {
    const themeUrl = inputTheme
      ? inputTheme.themeUrl || patternLibUrl || null
      : patternLibUrl || null;
    const colors = colorsWithDefaults(inputTheme.colors, themeUrl);
    const typography = typographyWithDefaults(inputTheme.typography, themeUrl);
    const icons = iconsWithDefaults(inputTheme.icons, themeUrl);
    return { themeUrl, colors, typography, icons };
  }
};

// Everything about utils is optional and nullable
type MinimalUtil = Optional<Util, "name" | "components">;
type MinimalUtilsConfig =
  | { utilsUrl?: string | null; sources: MinimalUtil[] }
  | null
  | undefined;

const utilsWithDefaults = (
  inputUtils: MinimalUtilsConfig,
  patternLibUrl: string | null
): UtilsConfiguration => {
  if (!inputUtils) {
    return null;
  } else {
    const utilsUrl = inputUtils
      ? inputUtils.utilsUrl || patternLibUrl || null
      : patternLibUrl || null;
    const sources = inputUtils.sources.map((definition) => {
      const { type, selector, components = [], name = selector } = definition;
      return { type, selector, name, components };
    });
    return { utilsUrl, sources };
  }
};

// Only the component's source selector is mandatory
type OptionalComponentFields = "componentUrl" | "name" | "target";
type MinimalComponentConfig = Optional<
  ComponentConfiguration, // eslint-disable-line
  OptionalComponentFields // eslint-disable-line
>;

export const withDefaults = (input: {
  patternLibUrl?: string | null;
  patternLibHeaders?: Record<string, string> | null;
  patternLibCookies?: CookieConfiguration[] | null;
  breakpoints?: number[] | null;
  theme?: MinimalThemeConfig;
  utils?: MinimalUtilsConfig;
  components?: MinimalComponentConfig[] | null;
}): Configuration => {
  const patternLibUrl = input.patternLibUrl || null;
  const components = input.components || [];
  return {
    patternLibUrl,
    patternLibHeaders: input.patternLibHeaders || {},
    patternLibCookies: input.patternLibCookies || [],
    breakpoints: input.breakpoints || [1000],
    theme: themeWithDefaults(input.theme, patternLibUrl),
    utils: utilsWithDefaults(input.utils, patternLibUrl),
    components: components.flatMap((component) => {
      if (component) {
        return [
          {
            componentUrl: component.componentUrl || patternLibUrl || null,
            source: component.source,
            name: component.name || component.source,
            target: component.target || component.source,
          },
        ];
      }
      return [];
    }),
  };
};
