// Libraries
import react, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Events from "./Components/Events";
import People from "./Components/People";
import Account from "./Components/Account";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import ProtectedRoute from "./Components/ProtectedRoute";

// Style Sheets 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const[selPg,setSelPg] = useState('Events')
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path="/SignIn" element={<Signin/>}></Route>
        <Route 
          path="/Home" 
          element=
          {
            <ProtectedRoute>
              {<main>
                <Account selPg={selPg} setSelPg={setSelPg}/>
                <Events selPg={selPg} setSelPg={setSelPg}/>
                <People selPg={selPg} setSelPg={setSelPg}/>
              </main>}
            </ProtectedRoute>
          }
        >
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
