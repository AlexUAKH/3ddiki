export function render<C>(
  component: C,
  options?: RenderOptions<C> | null,
  vuetifyOptions?: VuetifyOptions,
): RenderResult {
  const vuetify = createVuetify(
    mergeDeep({ icons: { aliases } }, vuetifyOptions),
  );

  const defaultOptions = {
    global: {
      stubs: {
        transition: false,
        "transition-group": false,
      },
      plugins: [vuetify],
    },
  };

  const mountOptions = mergeDeep(defaultOptions, options!, (a, b) =>
    a.concat(b),
  );

  return _render(component, mountOptions);
}
