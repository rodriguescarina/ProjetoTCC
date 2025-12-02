import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService, apiUtils } from "../services/api";

const useAuthStore = create(
  persist(
    (set, get) => ({
      // Estado
      user: null,
      ong: null,
      token: null,
      isAuthenticated: false,
      userType: null, // 'volunteer' ou 'ong'
      isLoading: false,
      error: null,

      // Ações
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),

      // Login de voluntário
      loginVolunteer: async (credentials) => {
        try {
          set({ isLoading: true, error: null });

          const response = await authService.loginVolunteer(credentials);
          const { token, user } = response;

          set({
            user,
            token,
            isAuthenticated: true,
            userType: "volunteer",
            isLoading: false,
            error: null,
          });

          return { success: true, user };
        } catch (error) {
          const errorMessage = apiUtils.handleError(error);
          set({
            isLoading: false,
            error: errorMessage,
            user: null,
            token: null,
            isAuthenticated: false,
            userType: null,
          });
          throw new Error(errorMessage);
        }
      },

      // Login de ONG
      loginONG: async (credentials) => {
        try {
          set({ isLoading: true, error: null });

          const response = await authService.loginONG(credentials);
          const { token, ong } = response;

          set({
            ong,
            token,
            isAuthenticated: true,
            userType: "ong",
            isLoading: false,
            error: null,
          });

          return { success: true, ong };
        } catch (error) {
          const errorMessage = apiUtils.handleError(error);
          set({
            isLoading: false,
            error: errorMessage,
            ong: null,
            token: null,
            isAuthenticated: false,
            userType: null,
          });
          throw new Error(errorMessage);
        }
      },

      // Cadastro de voluntário
      registerVolunteer: async (userData) => {
        try {
          console.log("Tentando cadastrar voluntário:", userData);
          set({ isLoading: true, error: null });

          const response = await authService.registerVolunteer(userData);
          const { token, user } = response;

          console.log("Voluntário cadastrado com sucesso:", response);

          set({
            user,
            token,
            isAuthenticated: true,
            userType: "volunteer",
            isLoading: false,
            error: null,
          });

          return { success: true, user };
        } catch (error) {
          console.error("Erro no cadastro de voluntário:", error);

          // Tratar erros de validação com mais detalhes
          let errorMessage = apiUtils.handleError(error);

          // Se é erro de validação, mostrar detalhes específicos
          if (
            apiUtils.isValidationError(error) &&
            error.response?.data?.errors
          ) {
            const errors = error.response.data.errors;
            if (Array.isArray(errors) && errors.length > 0) {
              // Mostrar todos os erros de validação
              const errorMessages = errors
                .map((err) => err.msg || err)
                .join(", ");
              errorMessage = `Erro de validação: ${errorMessages}`;
            }
          }

          set({
            isLoading: false,
            error: errorMessage,
            user: null,
            token: null,
            isAuthenticated: false,
            userType: null,
          });
          throw new Error(errorMessage);
        }
      },

      // Cadastro de ONG
      registerONG: async (ongData) => {
        try {
          console.log("Tentando cadastrar ONG:", ongData);
          set({ isLoading: true, error: null });

          const response = await authService.registerONG(ongData);
          const { token, ong } = response;

          console.log("ONG cadastrada com sucesso:", response);

          set({
            ong,
            token,
            isAuthenticated: true,
            userType: "ong",
            isLoading: false,
            error: null,
          });

          return { success: true, ong };
        } catch (error) {
          console.error("Erro no cadastro de ONG:", error);

          // Tratar erros de validação com mais detalhes
          let errorMessage = apiUtils.handleError(error);

          // Se é erro de validação, mostrar detalhes específicos
          if (
            apiUtils.isValidationError(error) &&
            error.response?.data?.errors
          ) {
            const errors = error.response.data.errors;
            if (Array.isArray(errors) && errors.length > 0) {
              // Mostrar todos os erros de validação
              const errorMessages = errors
                .map((err) => err.msg || err)
                .join(", ");
              errorMessage = `Erro de validação: ${errorMessages}`;
            }
          }

          set({
            isLoading: false,
            error: errorMessage,
            ong: null,
            token: null,
            isAuthenticated: false,
            userType: null,
          });
          throw new Error(errorMessage);
        }
      },

      // Verificar autenticação atual
      checkAuth: async () => {
        try {
          const { token } = get();
          if (!token) return false;

          const response = await authService.getCurrentUser();
          const { user, ong } = response;

          if (user) {
            set({
              user,
              isAuthenticated: true,
              userType: "volunteer",
              error: null,
            });
            return true;
          } else if (ong) {
            set({
              ong,
              isAuthenticated: true,
              userType: "ong",
              error: null,
            });
            return true;
          }

          return false;
        } catch (error) {
          // Token inválido, fazer logout
          get().logout();
          return false;
        }
      },

      // Atualizar dados do usuário
      updateUser: (userData) => {
        const { userType } = get();
        if (userType === "volunteer") {
          set({ user: { ...get().user, ...userData } });
        } else if (userType === "ong") {
          set({ ong: { ...get().ong, ...userData } });
        }
      },

      // Logout
      logout: () => {
        set({
          user: null,
          ong: null,
          token: null,
          isAuthenticated: false,
          userType: null,
          isLoading: false,
          error: null,
        });
      },

      // Limpar erro
      clearError: () => set({ error: null }),

      // Getters
      getCurrentUser: () => {
        const { user, ong, userType } = get();
        return userType === "volunteer" ? user : ong;
      },

      getToken: () => get().token,
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        userType: state.userType,
        user: state.user,
        ong: state.ong,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export { useAuthStore };
export default useAuthStore;
