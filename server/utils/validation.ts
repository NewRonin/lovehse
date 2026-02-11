export function requireString(value: any, field: string) {
  if (!value || typeof value !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: `${field} is required`,
    });
  }
}
