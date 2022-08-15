import React from 'react'
import { Button } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Link, Navigate } from 'react-router-dom'
import Header from '../../components/Header'
import "./TestResult.less"


function TestResult() {
  const testResult = useSelector((state:RootState) => state.test.testResult)


  return (
    <>
      {testResult && (<div>
        <Header/>
          <div className="test_result-container">
            <h1>{testResult}</h1>
            <Button><Link to="/">Back to homepage</Link></Button>
          </div>
        </div>
      )}

      {!testResult && <Navigate to="/"/>}
    </>
  )
}

export default TestResult
