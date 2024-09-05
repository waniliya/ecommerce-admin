
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './components/auth/Login'
import AddProduct from './pages/AddProduct';
import ListOrderPage from './pages/ListOrderPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listorder" element={<ListOrderPage />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
