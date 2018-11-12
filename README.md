# Config file reader

This module reads project configuration for a snapshot run from a JSON file
requested via http. The file schema is specified in `warhol.schema.json`. An
example:

```json
{
  "breakpoints": [
    1280, 1024, 800, 400, 280
  ],
  "components": [
    { "sourceSelector": ".foo", "targetSelector": ".foo" },
    { "sourceSelector": ".bar", "targetSelector": ".bar" }
  ]
}
```

## License

This project is licensed under [MIT](./LICENSE).
