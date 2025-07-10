"use client";

import React, { useState, useMemo } from "react";
import avatar from "@/public/images/avatar.png";
import {
  DollarSign,
  Users,
  CheckCircle,
  Download,
  Clock,
  FileText,
  Bell,
  MapPin,
  Ticket,
  Route,
  AlertCircle,
  UserCheck,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import Image from "next/image";
import { Greeting } from "@/components/greeting";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import mockData from "@/components/report/data";
import StatCard from "@/components/report/statCard";
import ChartCard from "@/components/report/chartCard";
import MetricCard from "@/components/report/metricCard";
import TrendingCard from "@/components/report/trendingCard";

export default function ReportDashboard() {
  const [dateRange, setDateRange] = useState("7d");
  const [filterType, setFilterType] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  const filteredData = useMemo(() => {
    const data = { ...mockData };

    if (dateRange === "1d") {
      data.earningsData = data.earningsData.slice(-1);
    } else if (dateRange === "7d") {
      data.earningsData = data.earningsData.slice(-2);
    }

    return data;
  }, [dateRange]);

  const exportToPDF = () => {
    alert("PDF export functionality would be implemented here");
  };

  const exportToCSV = () => {
    const csvData = filteredData.earningsData
      .map((row) => `${row.date},${row.earnings},${row.bookings}`)
      .join("\n");

    const blob = new Blob([`Date,Earnings,Bookings\n${csvData}`], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tegabus-report.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 ">
      <div>
        <div className="flex justify-between">
          <Greeting />

          <div className="flex items-center gap-2 shrink-0 order-2 md:order-3 mb-8">
            <Button
              variant="ghost"
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-100 transition-colors"
            >
              <Bell size={20} className="text-gray-600" />
            </Button>

            <div className="flex items-center gap-2 bg-gray-200 hover:bg-gray-200 rounded-full pl-2 pr-3 py-1 transition-colors cursor-pointer">
              <Image
                src={avatar}
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
                alt="User avatar"
                width={32}
                height={32}
              />
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Dositha
              </span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Tegabus Operations Report
              </h1>
              <p className="text-gray-500 text-sm flex gap-2">
                <Clock className="w-5 h-5 text-green-500" />
                Today is{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex gap-2">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="rounded-full border border-green-400">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1d">Last 24 Hours</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="rounded-full border border-green-400">
                    <SelectValue placeholder="Filter Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Data</SelectItem>
                    <SelectItem value="bookings">Bookings Only</SelectItem>
                    <SelectItem value="revenue">Revenue Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-green-900 hover:bg-green-700 text-white rounded-full transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                  CSV
                </Button>
                <Button
                  onClick={exportToPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-green-900 hover:bg-green-700 text-white rounded-full transition-colors duration-200"
                >
                  <FileText className="w-4 h-4" />
                  PDF
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <Button
            variant="ghost"
            className={`px-4 py-2 font-medium text-sm ${activeTab === "overview"
                ? "text-green-600 border-b-4 border-green-900"
                : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </Button>
          <Button
            variant="ghost"
            className={`px-4 py-2 font-medium text-sm ${activeTab === "routes"
                ? "text-green-600 border-b-4 border-green-600"
                : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => setActiveTab("routes")}
          >
            Routes
          </Button>
          <Button
            variant="ghost"
            className={`px-4 py-2 font-medium text-sm ${activeTab === "passengers"
                ? "text-green-600 border-b-4 border-green-600"
                : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => setActiveTab("passengers")}
          >
            Passengers
          </Button>
        </div>

        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <StatCard
                icon={Route}
                title="Active Routes"
                value={`${filteredData.overview.activeRoutes}/${filteredData.overview.routesCovered}`}
                change={3} // Sample growth percentage
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
              <ChartCard
                title="Revenue & Bookings Trend"
                className="xl:col-span-2"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={filteredData.earningsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#666" />
                    <YAxis
                      yAxisId="earnings"
                      orientation="left"
                      stroke="#0B3B2E"
                    />
                    <YAxis
                      yAxisId="bookings"
                      orientation="right"
                      stroke="#1EA17E"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="earnings"
                      type="monotone"
                      dataKey="earnings"
                      stroke="#0B3B2E"
                      strokeWidth={3}
                      dot={{ fill: "#0B3B2E", strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: "#0B3B2E", strokeWidth: 2 }}
                      name="Earnings (RWF)"
                    />
                    <Line
                      yAxisId="bookings"
                      type="monotone"
                      dataKey="bookings"
                      stroke="#1EA17E"
                      strokeWidth={3}
                      dot={{ fill: "#1EA17E", strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: "#1EA17E", strokeWidth: 2 }}
                      name="Bookings"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Booking Status Distribution">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={filteredData.bookingStatus}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value, percent }) =>
                        `${name}: ${value} (${((percent ?? 0) * 100).toFixed(
                          0
                        )}%)`
                      }
                    >
                      {filteredData.bookingStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Active Buses Throughout Day">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={filteredData.activeBuses}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="active"
                      fill="url(#activeGradient)"
                      radius={[4, 4, 0, 0]}
                      name="Active Buses"
                    />
                    <defs>
                      <linearGradient
                        id="activeGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#0B3B2E" />
                        <stop offset="100%" stopColor="#1EA17E" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                icon={MapPin}
                title="Routes Covered"
                value={filteredData.overview.routesCovered}
                description="Total operational routes"
              />
              <MetricCard
                icon={UserCheck}
                title="Passenger Satisfaction"
                value={`${filteredData.overview.passengerSatisfaction}%`}
                description="Based on recent surveys"
              />
              <MetricCard
                icon={AlertCircle}
                title="Incident Reports"
                value={filteredData.overview.incidentReports}
                description="This month"
                className="bg-red-50 border-red-100"
              />
              <MetricCard
                icon={Ticket}
                title="Average Occupancy"
                value="78%"
                description="Across all routes"
              />
            </div>
          </>
        )}

        {activeTab === "routes" && (
          <div className="grid gap-6">
            <ChartCard
              title="Route Performance"
              className="xl:col-span-2"
              action={
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="efficiency">Efficiency</SelectItem>
                    <SelectItem value="passengers">Passengers</SelectItem>
                  </SelectContent>
                </Select>
              }
            >
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={[...filteredData.routePerformance].sort(
                    (a, b) => b.efficiency - a.efficiency
                  )}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#666" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={150}
                    stroke="#666"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="efficiency"
                    fill="#0B3B2E"
                    name="Efficiency (%)"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartCard title="Route Utilization">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={[
                      { name: "Mon", value: 78 },
                      { name: "Tue", value: 85 },
                      { name: "Wed", value: 82 },
                      { name: "Thu", value: 89 },
                      { name: "Fri", value: 92 },
                      { name: "Sat", value: 75 },
                      { name: "Sun", value: 68 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#0B3B2E"
                      fill="#0B3B2E"
                      fillOpacity={0.2}
                      name="Utilization (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Route Popularity" >
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={filteredData.routePerformance
                        .map((route) => ({
                          name: route.name,
                          value: route.passengers,
                          color: `#${Math.floor(
                            Math.random() * 16777215
                          ).toString(16)}`,
                        }))
                        .slice(0, 5)}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} (${percent ? (percent * 100).toFixed(0) : 0}%)`
                      }
                    >
                      {filteredData.routePerformance
                        .slice(0, 5)
                        .map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={`#${Math.floor(
                              Math.random() * 16777215
                            ).toString(16)}`}
                          />
                        ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        )}

        {activeTab === "passengers" && (
          <div className="grid gap-6">
            <ChartCard title="Passenger Demographics">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={filteredData.passengerDemographics}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} (${percent ? (percent * 100).toFixed(0) : 0}%)`
                    }
                  >
                    {filteredData.passengerDemographics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartCard title="Passenger Growth">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={[
                      { month: "Jan", passengers: 12000 },
                      { month: "Feb", passengers: 15000 },
                      { month: "Mar", passengers: 18000 },
                      { month: "Apr", passengers: 21000 },
                      { month: "May", passengers: 25000 },
                      { month: "Jun", passengers: 30000 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="passengers"
                      stroke="#0B3B2E"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Passengers"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Peak Travel Times">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { hour: "6-9 AM", passengers: 4500 },
                      { hour: "9-12 PM", passengers: 3200 },
                      { hour: "12-3 PM", passengers: 2800 },
                      { hour: "3-6 PM", passengers: 5200 },
                      { hour: "6-9 PM", passengers: 3800 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="hour" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="passengers"
                      fill="#0B3B2E"
                      radius={[4, 4, 0, 0]}
                      name="Passengers"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        )}

        <TrendingCard />
      </div>
    </div>
  );
}
