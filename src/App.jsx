import { useState } from 'react'
import './App.css'
import Footer from './Components/Footer'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Wishlist from './Pages/Wishlist'
import Cart from './Pages/Cart'
import View from './Pages/View'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/wishlist' element={<Wishlist />}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/view/:id' element={<View></View>}></Route> 
        {/* : = url parameter aanennu manasilakkan */}
        {/* Unwanted path vannal navigate */}
        <Route path='/*' element={<Navigate to={'/'}/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
