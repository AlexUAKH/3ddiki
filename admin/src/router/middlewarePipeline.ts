export default function middlewarePipeline(
  context: any,
  middleware: any,
  index: number,
): any {
  const nextMiddleware = middleware[index];
  if (!nextMiddleware) {
    return;
  }

  return () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1);

    nextMiddleware({ ...context, next: nextPipeline });
  };
}
