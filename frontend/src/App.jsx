import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/noteDetailPage'


export default function App() {
  return (
    <div className='relative h-full w-full'>
  <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24" 
       style={{
         background: 'radial-gradient(125% 125% at 50% 10%, #000 60%, #00FF9D40 100%)'
       }}
  />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/create' element={<CreatePage/>} />
        <Route path='/note/:id' element={<NoteDetailPage/>} />
      </Routes>
    </div>
  )
}
