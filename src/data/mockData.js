export const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", active: true },
  { id: "history", label: "History", icon: "History" },
  { id: "calendar", label: "Calendar", icon: "Calendar" },
  { id: "appointments", label: "Appointments", icon: "Clock" },
  { id: "statistics", label: "Statistics", icon: "BarChart3" },
  { id: "tests", label: "Tests", icon: "FileText" },
  { id: "chat", label: "Chat", icon: "MessageCircle" },
  { id: "support", label: "Support", icon: "HelpCircle" },
  { id: "setting", label: "Setting", icon: "Settings" },
]

export const healthIndicators = [
  {
    id: "heart",
    label: "Healthy Heart",
    status: "healthy",
    position: { top: "25%", left: "45%" },
    color: "#4F46E5",
  },
  {
    id: "leg",
    label: "Healthy Leg",
    status: "healthy",
    position: { top: "70%", left: "35%" },
    color: "#06B6D4",
  },
]

export const healthStatusCards = [
  {
    id: "lungs",
    title: "Lungs",
    date: "26 Oct 2021",
    progress: 85,
    status: "warning",
    icon: "🫁",
    color: "#EF4444",
  },
  {
    id: "teeth",
    title: "Teeth",
    date: "26 Oct 2021",
    progress: 92,
    status: "good",
    icon: "🦷",
    color: "#10B981",
  },
  {
    id: "bone",
    title: "Bone",
    date: "26 Oct 2021",
    progress: 78,
    status: "warning",
    icon: "🦴",
    color: "#F59E0B",
  },
]

export const calendarData = {
  month: "October",
  year: 2021,
  days: [
    { date: 25, appointments: ["10:00", "11:00", "12:00"] },
    { date: 26, appointments: ["08:00", "09:00", "10:00"] },
    { date: 27, appointments: ["12:00", "13:00"] },
    { date: 28, appointments: ["10:00", "11:00"] },
    { date: 29, appointments: ["14:00", "16:00"] },
    { date: 30, appointments: ["12:00", "14:00", "15:00"] },
    { date: 31, appointments: ["09:00", "10:00", "11:00"] },
  ],
}

export const appointmentCards = [
  {
    id: "dentist",
    title: "Dentist",
    time: "09:00-11:00",
    doctor: "Dr. Cameron Williamson",
    type: "dentist",
    color: "#4F46E5",
  },
  {
    id: "physiotherapy",
    title: "Physiotherapy Appointment",
    time: "11:00-12:00",
    doctor: "Dr. Kevin Djones",
    type: "physiotherapy",
    color: "#8B5CF6",
  },
]

export const upcomingSchedule = [
  {
    day: "Thursday",
    appointments: [
      {
        id: "checkup",
        title: "Health checkup complete",
        time: "11:00 AM",
        icon: "📋",
        color: "#E0E7FF",
      },
      {
        id: "ophthalmologist",
        title: "Ophthalmologist",
        time: "14:00 PM",
        icon: "👁️",
        color: "#FEF3C7",
      },
    ],
  },
  {
    day: "Saturday",
    appointments: [
      {
        id: "cardiologist",
        title: "Cardiologist",
        time: "12:00 AM",
        icon: "❤️",
        color: "#FECACA",
      },
      {
        id: "neurologist",
        title: "Neurologist",
        time: "16:00 PM",
        icon: "🧠",
        color: "#E0E7FF",
      },
    ],
  },
]

export const activityData = {
  weeklyAppointments: 3,
  chartData: {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Appointments",
        data: [2, 3, 1, 4, 2, 3, 1],
        backgroundColor: ["#06B6D4", "#4F46E5", "#06B6D4", "#4F46E5", "#06B6D4", "#4F46E5", "#06B6D4"],
        borderRadius: 4,
        barThickness: 8,
      },
    ],
  },
}
