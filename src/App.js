import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './component/Header'
import Viewstudent from './page/Viewstudent'
import About from './page/About'
import Contact from './page/Contact'
import Home from './page/Home'
import'./App.css'
import Updatestudent from './page/Updatestudent'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/students" element={<Viewstudent />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="/update/:id" element={<Updatestudent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App