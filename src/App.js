import Home from './components/pages/Home';
import Shop from './components/pages/Shop';
import SignUp from './components/pages/SignUp';
import LogIn from './components/pages/LogIn';
import Dashboard from './components/pages/Dashboard';
import Profile from './components/pages/Profile';
import Cart from './components/pages/Cart';
import NotFound from './components/pages/NotFound'
import Users from './components/pages/Users';
import Products from './components/pages/Products';
import Sales from './components/pages/Sales';
import Statics from './components/pages/Statics';
import PrivateRoute from './components/pages/PrivateRoute';
import AdminRoute from './components/pages/AdminRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter as Router  , Routes , Route } from 'react-router-dom'
import {FirebaseProvider} from './components/contexts/FirebsaeContext'

function App() {
  return (
    <>
      <FirebaseProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/*' element={<NotFound />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
            <Route path='/cart' element={<PrivateRoute />}>
              <Route path='/cart' element={<Cart />} />
            </Route>
            <Route path='/log-in' element={<LogIn />} />
            <Route path='/dashboard' element={<AdminRoute />}>
              <Route path='/dashboard/users' element={<Users />} />
              <Route path='/dashboard/products:page' element={<Products />} />
              <Route path='/dashboard/sales' element={<Sales />} />
              <Route path='/dashboard/statics' element={<Statics />} />
            </Route>            
            <Route path='/sign-up' element={<SignUp />} />
          </Routes>
        </Router>
        <ToastContainer />
      </FirebaseProvider>
    </>
  );
}

export default App;
