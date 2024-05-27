import "./App.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "components/LoginPage";
import HomePage from "components/HomePage";

const Home = () => {
  return <div>Home</div>;
};
function App() {
  return (
    <div className="App">
      <h1> Hello World </h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
