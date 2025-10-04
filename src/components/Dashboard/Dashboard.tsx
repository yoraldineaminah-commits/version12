import React from 'react';
import { Users, FolderOpen, CheckSquare, TrendingUp } from 'lucide-react';
import MetricCard from './MetricCard';
import ProgressChart from './ProgressChart';
import ProjectStatusChart from './ProjectStatusChart';
import DepartmentChart from './DepartmentChart';
import RecentActivity from './RecentActivity';
import { mockMetrics, mockUsers, mockProjects } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

export default function Dashboard() {
  const { authUser } = useAuth();
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bonjour' : currentHour < 18 ? 'Bon après-midi' : 'Bonsoir';

  const userRole = authUser?.role || 'stagiaire';
  const userName = authUser ? `${authUser.profile.firstName} ${authUser.profile.lastName}` : 'Utilisateur';

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'responsable_rh':
        return 'Responsable RH';
      case 'encadreur':
        return 'Encadreur';
      case 'stagiaire':
        return 'Stagiaire';
      default:
        return 'Utilisateur';
    }
  };

  const getMetrics = () => {
    const currentUser = mockUsers.find(u => u.profile.email === authUser?.profile.email);

    if (userRole === 'responsable_rh') {
      return {
        totalInterns: mockMetrics.totalInterns,
        activeProjects: mockMetrics.activeProjects,
        completedTasks: mockMetrics.completedTasks,
        successRate: mockMetrics.successRate,
      };
    }

    if (userRole === 'encadreur') {
      const myStagiaires = currentUser?.stagiaires?.length || 0;
      const myProjects = mockProjects.filter(p =>
        p.assignedInterns.some(internId => currentUser?.stagiaires?.includes(internId))
      ).length;
      const completedProjects = mockProjects.filter(p =>
        p.status === 'done' && p.assignedInterns.some(internId => currentUser?.stagiaires?.includes(internId))
      ).length;
      const successRate = myProjects > 0 ? Math.round((completedProjects / myProjects) * 100) : 0;

      return {
        totalInterns: myStagiaires,
        activeProjects: myProjects,
        completedTasks: completedProjects,
        successRate: successRate,
      };
    }

    if (userRole === 'stagiaire') {
      const myProjects = mockProjects.filter(p =>
        p.assignedInterns.includes(currentUser?.id || '')
      ).length;
      const completedProjects = mockProjects.filter(p =>
        p.status === 'done' && p.assignedInterns.includes(currentUser?.id || '')
      ).length;
      const inProgressProjects = mockProjects.filter(p =>
        p.status === 'in-progress' && p.assignedInterns.includes(currentUser?.id || '')
      ).length;
      const totalProgress = mockProjects
        .filter(p => p.assignedInterns.includes(currentUser?.id || ''))
        .reduce((acc, p) => acc + p.completion, 0);
      const avgProgress = myProjects > 0 ? Math.round(totalProgress / myProjects) : 0;

      return {
        totalInterns: myProjects,
        activeProjects: inProgressProjects,
        completedTasks: completedProjects,
        successRate: avgProgress,
      };
    }

    return mockMetrics;
  };

  const metrics = getMetrics();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-sm p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{greeting}, {userName}</h2>
            <p className="text-orange-50 text-sm md:text-base">
              {userRole === 'responsable_rh' && 'Bienvenue sur votre tableau de bord. Voici un aperçu de vos activités aujourd\'hui.'}
              {userRole === 'encadreur' && 'Gérez vos stagiaires et suivez leurs progressions.'}
              {userRole === 'stagiaire' && 'Consultez vos projets et suivez vos progressions.'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="text-xs md:text-sm text-orange-100 mb-1">Aujourd'hui</p>
              <p className="text-xl md:text-2xl font-bold">{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userRole === 'responsable_rh' && (
          <>
            <MetricCard
              title="Total Stagiaires"
              value={metrics.totalInterns}
              icon={Users}
              color="bg-blue-500"
              trend={{ value: 12, isPositive: true }}
            />
            <MetricCard
              title="Projets Actifs"
              value={metrics.activeProjects}
              icon={FolderOpen}
              color="bg-green-500"
              trend={{ value: 8, isPositive: true }}
            />
            <MetricCard
              title="Tâches Terminées"
              value={metrics.completedTasks.toLocaleString()}
              icon={CheckSquare}
              color="bg-purple-500"
              trend={{ value: 15, isPositive: true }}
            />
            <MetricCard
              title="Taux de Réussite"
              value={`${metrics.successRate}%`}
              icon={TrendingUp}
              color="bg-orange-500"
              trend={{ value: 3, isPositive: true }}
            />
          </>
        )}

        {userRole === 'encadreur' && (
          <>
            <MetricCard
              title="Mes Stagiaires"
              value={metrics.totalInterns}
              icon={Users}
              color="bg-blue-500"
              trend={{ value: 0, isPositive: true }}
            />
            <MetricCard
              title="Projets en Cours"
              value={metrics.activeProjects}
              icon={FolderOpen}
              color="bg-green-500"
              trend={{ value: 0, isPositive: true }}
            />
            <MetricCard
              title="Projets Terminés"
              value={metrics.completedTasks}
              icon={CheckSquare}
              color="bg-purple-500"
              trend={{ value: 0, isPositive: true }}
            />
            <MetricCard
              title="Taux de Réussite"
              value={`${metrics.successRate}%`}
              icon={TrendingUp}
              color="bg-orange-500"
              trend={{ value: 0, isPositive: true }}
            />
          </>
        )}

        {userRole === 'stagiaire' && (
          <>
            <MetricCard
              title="Mes Projets"
              value={metrics.totalInterns}
              icon={FolderOpen}
              color="bg-blue-500"
              trend={{ value: 0, isPositive: true }}
            />
            <MetricCard
              title="En Cours"
              value={metrics.activeProjects}
              icon={FolderOpen}
              color="bg-green-500"
              trend={{ value: 0, isPositive: true }}
            />
            <MetricCard
              title="Terminés"
              value={metrics.completedTasks}
              icon={CheckSquare}
              color="bg-purple-500"
              trend={{ value: 0, isPositive: true }}
            />
            <MetricCard
              title="Progression Moyenne"
              value={`${metrics.successRate}%`}
              icon={TrendingUp}
              color="bg-orange-500"
              trend={{ value: 0, isPositive: true }}
            />
          </>
        )}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart />
        <ProjectStatusChart />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DepartmentChart />
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}