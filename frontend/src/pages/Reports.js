import React from 'react';
import Layout from '../components/Layout';
import Card, { CardBody, CardHeader } from '../components/Card';
import StatCard from '../components/StatCard';
import { FiTrendingUp, FiUsers, FiCheckCircle, FiClock } from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const Reports = () => {
  const taskData = [
    { name: 'Jan', completed: 24, pending: 13, inProgress: 15 },
    { name: 'Feb', completed: 28, pending: 10, inProgress: 12 },
    { name: 'Mar', completed: 32, pending: 8, inProgress: 14 },
    { name: 'Apr', completed: 35, pending: 6, inProgress: 11 },
    { name: 'May', completed: 40, pending: 5, inProgress: 9 },
    { name: 'Jun', completed: 45, pending: 3, inProgress: 8 },
  ];

  const teamData = [
    { name: 'Jan', tasks: 52, avgTime: 2.5 },
    { name: 'Feb', tasks: 50, avgTime: 2.3 },
    { name: 'Mar', tasks: 61, avgTime: 2.1 },
    { name: 'Apr', tasks: 62, avgTime: 2.0 },
    { name: 'May', tasks: 54, avgTime: 1.8 },
    { name: 'Jun', tasks: 56, avgTime: 1.7 },
  ];

  return (
    <Layout title="Reports">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-dark-50 mb-2">
            Reports
          </h1>
          <p className="text-dark-600 dark:text-dark-400">
            Analytics and performance metrics.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Tasks Completed" value="145" icon={FiCheckCircle} change={12} />
          <StatCard title="Team Members" value="8" icon={FiUsers} change={0} />
          <StatCard title="Avg Completion" value="2.1 days" icon={FiClock} change={-15} trend="down" />
          <StatCard title="Performance" value="92%" icon={FiTrendingUp} change={8} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Status Chart */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-dark-900 dark:text-dark-50">
                Task Status Trend
              </h3>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={taskData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#10B981" name="Completed" />
                  <Bar dataKey="inProgress" fill="#F59E0B" name="In Progress" />
                  <Bar dataKey="pending" fill="#D1D5DB" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          {/* Team Performance Chart */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-dark-900 dark:text-dark-50">
                Team Productivity
              </h3>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={teamData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="tasks"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Tasks Completed"
                  />
                  <Line
                    type="monotone"
                    dataKey="avgTime"
                    stroke="#10B981"
                    strokeWidth={2}
                    name="Avg Time (days)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;