import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Menu from './pages/menu/menu';
import Item from './pages/itemDetail/itemDetail';
import Dashboard from './pages/dasboard/dashboard';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/menu" element={<Menu />} />
          <Route path="//item/:id" element={<Item />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
