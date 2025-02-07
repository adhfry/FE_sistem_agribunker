import { createRouter, createWebHistory } from "vue-router";
import axios from "@/plugins/axios";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
const cekAuth = async (to: any, from: any, next: any) => {
  try {
    // Dapatkan CSRF cookie
    await axios.get("/sanctum/csrf-cookie");

    // Periksa status login user
    let { data } = await axios.get("/api/cek/auth");

    if (data.status === "success") {
      if (to.path === "/auth/login") {
        return next("/"); // Redirect ke dashboard atau halaman yang diinginkan
      } else {
        next(); // Jika sudah login, izinkan akses halaman selain login
      }
    } else {
      // Jika belum login, redirect ke halaman login
      return next("/auth/login");
    }
  } catch (error) {
    // Jika ada error (misalnya gagal mendapatkan status login), alihkan ke halaman login
    return next("/auth/login");
  }
};
router.beforeEach(async (to: any, from: any, next: any) => {
  const isAuthRequired = to.meta.authRequired;
  const isDirectToLogin = to.meta.directToLogin;
  if (isDirectToLogin) {
    await cekAuth(to, from, next);
  }
  if (!isAuthRequired) {
    return next();
  } else {
    await cekAuth(to, from, next);
  }
});

export default router;
