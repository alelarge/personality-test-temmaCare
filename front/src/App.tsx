import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './screens/Home/Home'
import Test from './screens/Test/Test'
import TestResult from './screens/TestResult/TestResult'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test/:testId" element={<Test />} />
          <Route path="/test/:testId/result" element={<TestResult />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
