import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      firstname: null,
      email: null,
      storedrole: null,
      user_id: null,
      hasAllRights: null,
      setAuth: (newState) => set((state) => newState),
    }),
    {
      name: "Authentication-state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
