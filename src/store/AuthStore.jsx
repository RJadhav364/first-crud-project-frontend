import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      storedfirstname: null,
      storedemail: null,
      storedrole: null,
      storeduser_id: null,
      storedhasAllRights: null,
      setAuth: (newState) => set((state) => newState),
    }),
    {
      name: "Authentication-state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
