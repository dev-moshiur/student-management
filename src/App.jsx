
import './app.scss';
import Students from './pages/students/Students'
import TopBar from './components/topbar/Top'
import Present from './pages/present/Present'
import Attendance from './pages/attendance/Attendance'
import SingleStudent from './pages/singleStudent/SingleStudent'
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="app">
      <TopBar/>



      <div className="pages">
      <Routes>
          <Route path="/">
            <Route index element={<Present />} />
            <Route path="students" element={<Students />} />
            <Route path="attendance" element={<Attendance />} />
            {/* {/* <Route path="contact" element={<Contact />} /> */}
            <Route path="single-student" element={<SingleStudent />} />
          </Route>
        </Routes>
        
      </div>
      
    
    </div>
  );
}

export default App;
