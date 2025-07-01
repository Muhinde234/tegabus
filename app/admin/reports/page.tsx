'use client';

import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  Users,
  CheckCircle,
  Download,
  Filter,
  Calendar,
  TrendingUp,
  Bus,
  Clock,
  Search,
  FileText,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for the dashboard
const mockData = {
  overview: {
    totalEarnings: 120000,
    earningsGrowth: 7,
    todayBookings: 3653,
    bookingsIncrease: 5,
    successfulDepartures: 140,
    totalDepartures: 220,
    efficiency: 5
  },
  earningsData: [
    { date: 'Jun 1', earnings: 50000, bookings: 2800 },
    { date: 'Jun 8', earnings: 65000, bookings: 3100 },
    { date: 'Jun 15', earnings: 85000, bookings: 3400 },
    { date: 'Jun 22', earnings: 95000, bookings: 3500 },
    { date: 'Jun 30', earnings: 120000, bookings: 3653 }
  ],
  bookingStatus: [
    { name: 'Successful', value: 140, color: '#0B3B2E' },
    { name: 'Available', value: 80, color: '#1EA17E' },
    { name: 'Cancelled', value: 20, color: '#ef4444' },
    { name: 'Pending', value: 35, color: '#f59e0b' }
  ],
  activeBuses: [
    { time: '6:00', active: 95, total: 120 },
    { time: '9:00', active: 115, total: 120 },
    { time: '12:00', active: 108, total: 120 },
    { time: '15:00', active: 118, total: 120 },
    { time: '18:00', active: 110, total: 120 },
    { time: '21:00', active: 85, total: 120 }
  ]
};

export default function TegabusReportDashboard() {
  const [dateRange, setDateRange] = useState('7d');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter data based on selections
  const filteredData = useMemo(() => {
    let data = { ...mockData };

    if (dateRange === '1d') {
      data.earningsData = data.earningsData.slice(-1);
    } else if (dateRange === '7d') {
      data.earningsData = data.earningsData.slice(-2);
    }

    return data;
  }, [dateRange, filterType]);

  const exportToPDF = () => {
    // Mock PDF export
    alert('PDF export functionality would be implemented here');
  };

  const exportToCSV = () => {
    // Mock CSV export
    const csvData = filteredData.earningsData.map(row =>
      `${row.date},${row.earnings},${row.bookings}`
    ).join('\n');

    const blob = new Blob([`Date,Earnings,Bookings\n${csvData}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tegabus-report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  type StatCardProps = {
    icon: React.ElementType;
    title: string;
    value: string | number;
    change: number;
    changeType?: 'positive' | 'negative';
  };

  const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, change, changeType = 'positive' }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${changeType === 'positive' ? 'bg-gradient-to-br from-green-50 to-green-100' : 'bg-gradient-to-br from-blue-50 to-blue-100'}`}>
          <Icon className={`w-6 h-6 ${changeType === 'positive' ? 'text-green-700' : 'text-blue-700'}`} />
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${changeType === 'positive'
          ? 'bg-green-100 text-green-700'
          : 'bg-blue-100 text-blue-700'
          }`}>
          <TrendingUp className="w-3 h-3" />
          <span>+{change}%</span>
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  type ChartCardProps = {
    title: string;
    children: React.ReactNode;
    className?: string;
  };

  const ChartCard: React.FC<ChartCardProps> = ({ title, children, className = "" }) => (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-green-600" />
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Tegabus Operations Report
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                June 30, 2025, 01:03 PM CAT
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex gap-2">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                >
                  <option value="1d">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Data</option>
                  <option value="bookings">Bookings Only</option>
                  <option value="revenue">Revenue Only</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                  CSV
                </button>
                <button
                  onClick={exportToPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg shadow-sm transition-colors duration-200"
                >
                  <FileText className="w-4 h-4" />
                  PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={DollarSign}
            title="Total Earnings"
            value={`${filteredData.overview.totalEarnings.toLocaleString()} RWF`}
            change={filteredData.overview.earningsGrowth}
          />
          <StatCard
            icon={Users}
            title="Today's Bookings"
            value={filteredData.overview.todayBookings.toLocaleString()}
            change={filteredData.overview.bookingsIncrease}
          />
          <StatCard
            icon={CheckCircle}
            title="Successful Departures"
            value={`${filteredData.overview.successfulDepartures}/${filteredData.overview.totalDepartures}`}
            change={filteredData.overview.efficiency}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {/* Earnings Trend */}
          <ChartCard title="Revenue & Bookings Trend" className="xl:col-span-2">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData.earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis yAxisId="earnings" orientation="left" stroke="#0B3B2E" />
                <YAxis yAxisId="bookings" orientation="right" stroke="#1EA17E" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Line
                  yAxisId="earnings"
                  type="monotone"
                  dataKey="earnings"
                  stroke="#0B3B2E"
                  strokeWidth={3}
                  dot={{ fill: '#0B3B2E', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#0B3B2E', strokeWidth: 2 }}
                  name="Earnings (RWF)"
                />
                <Line
                  yAxisId="bookings"
                  type="monotone"
                  dataKey="bookings"
                  stroke="#1EA17E"
                  strokeWidth={3}
                  dot={{ fill: '#1EA17E', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#1EA17E', strokeWidth: 2 }}
                  name="Bookings"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Booking Status */}
          <ChartCard title="Booking Status Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={filteredData.bookingStatus}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value, percent }) => `${name}: ${value} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                >
                  {filteredData.bookingStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Active Buses */}
          <ChartCard title="Active Buses Throughout Day">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData.activeBuses}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar
                  dataKey="active"
                  fill="url(#activeGradient)"
                  radius={[4, 4, 0, 0]}
                  name="Active Buses"
                />
                <defs>
                  <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0B3B2E" />
                    <stop offset="100%" stopColor="#1EA17E" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Summary Footer */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Bus className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Fleet Utilization</h4>
              <p className="text-2xl font-bold text-green-600">92%</p>
              <p className="text-sm text-gray-600">120 buses active</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Growth Rate</h4>
              <p className="text-2xl font-bold text-green-600">+12%</p>
              <p className="text-sm text-gray-600">vs last month</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">On-Time Performance</h4>
              <p className="text-2xl font-bold text-green-600">94.5%</p>
              <p className="text-sm text-gray-600">above target</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}