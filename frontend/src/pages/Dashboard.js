import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import Card, { CardBody, CardHeader } from '../components/Card';
import Badge from '../components/Badge';
import { taskAPI } from '../services/api';
import toast from 'react-hot-toast';
import { FiCheckSquare, FiClock, FiAlertCircle, FiFolder } from 'react-icons/fi';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, tasksRes] = await Promise.all([
        taskAPI.getDashboardStats(),
        taskAPI.getAll({ limit: 8 }),
      ]);
      setStats(statsRes.data);
      const taskData = Array.isArray(tasksRes.data) ? tasksRes.data : [];
      setTasks(taskData.slice(0, 8));
    } catch (error) {
      console.error('Dashboard Error:', error);
      setStats({
        total: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
        overdue: 0,
      });
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout title="Dashboard">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  const statsData = stats || {
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
  };

  const chartData = [
    { name: 'Pending', value: statsData.pending || 0, color: '#D1D5DB' },
    { name: 'In Progress', value: statsData.inProgress || 0, color: '#F59E0B' },
    { name: 'Completed', value: statsData.completed || 0, color: '#10B981' },
  ].filter(item => item.value > 0);

  const getStatusBadge = (status) => {
    const variants = {
      'Completed': 'completed',
      'In Progress': 'inprogress',
      'Pending': 'pending',
      'Overdue': 'overdue',
    };
    return variants[status] || 'pending';
  };

  const getPriorityClass = (priority) => {
    const classes = {
      'High': 'priority-high',
      'Medium': 'priority-medium',
      'Low': 'priority-low',
    };
    return classes[priority] || '';
  };

  const isOverdue = (date, status) => {
    return new Date(date) < new Date() && status !== 'Completed';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Layout title="Dashboard">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-dark-50 mb-2">
            Dashboard
          </h1>
          <p className="text-dark-600 dark:text-dark-400">
            Welcome back! Here's your task overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Projects"
            value={statsData.total || 0}
            icon={FiFolder}
            change={12}
          />
          <StatCard
            title="Total Tasks"
            value={statsData.total || 0}
            icon={FiCheckSquare}
            change={8}
          />
          <StatCard
            title="In Progress"
            value={statsData.inProgress || 0}
            icon={FiClock}
            change={-3}
            trend="down"
          />
          <StatCard
            title="Overdue"
            value={statsData.overdue || 0}
            icon={FiAlertCircle}
            change={2}
            trend="down"
          />
        </div>

        {/* Charts & Recent Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-dark-900 dark:text-dark-50">
                Task Distribution
              </h3>
            </CardHeader>
            <CardBody>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-64 flex items-center justify-center text-dark-400">
                  <p>No data available</p>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Recent Tasks */}
          <div className="lg:col-span-2 card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-dark-900 dark:text-dark-50">
                  Recent Tasks
                </h3>
                <a href="/tasks" className="text-sm text-primary-600 hover:text-primary-700">
                  View all
                </a>
              </div>
            </CardHeader>
            <CardBody>
              {tasks.length > 0 ? (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task._id}
                      className="flex items-start justify-between p-3 rounded-lg bg-dark-50 dark:bg-dark-800/50 hover:bg-dark-100 dark:hover:bg-dark-800 transition border border-dark-200 dark:border-dark-700"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-dark-900 dark:text-dark-50 truncate text-sm">
                            {task.title}
                          </p>
                          <Badge
                            variant={getPriorityClass(task.priority)}
                            className="text-xs"
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-dark-600 dark:text-dark-400">
                          <span>{task.project?.name}</span>
                          <span>•</span>
                          <span>
                            {formatDate(task.deadline)}
                            {isOverdue(task.deadline, task.status) && (
                              <span className="ml-2 text-accent-red font-medium">
                                Overdue
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                      <Badge variant={getStatusBadge(task.status)} className="text-xs whitespace-nowrap">
                        {task.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-dark-400">
                  <p>No tasks yet. Create your first task!</p>
                </div>
              )}
            </CardBody>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;