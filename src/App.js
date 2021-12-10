import './App.css';
import Navigation from './components/Navigation';
import Home from './views/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Parameters from './views/Parameters';
import Stocks from './views/Stocks';
import Ingredients from './views/Ingredients';

function App() {
  return (
    <div className="App">
      <Router>
      <Navigation/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/ingredients" element={<Ingredients/>}/>
          <Route path="/stocks" element={<Stocks/>}/>
          <Route path="/parametres" element={<Parameters/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
