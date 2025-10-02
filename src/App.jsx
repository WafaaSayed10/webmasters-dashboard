import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/dashboard'
import Layout from './components/shared/layout';
import Customers from './pages/customers';
import Login from './pages/Login';
import Products from './pages/products';
import Orders from './pages/orders';
import { HelmetProvider } from 'react-helmet-async';
import Messages from './pages/messages';
import AddItemModal from './pages/AddItem';
import Register from './pages/Register';
import CreationSuccess from './components/CreationSuccess'
import UpdateItem from './pages/UpdateItem'
import AddOrder from './pages/AddOrder';
import UpdateOrder from './pages/UpdateOrder'
import OrderSuccess from './components/OrderSuccess'
import { MenuProvider } from './context/menuContext';
import {InfoProvider} from './context/dashInfoContext'
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <>
    <HelmetProvider>
      <MenuProvider>
      <InfoProvider>
        <SearchProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path='customers' element={<Customers />} />
              <Route path='products' element={<Products />} />
              <Route path='orders' element={<Orders />} />
              <Route path='messages' element={<Messages />} />
              <Route path='addItem' element={<AddItemModal />} />
              <Route path='product/:id/edit' element={<UpdateItem />} />
              <Route path='order/:id/edit' element={<UpdateOrder />} />
              <Route path='creation-success' element={<CreationSuccess />} />
              <Route path='order-success' element={<OrderSuccess />} />
              <Route path='AddOrder' element={<AddOrder />} />
            </Route>
            <Route path='login' element={<Login />}/>
            <Route path='register' element={<Register />}/>
          </Routes>
        </Router>
        </SearchProvider>
      </InfoProvider>
      </MenuProvider>
      </HelmetProvider>
    </>
  )
}

export default App
