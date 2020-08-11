# Config parser

This module validates project configuration objects or JSON strings and turns
valid partial configuration objects into full configurations with sensible
defaults. The file schema is specified in `warhol.schema.json`. An example:

```json
{
  "patternLibUrl": "https://foo.com/components",
  "patternLibHeaders": {
    "DNT": "1"
  },
  "patternLibCookies": [{
    "name": "Hello",
    "value": "42",
    "expires": 9000,
    "sameSite": "Lax"
  }],
  "breakpoints": [
    1280, 1024, 800, 400, 280
  ],
  "theme": {
    "colors": {
      "colorsUrl": "https://foo.com/components/theme/colors",
      "sources": ".swatch",
      "properties": [ "background-color", "color" ]
    },
    "typography": {
      "typographyUrl": "https://foo.com/components/theme/typography",
      "sources": ".typo",
      "properties": [ "font-family", "font-size", "font-weight", "font-style" ]
    },
    "icons": {
      "iconsUrl": "https://foo.com/components/theme/icons",
      "sources": ".icon",
      "type": "font"
    }
  },
  "utils": {
    "iconsUrl": "https://foo.com/components/theme/utils",
    "sources": [
      { "type": "rule", "selector": ".align-left" },
      { "type": "rule", "selector": ".align-right" },
      { "type": "element", "selector": ".shadow", "components": [ ".foo", ".notEqualToSource" ] }
    ]
  },
  "components": [
    { "source": ".foo" },
    { "source": ".bar", "target": ".notEqualToSource" },
    { "source": ".baz", "url": "https://foo.com/components/baz" }
  ]
}
```

## Notable revisions

