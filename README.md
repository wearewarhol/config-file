# Config parser

This module validates project configuration objects or JSON strings and turns
valid partial configuration objects into full configurations with sensible
defaults. The file schema is specified in `warhol.schema.json`. An example:

```json
{
  "styleguideUrl": "https://foo.com/components",
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
      "isFont": true
    }
  },
  "components": [
    { "source": ".foo" },
    { "source": ".bar", "target": ".notEqualToSource" },
    { "source": ".baz", "url": "https://foo.com/components/baz" }
  ]
}
```

## Schema

### Field `styleguideUrl` (optional, `string` or `null`, defaults to `null`)

URL for the styleguide's main page, if any. Can be overruled for each component
and theme configuration with their own URLs. If the styleguide URL is not
specified, components and themes (or sub-sections of themes) *must* provide
their own URLs.

### Field `breakpoints` (optional, `number[]` or, defaults to `[ 1000 ]`)

Breakpoints for the styleguide, contols the screen widths at which snapshots
for the components are taken.

### Field `components` (optional, `ComponentDefinition[]`, defaults to `[]`)

List of component definitions. A component definiton is an object with the
following fields:

  * `source` (`string`, required, non-empty): source selector
  * `target` (`string`, optional, non-empty): target selector, defaults to the source selector
  * `name` (`string` or `null`, optional, non-empty): component name, defaults to `null`
  * `componentUrl` (`string` or `null`, optional *or required* depending on the styleguide URL): this component's own URL, defaults to the styleguide URL. If no styleguide URL was specified, this field is required for each component.

### Field `theme` (optional, `object`, defaults to `null`)

Theme configuration for colors, typography and such.

### Field `theme.url` (optional, `string`, defaults to the styleguide URL)

Theme URL, can be overruled by the URLs specified in the theme's sub-properties.

### Field `theme.colors` (optional, `object`, defaults to `null`)

Configuration for theme colors with the following fields:

  * `sources` (`string`, required, non-empty): selector for color source elements
  * `properties` (enum of css color properties, optional, defaults to `[ "background-color" ]`): configures the css properties to use as a color source. CSS shorthand properties like `background` are not allowed.
  * `colorsUrl` (`string`, optional *or required* depending on the theme and styleguide URLs, defaults to the theme or styleguide URL): the url for the color sources

The `colorsUrl` field is required if neither a styleguide URL nor a theme url have been specified.

### Field `theme.typography` (optional, `object`, defaults to `null`)

Configuration for theme typography with the following fields:

  * `sources` (`string`, required, non-empty): selector for elements that contain typography examples
  * `properties` (list of css color properties, optional, defaults to `[ "font-family", "font-size", "font-weight", "font-style" ]`): configures the css properties that define a typography example. CSS shorthand properties like `font` are not allowed.
  * `typographyUrl` (`string`, optional *or required* depending on the theme and styleguide URLs, defaults to the theme or styleguide URL): the url for the typography examples

The `typographyUrl` field is required if neither a styleguide URL nor a theme url have been specified.

### Field `theme.icons` (optional, `object`, defaults to `null`)

Configuration for theme icons with the following fields:

  * `sources` (`string`, required, non-empty): selector for elements that contain icons
  * `iconsUrl` (`string`, optional *or required* depending on the theme and styleguide URLs, defaults to the theme or styleguide URL): the url for the icon examples
  * `isFont` (`boolean`, required, non-empty): defines if icons are created using an icon font

The `iconsUrl` field is required if neither a styleguide URL nor a theme url have been specified.

## JavaScript API

### `function fromObject = (input: PartialConfiguration) => Configuration`

Validates a configuration object against the schema described above and fills in
the default values. Throws a `TypeError` if the object does not conform to the
schema. The error's `message` property contains a JSON-encoded representation
of the validation error thanks to [better-ajv-errors](https://github.com/atlassian/better-ajv-errors).
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
described above and fills in the default values. Throws a `SyntaxError` if the
input is not valid JSON. Throws a `TypeError` like `fromObject()` if the object
does not conform to the schema.

### Exported types

* `Configuration`
* `ComponentConfiguration`
* `ThemeConfiguration`
* `ThemeColorsConfiguration`
* `ThemeTypographyConfiguration`
* `ThemeIconsConfiguration`
