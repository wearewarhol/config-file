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
    { "source": ".foo", "target": ".foo" },
    { "source": ".bar", "target": ".bar" }
  ]
}
```

## License

This project is licensed under [MIT](./LICENSE).
