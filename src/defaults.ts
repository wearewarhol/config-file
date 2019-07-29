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
} from "./types";

// Each of the sub properties of theme configuration is optional, nullable and
// its URL and (properties if applicable) are optional with the url being
// cascaded from the rest of the config and the properties defaulting to some
// built-in value
type MinimalColorsConfig =
  Optional<NonNullable<ThemeColorsConfiguration>, "colorsUrl" | "properties">
    | null
    | undefined;
type MinimalTypographyConfig =
  Optional<NonNullable<ThemeTypographyConfiguration>, "typographyUrl" | "properties">
    | null
    | undefined;
type MinimalIconsConfig =
  Optional<NonNullable<ThemeIconsConfiguration>, "iconsUrl">
    | null
    | undefined;

const colorsWithDefaults = (
  input: MinimalColorsConfig,
  themeUrl: string | null,
): ThemeColorsConfiguration => {
  if (!input || !input.sources) {
    return null;
  } else {
    const properties =
      (input.properties && input.properties.length > 0)
        ? input.properties
        : [ "background-color" ];
    return {
      colorsUrl: input.colorsUrl || themeUrl,
      sources: input.sources,
      properties,
    };
  }
};

const typographyWithDefaults = (
  input: MinimalTypographyConfig,
  themeUrl: string | null,
): ThemeTypographyConfiguration => {
  if (!input || !input.sources) {
    return null;
  } else {
    const properties =
      (input.properties && input.properties.length > 0)
        ? input.properties
        : [ "font-family", "font-size", "font-weight", "font-style" ];
    return {
      typographyUrl: input.typographyUrl || themeUrl,
      sources: input.sources,
      properties,
    };
  }
};

const iconsWithDefaults = (
  input: MinimalIconsConfig,
  themeUrl: string | null,
): ThemeIconsConfiguration => {
  if (!input || !input.sources || input.sources.length === 0) {
    return null;
  } else {
    return {
      iconsUrl: input.iconsUrl || themeUrl,
      sources: input.sources,
      isFont: input.isFont,
    };
  }
};

// Everything about a theme is optional and nullable
type MinimalThemeConfig = {
  themeUrl?: string | null;
  colors?: MinimalColorsConfig;
  typography?: MinimalTypographyConfig;
  icons?: MinimalIconsConfig;
} | null | undefined;

const themeWithDefaults = (
  inputTheme: MinimalThemeConfig,
  patternLibUrl: string | null,
): ThemeConfiguration => {
  if (!inputTheme) {
    return null;
  } else {
    const themeUrl = (inputTheme)
      ? inputTheme.themeUrl || patternLibUrl || null
      : patternLibUrl || null;
    const colors = colorsWithDefaults(inputTheme.colors, themeUrl);
    const typography = typographyWithDefaults(inputTheme.typography, themeUrl);
    const icons = iconsWithDefaults(inputTheme.icons, themeUrl);
    return { themeUrl, colors, typography, icons };
  }
};

// Only the component's source selector is mandatory
type MinimalComponentConfig = Optional<
  ComponentConfiguration, "componentUrl" | "name" | "target"
>;

export const withDefaults = (input: {
  patternLibUrl?: string | null,
  breakpoints?: number[],
  theme?: MinimalThemeConfig,
  components?: MinimalComponentConfig[],
}): Configuration => {
  const patternLibUrl = input.patternLibUrl || null;
  return {
    patternLibUrl,
    breakpoints: input.breakpoints || [ 1000 ],
    theme: themeWithDefaults(input.theme, patternLibUrl),
    components: (input.components)
      ? input.components.map( (component) => {
          return {
            componentUrl: component.componentUrl || patternLibUrl || null,
            name: component.name || null,
            source: component.source  as string,
            target: component.target || component.source as string,
          };
        })
      : [],
  };
};
