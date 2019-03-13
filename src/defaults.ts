import { ComponentConfiguration, Configuration } from "./types";

const themeWithDefaults = (input: any): Configuration["theme"] => {
  if (!input) {
    return null;
  } else {
    const colors = (!input.colors)
      ? null
      : {
        sources: input.colors.sources,
        properties: input.colors.properties || [ "background-color" ],
      };
    return { colors };
  }
};

export const withDefaults = (input: {
  styleguideUrl?: string | null,
  breakpoints?: number[] | null,
  theme?: any,
  components: Array<Partial<ComponentConfiguration>>,
}): Configuration => {
  return {
    styleguideUrl: input.styleguideUrl || null,
    breakpoints: input.breakpoints || [ 1000 ],
    theme: themeWithDefaults(input.theme),
    components: input.components.map( (component) => {
      return {
        componentUrl: component.componentUrl || null,
        name: component.name || null,
        source: component.source  as string,
        target: component.target || component.source as string,
      };
    }),
  };
};
