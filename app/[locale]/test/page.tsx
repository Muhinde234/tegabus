import React from 'react';
import { useTranslations } from "next-intl";

const TestPage = () => {
  const systemSettings = useTranslations("systemSettings");
  const navigation = useTranslations("navigation");
  const dashboard = useTranslations("dashboard");
  const settings = useTranslations("settings");
  const support = useTranslations("support");
  const users = useTranslations("users");
  const reports = useTranslations("reports");
  const routes = useTranslations("routes");
  const schedules = useTranslations("schedules");

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Translation Test Page</h1>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Navigation:</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>Home: {navigation("home")}</p>
          <p>About: {navigation("about")}</p>
          <p>Routes: {navigation("routes")}</p>
          <p>Terms: {navigation("conditions")}</p>
          <p>Get Started: {navigation("getStarted")}</p>
          <p>Notifications: {navigation("notifications")}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Dashboard:</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>Greeting: {dashboard("greeting")}</p>
          <p>Welcome Back: {dashboard("welcomeBack")}</p>
          <p>Total Earnings: {dashboard("totalEarnings")}</p>
          <p>Today's Bookings: {dashboard("todaysBookings")}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Settings:</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>Title: {settings("title")}</p>
          <p>Profile Tab: {settings("tabs.profile")}</p>
          <p>Full Name: {settings("profile.fullName")}</p>
          <p>Save Settings: {settings("actions.saveSettings")}</p>
          <p>Edit: {systemSettings("actions.edit")}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Support:</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>Title: {support("title")}</p>
          <p>Technical Support: {support("contact.technicalSupport")}</p>
          <p>Emergency Support: {support("emergencySupport")}</p>
          <p>Submit Ticket: {support("contact.submitTechnicalTicket")}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Users:</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>Title: {users("title")}</p>
          <p>Passengers: {users("stats.passengers")}</p>
          <p>Administrator: {users("stats.administrator")}</p>
          <p>First Name: {users("table.firstName")}</p>
          <p>Admin Role: {users("roles.admin")}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Reports:</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>Title: {reports("title")}</p>
          <p>Overview Tab: {reports("tabs.overview")}</p>
          <p>Total Earnings: {reports("overview.totalEarnings")}</p>
          <p>Export CSV: {reports("exportButtons.csv")}</p>
          <p>Today Is: {reports("todayIs")}</p>
          <p>Last 7 Days: {reports("dateRanges.last7Days")}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Routes:</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>Title: {routes("title")}</p>
          <p>From: {routes("table.from")}</p>
          <p>To: {routes("table.to")}</p>
          <p>Price: {routes("table.price")}</p>
          <p>No Routes Found: {routes("noRoutesFound")}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Schedules:</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>Title: {schedules("title")}</p>
          <p>All Filter: {schedules("filters.all")}</p>
          <p>On Time: {schedules("status.onTime")}</p>
          <p>Bus Number: {schedules("table.busNumber")}</p>
          <p>Driver: {schedules("table.driver")}</p>
          <p>Today: {schedules("timeFrames.today")}</p>
        </div>
      </div>
    </div>
  );
};

export default TestPage;