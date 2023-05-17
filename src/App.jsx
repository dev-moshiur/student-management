
import './app.scss';
import { useState } from 'react';
import Students from './pages/students/Students'
import TopBar from './components/topbar/Top'
import Present from './pages/present/Present'
import Attendance from './pages/attendance/Attendance'
import SingleStudent from './pages/singleStudent/SingleStudent'
import { Route, Routes } from "react-router-dom";
function App() {
  const [searched, setSearched] = useState([])
  return (
    <div className="app">
      <TopBar/>



      <div className="pages">
      <Routes>
          <Route path="/">
            <Route index element={<Present />} />
            <Route path="students" element={<Students searched={searched} setSearched={setSearched}/>} />
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
