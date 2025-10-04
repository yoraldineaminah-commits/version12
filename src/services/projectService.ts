import { apiService } from './api';

export interface ProjectDTO {
  id: number;
  title: string;
  description: string;
  internId: number;
  internName: string;
  encadreurId: number;
  encadreurName: string;
  startDate: string;
  endDate: string;
  status: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  internId: number;
  startDate: string;
  endDate: string;
}

export interface UpdateProjectRequest {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  progress?: number;
}

export const projectService = {
  async getAllProjects(): Promise<ProjectDTO[]> {
    return apiService.get<ProjectDTO[]>('/projects');
  },

  async getProjectById(id: number): Promise<ProjectDTO> {
    return apiService.get<ProjectDTO>(`/projects/${id}`);
  },

  async getProjectsByIntern(internId: number): Promise<ProjectDTO[]> {
    return apiService.get<ProjectDTO[]>(`/projects/intern/${internId}`);
  },

  async getProjectsByEncadreur(encadreurId: number): Promise<ProjectDTO[]> {
    return apiService.get<ProjectDTO[]>(`/projects/encadreur/${encadreurId}`);
  },

  async createProject(request: CreateProjectRequest): Promise<ProjectDTO> {
    return apiService.post<ProjectDTO>('/projects', request);
  },

  async updateProject(id: number, request: UpdateProjectRequest): Promise<ProjectDTO> {
    return apiService.put<ProjectDTO>(`/projects/${id}`, request);
  },

  async deleteProject(id: number): Promise<void> {
    return apiService.delete<void>(`/projects/${id}`);
  }
};
