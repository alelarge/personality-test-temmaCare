import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


type FetchStatus = "idle" | "loading" | "success" | "fail"


export interface Answers {
  [questionNumber:string]: string
}


interface State {
  title?: string
  questions: {
    number: string
    questionText: string
    responses: {
      letter: string
      responseText: string
    }[]
  }[]
  testResult?: string
  fetchTestStatus: FetchStatus
  fetchQuestionsStatus: FetchStatus
  submitTestStatus: FetchStatus
}


const initialState: State = {
  questions: [],
  fetchTestStatus: "idle",
  fetchQuestionsStatus: "idle",
  submitTestStatus: "idle",
}


export const fetchTest = createAsyncThunk(
  'test/fetchTest',
  async ({ testId }: { testId: string }) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/tests/${testId}`, 
      { method: 'GET' }
    )

    if (!response.ok) {
      throw new Error("Cannot fetch test")
    }

    const json = await response.json()
    return json
  }
)


export const fetchQuestions = createAsyncThunk(
  'test/fetchQuestions',
  async ({ testId }: { testId: string }) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/tests/${testId}/questions?projection=with_responses`, 
      { method: 'GET' }
    )

    if (!response.ok) {
      throw new Error("Cannot fetch questions")
    }

    const json = await response.json()
    return json
  }
)


export const submitTest = createAsyncThunk(
  'test/submitTest',
  async ({ testId, answers }: { testId: string, answers: Answers }) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/tests/${testId}/submit`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      },
    )

    if (!response.ok) {
      throw new Error("Cannot submit test")
    }

    const json = await response.json()
    return json
  }
)


const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    idleFetchTestStatus: (state) => {
      state.fetchTestStatus = "idle"
    },

    idleFetchQuestionsStatus: (state) => {
      state.fetchQuestionsStatus = "idle"
    },

    deleteTestResult: (state) => {
      delete state.testResult
    },

    idleSubmitTestStatus: (state) => {
      state.submitTestStatus = "idle"
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTest.pending, (state) => {
      state.fetchTestStatus = "loading"
    })

    builder.addCase(fetchTest.fulfilled, (state, { payload }) => {
      state.fetchTestStatus = "success"
      state.title = payload.title
    })

    builder.addCase(fetchTest.rejected, (state) => {
      state.fetchTestStatus = "fail"
    })

    builder.addCase(fetchQuestions.pending, (state) => {
      state.fetchQuestionsStatus = "loading"
    })

    builder.addCase(fetchQuestions.fulfilled, (state, { payload }) => {
      state.fetchQuestionsStatus = "success"
      state.questions = payload._embedded.questions
    })

    builder.addCase(fetchQuestions.rejected, (state) => {
      state.fetchQuestionsStatus = "fail"
    })

    builder.addCase(submitTest.pending, (state) => {
      state.submitTestStatus = "loading"
    })

    builder.addCase(submitTest.fulfilled, (state, { payload }) => {
      state.submitTestStatus = "success"
      state.testResult = payload.result
    })

    builder.addCase(submitTest.rejected, (state) => {
      state.submitTestStatus = "fail"
    })
  },
})


export default testsSlice.reducer


export const {
  idleFetchTestStatus,
  idleFetchQuestionsStatus,
  deleteTestResult,
  idleSubmitTestStatus,
} = testsSlice.actions
