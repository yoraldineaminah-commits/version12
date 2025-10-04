import { apiService } from './api';

export interface InternDTO {
  id: number;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  encadreurId: number;
  encadreurName: string;
  startDate: string;
  endDate: string;
  university: string;
  department: string;
  status: string;
  progress: number;
}

export interface CreateInternRequest {
  email: string;
  firstName: string;
  lastName: string;
  encadreurId: number;
  startDate: string;
  endDate: string;
  university: string;
  department: string;
}

export interface UpdateInternRequest {
  startDate?: string;
  endDate?: string;
  university?: string;
  department?: string;
  status?: string;
}

export const internService = {
  async getAllInterns(): Promise<InternDTO[]> {
    return apiService.get<InternDTO[]>('/interns');
  },

  async getInternById(id: number): Promise<InternDTO> {
    return apiService.get<InternDTO>(`/interns/${id}`);
  },

  async getInternsByEncadreur(encadreurId: number): Promise<InternDTO[]> {
    return apiService.get<InternDTO[]>(`/interns/encadreur/${encadreurId}`);
  },

  async createIntern(request: CreateInternRequest): Promise<InternDTO> {
    return apiService.post<InternDTO>('/interns', request);
  },

  async updateIntern(id: number, request: UpdateInternRequest): Promise<InternDTO> {
    return apiService.put<InternDTO>(`/interns/${id}`, request);
  },

  async deleteIntern(id: number): Promise<void> {
    return apiService.delete<void>(`/interns/${id}`);
  }
};
