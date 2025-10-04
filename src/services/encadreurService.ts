import { apiService } from './api';

export interface EncadreurDTO {
  id: number;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  internCount: number;
}

export interface UpdateEncadreurRequest {
  department?: string;
}

export const encadreurService = {
  async getAllEncadreurs(): Promise<EncadreurDTO[]> {
    return apiService.get<EncadreurDTO[]>('/encadreurs');
  },

  async getEncadreurById(id: number): Promise<EncadreurDTO> {
    return apiService.get<EncadreurDTO>(`/encadreurs/${id}`);
  },

  async updateEncadreur(id: number, request: UpdateEncadreurRequest): Promise<EncadreurDTO> {
    return apiService.put<EncadreurDTO>(`/encadreurs/${id}`, request);
  },

  async deleteEncadreur(id: number): Promise<void> {
    return apiService.delete<void>(`/encadreurs/${id}`);
  }
};
