import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Coin from "./components/Coin";
import Exchange from "./components/Exchange";
import CoinDetails from "./components/CoinDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/coins" element={<Coin/>}/>
          <Route path="/exchanges" element={<Exchange/>}/>
          <Route path="/coin/:id" element={<CoinDetails/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
