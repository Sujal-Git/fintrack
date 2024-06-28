import './App.css'
import Home from './components/Home'
import SignIn from './components/SignIn'
import {Routes,Route,Link} from 'react-router-dom'
import Signup from './components/SignUp'
import Dashboard from './components/Dashboard'
import SignOut from './components/SignOut'
function App() {
  

  return (
    <>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route  path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/signout' element={<SignOut/>}/>
      

    </Routes>
      
    </>
  )
}

export default App
