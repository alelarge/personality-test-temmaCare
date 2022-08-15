import { Button, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../../store'
import {
  Answers,
  fetchTest,
  fetchQuestions, 
  submitTest,
  idleFetchQuestionsStatus, 
  idleFetchTestStatus, 
  idleSubmitTestStatus, 
  deleteTestResult
} from './TestSlice'
import "./Test.less"
import Header from '../../components/Header'


function Test() {
  const { testId } = useParams()
  const dispatch:AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const questions = useSelector((state:RootState) => state.test.questions)
  const testTitle = useSelector((state:RootState) => state.test.title)
  const testResult = useSelector((state:RootState) => state.test.testResult)


  useEffect(() => {
    dispatch(deleteTestResult())
    if (testId) {
      dispatch(fetchTest({ testId }))
      dispatch(fetchQuestions({ testId }))
    }

    return () => {
      dispatch(idleFetchTestStatus())
      dispatch(idleFetchQuestionsStatus())
      dispatch(idleSubmitTestStatus())
    }
  }, [])


  useEffect(() => {
    if (testResult) {
      navigate(`/test/${testId}/result`)
    }
  }, [testResult])


  function selectResponse(questionNumber: string, letter: string) {
    setAnswers({...answers, ...{ [questionNumber]: letter }})
  }


  function submitResponse() {
    if (currentQuestion < questions.length - 1) {
      if (answers[questions[currentQuestion].number]) {
        setCurrentQuestion(currentQuestion + 1)
      }
    }
    else {
      if (testId) {
        dispatch(submitTest({ testId, answers }))
      }
    }
  }


  function showPreviousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }


  return (
    <div>
      <Header/>
      <div className="test-container">
        <h2>{testTitle}</h2>
        {questions.map((question, index) => {
          return (
            <div key={question.number} hidden={index !== currentQuestion}>
              <>
                <h4>{question.number} {question.questionText}</h4>
                <Radio.Group 
                  className="test-responses"
                  onChange={letter => selectResponse(question.number, letter.target.value)}
                  value={answers[question.number]}
                >
                  {question.responses.map((response) => {
                    return (
                      <Radio value={response.letter} 
                        key={`${question.number}${response.letter}`}
                        className="test-response"
                      >
                        <strong className='mr-05rem'>{response.letter}</strong>
                        <span>{response.responseText}</span>
                      </Radio>
                    )
                  })}
                </Radio.Group>

                <div className="actions">
                  <Button onClick={submitResponse} disabled={!answers[questions[currentQuestion].number]}>
                    {currentQuestion < questions.length - 1 ? "Submit" : "Submit test"}
                  </Button>
                  {index > 0 && (
                    <Button onClick={showPreviousQuestion}>Previous question</Button>
                  )}
                </div>
              </>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Test
