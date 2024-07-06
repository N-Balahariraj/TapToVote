// Libraries
import react, {useState} from "react";

// Components
import Events from "./Components/Events";
import People from "./Components/People";
import Account from "./Components/Account";

// Style Sheets 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const[selPg,setSelPg] = useState('Events')
  return (
    <main>
      <Account selPg={selPg} setSelPg={setSelPg}/>
      <Events selPg={selPg} setSelPg={setSelPg}/>
      <People selPg={selPg} setSelPg={setSelPg}/>
    </main>
  );
}

export default App;
