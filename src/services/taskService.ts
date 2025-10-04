import { apiService } from './api';

export interface TaskDTO {
  id: number;
  title: string;
  description: string;
  projectId: number;
  projectTitle: string;
  internId: number;
  internName: string;
  priority: string;
  status: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  projectId: number;
  priority: string;
  dueDate: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
  dueDate?: string;
}

export const taskService = {
  async getAllTasks(): Promise<TaskDTO[]> {
    return apiService.get<TaskDTO[]>('/tasks');
  },

  async getTaskById(id: number): Promise<TaskDTO> {
    return apiService.get<TaskDTO>(`/tasks/${id}`);
  },

  async getTasksByProject(projectId: number): Promise<TaskDTO[]> {
    return apiService.get<TaskDTO[]>(`/tasks/project/${projectId}`);
  },

  async getTasksByIntern(internId: number): Promise<TaskDTO[]> {
    return apiService.get<TaskDTO[]>(`/tasks/intern/${internId}`);
  },

  async createTask(request: CreateTaskRequest): Promise<TaskDTO> {
    return apiService.post<TaskDTO>('/tasks', request);
  },

  async updateTask(id: number, request: UpdateTaskRequest): Promise<TaskDTO> {
    return apiService.put<TaskDTO>(`/tasks/${id}`, request);
  },

  async deleteTask(id: number): Promise<void> {
    return apiService.delete<void>(`/tasks/${id}`);
  }
};
