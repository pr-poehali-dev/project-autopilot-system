// Update this page (the content is just a fallback if you fail to update the page)

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type MVPStage = 'MVP-0' | 'MVP-1' | 'MVP-2' | 'PRODUCTION';
type TaskStatus = 'pending' | 'running' | 'completed' | 'failed';

interface Task {
  id: string;
  name: string;
  status: TaskStatus;
  scheduledAt: string;
  duration: string;
}

interface Project {
  id: string;
  name: string;
  stage: MVPStage;
  progress: number;
  tasks: Task[];
  nextRecommendation: string;
  lastUpdate: string;
  metrics: {
    users: number;
    conversion: number;
    feedback: number;
  };
}

const mockProjects: Project[] = [
  {
    id: 'proj-001',
    name: 'ai-chatbot-saas',
    stage: 'MVP-1',
    progress: 67,
    tasks: [
      { id: 't1', name: 'deploy_staging', status: 'completed', scheduledAt: '2025-11-15', duration: '2h' },
      { id: 't2', name: 'survey_users', status: 'running', scheduledAt: '2025-11-17', duration: '5d' },
      { id: 't3', name: 'analyze_metrics', status: 'pending', scheduledAt: '2025-11-22', duration: '1d' },
      { id: 't4', name: 'decision_point', status: 'pending', scheduledAt: '2025-11-23', duration: '1h' },
    ],
    nextRecommendation: 'Wait for survey completion. 67% user satisfaction threshold not met yet.',
    lastUpdate: '2 hours ago',
    metrics: { users: 142, conversion: 8.5, feedback: 3.9 }
  },
  {
    id: 'proj-002',
    name: 'mobile-fitness-app',
    stage: 'MVP-0',
    progress: 100,
    tasks: [
      { id: 't5', name: 'landing_deploy', status: 'completed', scheduledAt: '2025-11-10', duration: '1h' },
      { id: 't6', name: 'collect_emails', status: 'completed', scheduledAt: '2025-11-12', duration: '7d' },
      { id: 't7', name: 'trend_analysis', status: 'completed', scheduledAt: '2025-11-19', duration: '4h' },
    ],
    nextRecommendation: '✓ Ready for MVP-1. 250+ signups collected. Demand validated.',
    lastUpdate: '12 minutes ago',
    metrics: { users: 267, conversion: 12.3, feedback: 0 }
  },
  {
    id: 'proj-003',
    name: 'analytics-dashboard',
    stage: 'MVP-2',
    progress: 34,
    tasks: [
      { id: 't8', name: 'beta_launch', status: 'completed', scheduledAt: '2025-11-01', duration: '3h' },
      { id: 't9', name: 'usage_tracking', status: 'running', scheduledAt: '2025-11-05', duration: '30d' },
      { id: 't10', name: 'retention_check', status: 'pending', scheduledAt: '2025-12-05', duration: '2d' },
    ],
    nextRecommendation: 'Continue monitoring. 30-day retention data needed before scaling.',
    lastUpdate: '1 day ago',
    metrics: { users: 89, conversion: 15.7, feedback: 4.2 }
  }
];

