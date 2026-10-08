## Observations

The `-d` flag appears to expect a local OpenAPI definition rather than a remote URL. Supporting HTTP(S) URLs could remove the need to manually download a specification.

The generator accepted the downloaded OpenAPI JSON definition successfully.

Scaffolding then failed during dependency installation because the generated project specifies `@voxgig/apidef ~8.22.1`, while `@voxgig/sdkgen@4.34.2` requires `@voxgig/apidef >=8.25.0`.

I did not bypass npm's dependency resolution with `--force` or `--legacy-peer-deps`. I resolved the conflict by updating `@voxgig/apidef` to a compatible version.

Sapling's OpenAPI definition contains seven generation POST operations (`complete`, `paraphrase`, `rephrase`, `sentence_split`, `simplify`, `summarize`, `translate`) that sdkgen reports as having indistinguishable selectors. The generated `GenerationEntity` exposes only one `create()` method, with no operation discriminator in `GenerationCreateData`. This means the generated SDK does not expose the other operations through distinct SDK methods.

The same issue occurs with Sapling's detection API. It contains eight POST endpoints, but the generated `DetectionEntity` exposes only a single `create()` operation. When multiple OpenAPI operations produce the same sdkgen selector, sdkgen reports a warning and generates only the first matching operation.

This can result in a just getting the sdk to builds and pass its tests while exposing only a subset of the source API.
