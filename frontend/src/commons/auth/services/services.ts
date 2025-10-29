import api from "../../../api/axios";

export type LoginPayload = { email: string; password: string };
export type AuthUser = {
  id_usuario: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: string;
  departamento: string;
  estado: boolean;
  foto_perfil?: string | null;
};

export type LoginResponse = {
  success: boolean;
  details: string;
  data: {
    user: AuthUser;
    access: string;
    refresh: string;
  };
};

export async function login(payload: LoginPayload): Promise<AuthUser> {
  const { data } = await api.post<LoginResponse>("/auth/login/", payload);
  localStorage.setItem("access", data.data.access);
  localStorage.setItem("refresh", data.data.refresh);
  localStorage.setItem("user", JSON.stringify(data.data.user));
  return data.data.user;
}

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
}

export function getUser(): AuthUser | null {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}