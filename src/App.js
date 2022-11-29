import './assets/css/app.scss';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import AllProducts from './pages/AllProducts';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:slug" element={<SingleProduct />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/edit-product/:productSlug" element={<EditProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
