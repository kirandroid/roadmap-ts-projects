export function prefixRoutes(prefix: string, routes: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(routes).map(([path, handler]) => [
      `${prefix}${path}`,
      handler,
    ]),
  );
}
