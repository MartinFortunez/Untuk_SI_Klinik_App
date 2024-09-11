import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardAdmin from "./pages/DashboardAdmin";
import Dashboard from "./components/common/admin/dashboard/Dashboard";
import DoctorsSchedule from "./components/common/admin/doctorsSchedule/DoctorsSchedule";
import PatientReminder from "./components/common/admin/patientReminder/PatientReminder";
import History from "./components/common/admin/history/History";
import Doctor from "./components/common/admin/doctor/Doctor";
import PatientReviews from "./components/common/admin/patientReviews/PatientReviews";
import Facilities from "./components/common/admin/facilities/Facilities";
import IncomingConsultation from "./components/common/admin/incomingConsultation/IncomingConsultation";
import "normalize.css";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";

// import dotenv from "dotenv";

// dotenv.config();

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<DashboardAdmin />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="jadwal-dokter" element={<DoctorsSchedule />} />
            <Route path="konsultasi-masuk" element={<IncomingConsultation />} />
            <Route path="reminder-pasien" element={<PatientReminder />} />
            <Route path="riwayat" element={<History />} />
            <Route path="dokter" element={<Doctor />} />
            <Route path="ulasan-pasien" element={<PatientReviews />} />
            <Route path="fasilitas" element={<Facilities />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
