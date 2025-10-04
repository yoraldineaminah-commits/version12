import { apiService } from './api';

export interface CheckEmailResponse {
  exists: boolean;
  hasPassword: boolean;
  role?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    accountStatus: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreatePasswordRequest {
  email: string;
  password: string;
}

export interface CreateAdminRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface CreateEncadreurRequest {
  email: string;
  firstName: string;
  lastName: string;
  department: string;
}

export interface CreateStagiaireRequest {
  email: string;
  firstName: string;
  lastName: string;
  encadreurId: number;
}

export const authService = {
  async checkEmail(email: string): Promise<CheckEmailResponse> {
    return apiService.post<CheckEmailResponse>('/auth/check-email', { email }, false);
  },

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials, false);
    apiService.setToken(response.token);
    return response;
  },

  async createPassword(request: CreatePasswordRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/create-password', request, false);
    apiService.setToken(response.token);
    return response;
  },

  async createAdmin(request: CreateAdminRequest): Promise<any> {
    return apiService.post('/auth/register/admin', request, false);
  },

  async initializeAdmin(): Promise<any> {
    return apiService.post('/auth/init-admin', {}, false);
  },

  async createEncadreur(request: CreateEncadreurRequest): Promise<any> {
    return apiService.post('/auth/register/encadreur', request);
  },

  async createStagiaire(request: CreateStagiaireRequest): Promise<any> {
    return apiService.post('/auth/register/stagiaire', request);
  },

  logout() {
    apiService.setToken(null);
    localStorage.removeItem('auth_user');
  }
};
