export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const user = localStorage.getItem('user');
    // Cek hanya untuk route admin, user, admin_uji
    if (!user && (to.path.startsWith('/admin') || to.path.startsWith('/user') || to.path.startsWith('/admin_uji'))) {
      return navigateTo('/login');
    }
  }
});
