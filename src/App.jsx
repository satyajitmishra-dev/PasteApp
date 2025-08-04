
import './App.css'
import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './components/Home'
import Pastes from './components/Pastes'
import ViewPaste from './components/ViewPaste'



function App() {

const router = createBrowserRouter(
  [
    {
      path: '/',
      element:
      <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path: 'pastes',
      element: 
      <div>
        <Navbar />
        <Pastes />
      </div>
    }, 
    {
  path: '/pastes/:id',
  element: (
    <div>
      <Navbar />
      <ViewPaste />
    </div>
  )
}
, 

  ]
)

  return (
    <>
    <RouterProvider router={router}>

    </RouterProvider>
        
    </>
  )
}

export default App
