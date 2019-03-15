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
      "colorsUrl": "https://foo.com/components/colors",
      "sources": ".swatch",
      "properties": [ "background-color", "color" ]
    }
  },
  "components": [
    { "source": ".foo" },
    { "source": ".bar", "target": ".notEqualToSource" },
    { "source": ".baz", "url": "https://foo.com/components/baz" }
  ]
}
```

## To do

**The schema currently does not enforce that a URL is present for every theme
configuration sub-property.** The url is inherited from `theme.themeUrl` and
`styleguideUrl`, but if those properties are missing, it is, at the moment,
still allowed to pass no url to theme sub-properties. This should be disallowed.

## Schema

### Field `styleguideUrl` (optional, `string` or `null`, defaults to `null`)

URL for the styleguide's main page, if any. Can be overruled for each component
and theme configuration with their own URLs.

### Field `breakpoints` (optional, `number[]` or, defaults to `[ 1000 ]`)

Breakpoints for the styleguide, contols the screen widths at which snapshots
for the components are taken.

### Field `components` (optional, `ComponentDefinition[]`, defaults to `[]`)

List of component definitions. A component definiton is an object with the
following fields:

  * `source` (`string`, required): source selector
  * `target` (`string`, optional): target selector, defaults to the source selector
  * `name` (`string` or `null`, optional): component name, defaults to `null`
  * `componentUrl` (`string` or `null`, optional): this component's own URL, defaults to the styleguide URL

### Field `theme` (optional, `object`, defaults to `null`)

Theme configuration for colors and such.

### Field `theme.url` (optional, `string`, defaults to the styleguide URL)

Theme URL, can be overruled by the URLs specified in the theme's sub-properties.

### Field `theme.colors` (optional, `object`, defaults to `null`)

Configuration for theme colors with the following fields:

  * `colorsUrl` (optional, `string`, defaults to the theme or styleguide URL): the url for the color sources
  * `sources (required, `string`)`: selector for color source elements
  * `properties` (optional, enum of css color properties, defaults to `[ "background-color" ]`): configures the css properties to use as a color source

## JavaScript API

### `function fromObject = (input: PartialConfiguration) => Configuration`

Validates a configuration object against the schema described above and fills in
the default values. Throws a `TypeError` if the object does not conform to the
schema. The error's `message` property contains a JSON-encoded representation
of the validation error.

### `function fromJSON = (input: string) => Configuration`

Parses a JSON string into an object, validates the object against the schema
described above and fills in the default values. Throws a `SyntaxError` if the
input is not valid JSON. Throws a `TypeError` if the object does not conform to
the schema. The error's `message` property contains a JSON-encoded
representation of the validation error.

### Exported types

* `Configuration`
* `ComponentConfiguration`
* `ThemeConfiguration`
* `ThemeColorsConfiguration`
