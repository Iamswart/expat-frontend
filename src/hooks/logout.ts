import { useAuthStore } from "../store";

export function logout() {
  const authStore = useAuthStore.getState();
  authStore.logout();

  
}
