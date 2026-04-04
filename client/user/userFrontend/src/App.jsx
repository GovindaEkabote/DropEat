import React from 'react'
import Menubar from './components/Menubar/menubar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import ContactUs from './pages/Contact US/ContactUs'
import ExploreFood from './pages/Explore Food/ExploreFood'
import ViewFoods from './pages/ViewFoods/ViewFoods'


const App = () => {
  return (
    <div>
      <Menubar />
     
      <Routes>
        <Route  path='/' element={<Home />}/>
        <Route  path='/contace' element={<ContactUs />}/>
        <Route  path='/expolore' element={<ExploreFood />}/>
        <Route path='/food/:id' element={<ViewFoods />} />
      </Routes>
    </div>
  )
}

export default App