import { Button, notification, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
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


function Test() {
  const { testId } = useParams()
  const dispatch:AppDispatch = useDispatch()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const questions = useSelector((state:RootState) => state.test.questions)
  const testTitle = useSelector((state:RootState) => state.test.title)


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


  function selectResponse(questionNumber: string, letter: string) {
    setAnswers({...answers, ...{ [questionNumber]: letter }})
  }


  function submitResponse() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
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
      <h2>{testTitle}</h2>
      {questions.map((question, index) => {
        return (
          <div key={question.number} hidden={index !== currentQuestion}>
            <>
              <h4>{question.number} {question.questionText}</h4>
              <Radio.Group onChange={letter => selectResponse(question.number, letter.target.value)}
                value={answers[question.number]}
              >
                {question.responses.map((response) => {
                  return (
                    <Radio value={response.letter} key={`${question.number}${response.letter}`}>
                      <div>{response.letter}</div>
                      <div>{response.responseText}</div>
                    </Radio>
                  )
                })}
              </Radio.Group>

              <div>
                {index > 0 && (
                  <Button onClick={showPreviousQuestion}>Previous question</Button>
                )}
                <Button onClick={submitResponse}>
                  {currentQuestion < questions.length - 1 ? "Submit" : "Submit test"}
                </Button>
              </div>
            </>
          </div>
        )
      })}
    </div>
  )
}

export default Test