const Index = () => {
  const [projects] = useState<Project[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'completed': return 'text-terminal-success';
      case 'running': return 'text-terminal-info';
      case 'failed': return 'text-terminal-error';
      default: return 'text-terminal-muted';
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed': return 'CheckCircle2';
      case 'running': return 'Loader2';
      case 'failed': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getStageColor = (stage: MVPStage) => {
    switch (stage) {
      case 'MVP-0': return 'border-terminal-muted text-terminal-muted';
      case 'MVP-1': return 'border-terminal-info text-terminal-info';
      case 'MVP-2': return 'border-terminal-warning text-terminal-warning';
      case 'PRODUCTION': return 'border-terminal-success text-terminal-success';
    }
  };

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text font-mono">
      <header className="border-b border-terminal-border bg-terminal-darker px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Icon name="Rocket" className="text-terminal-success" size={24} />
            <h1 className="text-xl font-bold text-terminal-bright">product-autopilot</h1>
            <Badge variant="outline" className="border-terminal-success text-terminal-success text-xs">v0.1.0</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-terminal-muted">status:</span>
            <span className="text-terminal-success flex items-center gap-2">
              <span className="w-2 h-2 bg-terminal-success rounded-full animate-pulse"></span>
              operational
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-terminal-darker border border-terminal-border">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-terminal-bg data-[state=active]:text-terminal-success">
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-terminal-bg data-[state=active]:text-terminal-success">
              <Icon name="FolderGit2" size={16} className="mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-terminal-bg data-[state=active]:text-terminal-success">
              <Icon name="GitBranch" size={16} className="mr-2" />
              Timeline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-terminal-darker border-terminal-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-terminal-muted text-sm mb-1">active_projects</p>
                    <p className="text-3xl font-bold text-terminal-bright">{projects.length}</p>
                  </div>
                  <Icon name="Folders" className="text-terminal-info" size={32} />
                </div>
              </Card>
              <Card className="bg-terminal-darker border-terminal-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-terminal-muted text-sm mb-1">running_tasks</p>
                    <p className="text-3xl font-bold text-terminal-bright">
                      {projects.reduce((acc, p) => acc + p.tasks.filter(t => t.status === 'running').length, 0)}
                    </p>
                  </div>
                  <Icon name="Play" className="text-terminal-success" size={32} />
                </div>
              </Card>
              <Card className="bg-terminal-darker border-terminal-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-terminal-muted text-sm mb-1">ready_to_advance</p>
                    <p className="text-3xl font-bold text-terminal-bright">
                      {projects.filter(p => p.progress === 100).length}
                    </p>
                  </div>
                  <Icon name="TrendingUp" className="text-terminal-warning" size={32} />
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map(project => (
                <Card 
                  key={project.id} 
                  className="bg-terminal-darker border-terminal-border p-6 hover:border-terminal-success transition-all cursor-pointer animate-fade-in"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-terminal-bright">{project.name}</h3>
                          <Badge variant="outline" className={`text-xs ${getStageColor(project.stage)}`}>
                            {project.stage}
                          </Badge>
                        </div>
                        <p className="text-sm text-terminal-muted">id: {project.id}</p>
                      </div>
                      <span className="text-xs text-terminal-muted">{project.lastUpdate}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-terminal-muted">progress</span>
                        <span className="text-terminal-bright font-bold">{project.progress}%</span>
                      </div>
                      <Progress 
                        value={project.progress} 
                        className="h-2 bg-terminal-bg"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-2 border-t border-terminal-border">
                      <div>
                        <p className="text-xs text-terminal-muted mb-1">users</p>
                        <p className="text-sm font-bold text-terminal-bright">{project.metrics.users}</p>
                      </div>
                      <div>
                        <p className="text-xs text-terminal-muted mb-1">conversion</p>
                        <p className="text-sm font-bold text-terminal-bright">{project.metrics.conversion}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-terminal-muted mb-1">feedback</p>
                        <p className="text-sm font-bold text-terminal-bright">
                          {project.metrics.feedback > 0 ? project.metrics.feedback.toFixed(1) : '—'}
                        </p>
                      </div>
                    </div>

                    <div className="bg-terminal-bg rounded p-3 border-l-2 border-terminal-info">
                      <p className="text-xs text-terminal-muted mb-1">next_action</p>
                      <p className="text-sm text-terminal-text">{project.nextRecommendation}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="animate-fade-in">
            <Card className="bg-terminal-darker border-terminal-border p-6">
              <h2 className="text-lg font-bold text-terminal-bright mb-4 flex items-center gap-2">
                <Icon name="FolderGit2" size={20} />
                Project Registry
              </h2>
              <div className="space-y-3">
                {projects.map(project => (
                  <div 
                    key={project.id}
                    className="flex items-center justify-between p-4 bg-terminal-bg rounded border border-terminal-border hover:border-terminal-success transition-all cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex items-center gap-4">
                      <Icon name="Folder" className="text-terminal-info" size={20} />
                      <div>
                        <p className="text-terminal-bright font-bold">{project.name}</p>
                        <p className="text-xs text-terminal-muted">{project.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className={`text-xs ${getStageColor(project.stage)}`}>
                        {project.stage}
                      </Badge>
                      <span className="text-sm text-terminal-muted">{project.progress}%</span>
                      <Icon name="ChevronRight" className="text-terminal-muted" size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="animate-fade-in">
            {selectedProject ? (
              <Card className="bg-terminal-darker border-terminal-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-terminal-bright flex items-center gap-2">
                    <Icon name="GitBranch" size={20} />
                    {selectedProject.name} / timeline
                  </h2>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="text-terminal-muted hover:text-terminal-bright transition-colors"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  {selectedProject.tasks.map((task, index) => (
                    <div key={task.id} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <Icon 
                          name={getStatusIcon(task.status)} 
                          className={`${getStatusColor(task.status)} ${task.status === 'running' ? 'animate-spin' : ''}`}
                          size={20}
                        />
                        {index < selectedProject.tasks.length - 1 && (
                          <div className="w-px h-12 bg-terminal-border my-2"></div>
                        )}
                      </div>

                      <div className="flex-1 bg-terminal-bg rounded p-4 border border-terminal-border">
                        <div className="flex items-center justify-between mb-2">
                          <code className="text-terminal-bright font-bold">{task.name}</code>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${task.status === 'completed' ? 'border-terminal-success text-terminal-success' : task.status === 'running' ? 'border-terminal-info text-terminal-info' : 'border-terminal-muted text-terminal-muted'}`}
                          >
                            {task.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-terminal-muted">
                          <span className="flex items-center gap-1">
                            <Icon name="Calendar" size={12} />
                            {task.scheduledAt}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={12} />
                            {task.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ) : (
              <Card className="bg-terminal-darker border-terminal-border p-12 text-center">
                <Icon name="GitBranch" className="text-terminal-muted mx-auto mb-4" size={48} />
                <p className="text-terminal-muted">Select a project to view timeline</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;