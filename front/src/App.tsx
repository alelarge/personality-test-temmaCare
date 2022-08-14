import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './screens/home/Home'
import Test from './screens/test/Test'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test/:testId" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
