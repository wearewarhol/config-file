// This module provides functions to fill up partial configuration objects with
// sensible defaults. This is a messy cascading mechanism that will never be
// beautiful and that will only ever grow larger.

import { Optional } from "@warhol/utilities";
import {
  Configuration,
  ComponentConfiguration,
  ThemeConfiguration,
  ThemeColorsConfiguration,
} from "./types";

// The color configuration is optional, nullable and "colorsUrl" and
// "properties" are optional with the url being cascaded from the rest of the
// config and the properties defaulting to some built-in value
type MinimalColorsConfig =
  Optional<NonNullable<ThemeColorsConfiguration>, "colorsUrl" | "properties">
    | null
    | undefined;

const colorsWithDefaults = (
  inputColors: MinimalColorsConfig,
  themeUrl: string | null,
): ThemeColorsConfiguration => {
  if (!inputColors || !inputColors.sources) {
    return null;
  } else {
    const properties =
      (inputColors.properties && inputColors.properties.length > 0)
        ? inputColors.properties
        : [ "background-color" ];
    return {
      colorsUrl: inputColors.colorsUrl || themeUrl,
      sources: inputColors.sources,
      properties,
    };
  }
};

// Everything about a theme is optional and nullable
type MinimalThemeConfig = {
  themeUrl?: string | null;
  colors?: MinimalColorsConfig;
} | null | undefined;

const themeWithDefaults = (
  inputTheme: MinimalThemeConfig,
  styleguideUrl: string | null,
): ThemeConfiguration => {
  if (!inputTheme) {
    return null;
  } else {
    const themeUrl = (inputTheme)
      ? inputTheme.themeUrl || styleguideUrl || null
      : styleguideUrl || null;
    const colors = colorsWithDefaults(inputTheme.colors, themeUrl);
    return { themeUrl, colors };
  }
};

// Only the component's source selector is mandatory
type MinimalComponentConfig = Optional<
  ComponentConfiguration, "componentUrl" | "name" | "target"
>;

export const withDefaults = (input: {
  styleguideUrl?: string | null,
  breakpoints?: number[] | null,
  theme?: MinimalThemeConfig,
  components?: MinimalComponentConfig[],
}): Configuration => {
  const styleguideUrl = input.styleguideUrl || null;
  return {
    styleguideUrl,
    breakpoints: input.breakpoints || [ 1000 ],
    theme: themeWithDefaults(input.theme, styleguideUrl),
    components: (input.components)
      ? input.components.map( (component) => {
          return {
            componentUrl: component.componentUrl || null,
            name: component.name || null,
            source: component.source  as string,
            target: component.target || component.source as string,
          };
        })
      : [],
  };
};
