// Check for problems in config files that JSON schema can't catch

import { enumerate, Parameter } from "@warhol/utilities";
import { NonsensicalConfigError } from "./errors";
import { withDefaults } from "./defaults";

export const checkSanity = (
  { utils, components }: Parameter<typeof withDefaults, 0>,
): void => {
  if (!utils) {
    return;
  }
  for (const util of utils.sources) {
    if (!util.components || util.components.length === 0) {
      continue;
    }
    for (const componentTarget of util.components) {
      const componentMatch = (components)
        ? components.find( ({ source, target = source }) => {
          return componentTarget === target;
        }) : null;
      if (!componentMatch) {
        const utilName = util.name || util.selector;
        const restiction = enumerate(util.components);
        const message = `The ${ util.type } utility "${ utilName }" is ` +
                        `restricted to the component(s) ${ restiction }, ` +
                        `but no component with the target selector ` +
                        `${ componentTarget } is defined in the configuration`;
        throw new NonsensicalConfigError(message);
      }
    }
  }
};
