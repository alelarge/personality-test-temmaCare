import React, { useEffect } from 'react'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { Link, Navigate } from 'react-router-dom'
import Header from '../../components/Header'
import "./TestResult.less"
import { deleteTestResult } from '../Test/TestSlice'


function TestResult() {
  const dispatch:AppDispatch = useDispatch()
  const testResult = useSelector((state:RootState) => state.test.testResult)


  useEffect(() => {
    return () => {
      dispatch(deleteTestResult())
    }
  }, [])
  

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
