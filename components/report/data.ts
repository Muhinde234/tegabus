const mockData = {
  overview: {
    totalEarnings: 120000,
    earningsGrowth: 7,
    todayBookings: 3653,
    bookingsIncrease: 5,
    successfulDepartures: 140,
    totalDepartures: 220,
    efficiency: 5,
    routesCovered: 18,
    activeRoutes: 15,
    passengerSatisfaction: 92,
    incidentReports: 3,
  },
  earningsData: [
    { date: "Jun 1", earnings: 50000, bookings: 2800 },
    { date: "Jun 8", earnings: 65000, bookings: 3100 },
    { date: "Jun 15", earnings: 85000, bookings: 3400 },
    { date: "Jun 22", earnings: 95000, bookings: 3500 },
    { date: "Jun 30", earnings: 120000, bookings: 3653 },
  ],
  bookingStatus: [
    { name: "Successful", value: 140, color: "#0B3B2E" },
    { name: "Available", value: 80, color: "#1EA17E" },
    { name: "Cancelled", value: 20, color: "#ef4444" },
    { name: "Pending", value: 35, color: "#f59e0b" },
  ],
  activeBuses: [
    { time: "6:00", active: 95, total: 120 },
    { time: "9:00", active: 115, total: 120 },
    { time: "12:00", active: 108, total: 120 },
    { time: "15:00", active: 118, total: 120 },
    { time: "18:00", active: 110, total: 120 },
    { time: "21:00", active: 85, total: 120 },
  ],
  routePerformance: [
    { name: "Kigali-Kamembe", efficiency: 95, passengers: 1200 },
    { name: "Kigali-Musanze", efficiency: 89, passengers: 1800 },
    { name: "Kigali-Rubavu", efficiency: 92, passengers: 1500 },
    { name: "Kigali-Huye", efficiency: 85, passengers: 1100 },
    { name: "Kigali-Karongi", efficiency: 78, passengers: 900 },
  ],
  passengerDemographics: [
    { name: "Students", value: 35, color: "#0B3B2E" },
    { name: "Business", value: 25, color: "#1EA17E" },
    { name: "Tourists", value: 20, color: "#3B82F6" },
    { name: "Families", value: 15, color: "#F59E0B" },
    { name: "Others", value: 5, color: "#EF4444" },
  ],
};

export default mockData