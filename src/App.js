import { BrowserRouter, Route, Routes } from "react-router-dom"; // Changed Router to Route
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";
import Navbar from "./components/Navbar";

import UserDetails from "./components/UserDetails";
function App() {
  return (
    
       <BrowserRouter>
        <Navbar />
        <Routes> 
          <Route   exact path="/" element={<Create />} />
          <Route path="/user/:id" element={<UserDetails />} />

          <Route exact path="/read" element={<Read />} />
          <Route exact  path= "/edit/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
