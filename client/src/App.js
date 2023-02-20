import { Route, Routes } from "react-router-dom";
import RequireUser from "./Components/RequireUser";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";

function App() {
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  return (
    <div className="App">
      <Routes>
        <Route element={<RequireUser />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
