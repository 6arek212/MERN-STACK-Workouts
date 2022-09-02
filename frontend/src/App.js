import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//pages & componnets
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import useAuthContext from './hooks/useAuthContext';


function App() {
  const { token } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />


        <div className="pages">
          <Routes>
            <Route path='/' element={token ? <Home /> : <Navigate to='/login' />} />
            <Route path='/login' element={!token ? <Login /> : <Navigate to='/' />} />
            <Route path='/signup' element={ !token ? <Signup /> : <Navigate to='/' />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
