
import { Route, Routes } from "react-router";
import About from '../pages/about'
import FocusFlow from '../pages/home'
import Contacts from '../pages/contacts';
import Stats from '../pages/stats';

const Navigation = () => {
  return (
    <> 
    <Routes>
      <Route path='/' element={<FocusFlow />}/>
      <Route path='/stats' element={<Stats />}/>      
      <Route path='/about' element={<About />}/>
      <Route path='/contacts' element={<Contacts />}/>
    </Routes>
    </>
  )
}



export default Navigation