* **v9.0.0**: new fields `patternLibHeaders` and `patternLibHeaders`
* **v8.0.0**: `name` on components and utils no longer defaults to `null` but rather to `source` and `selector` respectively, fixing [#10](https://github.com/wearewarhol/config-file/issues/10)

## Schema

### Field `patternLibUrl` (optional, `string` or `null`, defaults to `null`)

URL for the pattern library's main page ("kitchen sink"), if any. Can be
overruled for each component and theme configuration with their own URLs. If the
pattern library URL is not specified, components and themes (or sub-sections of
themes) *must* provide their own URLs.

### Field `patternLibUrlHeaders` (optional, `Record<string, string>` or `null`, defaults to `{}`)

Header to set when accessing the pattern library.

### Field `patternLibUrlCookies` (optional, `Cookie` or `null`, defaults to `[]`)

Cookies to set when accessing the pattern library. Cookie object type:

```typescript
type Cookie = {
  name: string;
  value: string;
  path?: string;
  domain?: string;
  expires?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "Lax" | "Strict";
};
```

Not that the JSON schema requires the number in `expires` to be an integer.

### Field `breakpoints` (optional, `number[]` or `null`, defaults to `[ 1000 ]`)

Breakpoints for the pattern library (and the production page that implements the
pattern lib), controls the screen widths at which snapshots for the components
are taken.

### Field `components` (optional, `ComponentDefinition[]` or `null`, defaults to `[]`)

List of component definitions. A component definition is an object with the
following fields:

* `source` (`string`, required, non-empty): source selector
* `target` (`string`, optional, non-empty): target selector, defaults to the source selector
* `name` (`string`, optional, non-empty): component name, defaults to to the source selector
* `componentUrl` (`string` or `null`, optional *or required* depending on the pattern lib URL): this component's own URL, defaults to the pattern lib URL. If no pattern lib URL was specified, this field is required for each component.

### Field `theme` (optional, `object` or `null`, defaults to `null`)

Theme configuration for colors, typography and such.

### Field `theme.url` (optional, `string` or `null`, defaults to the pattern lib URL)

Theme URL, can be overruled by the URLs specified in the theme's sub-properties.

### Field `theme.colors` (optional, `object` or `null`, defaults to `null`)

Configuration for theme colors with the following fields:

* `sources` (`string`, required, non-empty): selector for color source elements
* `properties` (enum of css color properties, optional, defaults to `[ "background-color" ]`): configures the css properties to use as a color source. CSS shorthand properties like `background` are not allowed.
* `colorsUrl` (`string` or `null`, optional *or required* depending on the theme and pattern lib URLs, defaults to the theme or pattern lib URL): the url for the color sources

The `colorsUrl` field is required if neither a pattern lib URL nor a theme url have been specified.

### Field `theme.typography` (optional, `object` or `null`, defaults to `null`)

Configuration for theme typography with the following fields:

* `sources` (`string`, required, non-empty): selector for elements that contain typography examples
* `properties` (list of css properties, optional, defaults to `[ "font-family", "font-size", "font-weight", "font-style" ]`): configures the css properties that define a typography example. CSS shorthand properties like `font` are not allowed.
* `typographyUrl` (`string` or `null`, optional *or required* depending on the theme and pattern lib URLs, defaults to the theme or pattern lib URL): the url for the typography examples

The `typographyUrl` field is required if neither a pattern lib URL nor a theme url have been specified.

### Field `theme.icons` (optional, `object` or `null`, defaults to `null`)

Configuration for theme icons with the following fields:

* `sources` (`string`, required, non-empty): selector for elements that contain icons
* `iconsUrl` (`string` or `null`, optional *or required* depending on the theme and pattern lib URLs, defaults to the theme or pattern lib URL): the url for the icon examples
* `type` (`"font"`, required): defines if icons are created using an icon font or in some other way (no other way is supported at this moment)

The `iconsUrl` field is required if neither a pattern lib URL nor a theme url have been specified.

### Field `utils` (optional, `object` or `null`, defaults to `null`)

Definitions for style utilities (classes for alignment, layout, shadows and the like).

### Field `utils.utilsUrl` (optional, `string` or `null`, defaults to the pattern lib URL)

Utils URL, is only required if there is no top-level `patternLibUrl`.

### Field `utils.sources` (required, array of objects)

Sources for utilities. Each utility is described by an object:

* `type` (either `"rule"` or `"element"`): whether to read the utility styles from an element or from a css rule
* `selector` (`string`, required, non-empty): the selector for the the style utility
* `name` (`string`, optional, non-empty, defaults to `selector`): utility name name, defaults to `selector`

### Field `utils.components` (optional, array of strings)

List of components (specified by their target selector) that this utility can apply to. Each selector *must* match a component's target selector (or its source selector if the component in question has no target selector).

## JavaScript API

### `function fromObject = (input: PartialConfiguration) => Configuration`

Validates a configuration object against the schema described above and fills in
the default values. Throws a `InvalidConfigError` if the object does not conform
to the schema. The error's `message` property contains a JSON-encoded
representation of the validation error thanks to [better-ajv-errors](https://github.com/atlassian/better-ajv-errors).
An example:

```json
[
  {
    "start": {
      "line": 1,
      "column": 82,
      "offset": 81
    },
    "end": {
      "line": 1,
      "column": 86,
      "offset": 85
    },
    "error": "/components/1/source: type should be string",
    "path": "/components/1/source"
  }
]
```

### `function fromJSON = (input: string) => Configuration`

Parses a JSON string into an object, validates the object against the schema
described above and fills in the default values. Throws a
`MalformedConfigError` if the input is not valid JSON. Throws a
`InvalidConfigError` like `fromObject()` if the object does not conform to the
schema.

### Exported types

* `Configuration`
* `ComponentConfiguration`
* `ThemeConfiguration`
* `ThemeColorsConfiguration`
* `ThemeTypographyConfiguration`
* `ThemeIconsConfiguration`

### Errors

* **`MalformedConfigError`**: Invalid JSON input
* **`InvalidConfigError`**: Input JSON or object does not conform to the schema. The error message is the JS output provided by the package [better-ajv-errors](https://www.npmjs.com/package/better-ajv-errors)
* **`NonsensicalConfigError`**: A utility definition refers to a component that has not been defined
