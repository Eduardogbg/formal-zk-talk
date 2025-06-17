# formal-zk-talk

my talk at zuberlin 2025, tuesday 17th of june, about the landscape of formally verifying zkVMs

slides hosted on [proofproofpass.it](https://proofproofpass.it)

## notes

- [`notes.md`](./src/notes.md)

## development environment

- the slides are written in markdown on [`slides.md`](./src/slides.md)
- then compiled to `html` with `marp`
- [`engine.ts`](./marp/engine.ts) allows you to add plugins to `marp`

```
# install deps
bun install

# to build the slides run
bun run build

# to see a preview window that hot-reloads with your changes
bun run preview
```
