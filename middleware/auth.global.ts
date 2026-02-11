export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === "/auth") return;
  if (to.path === "/results") return;

  try {
    await $fetch("/api/auth/me");
  } catch {
    return navigateTo("/auth");
  }
});
