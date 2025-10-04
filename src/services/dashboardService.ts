import { apiService } from './api';

export interface DashboardMetrics {
  totalInterns: number;
  activeProjects: number;
  completedTasks: number;
  completionRate: number;
}

export interface DepartmentStats {
  department: string;
  count: number;
}

export interface ProjectStatusStats {
  status: string;
  count: number;
}

export interface TaskStats {
  status: string;
  count: number;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  departmentStats: DepartmentStats[];
  projectStatusStats: ProjectStatusStats[];
  taskStats: TaskStats[];
}

export const dashboardService = {
  async getDashboardData(): Promise<DashboardData> {
    return apiService.get<DashboardData>('/dashboard');
  }
};
