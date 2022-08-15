import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


type FetchStatus = "idle" | "loading" | "success" | "fail"


interface State {
  tests: {}[]
  fetchTestsStatus: FetchStatus
}


const initialState: State = {
  tests: [],
  fetchTestsStatus: "idle",
}


export const fetchTests = createAsyncThunk(
  'tests/fetchTests',
  async () => {
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + '/tests', {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error("Cannot fetch tests")
    }

    const json = await response.json()
    return json
  }
)


const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    idleFetchTestsStatus: (state) => {
      state.fetchTestsStatus = "idle"
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTests.pending, (state) => {
      state.fetchTestsStatus = "loading"
    })

    builder.addCase(fetchTests.fulfilled, (state, { payload }) => {
      state.fetchTestsStatus = "success"
      state.tests = payload._embedded.tests
    })

    builder.addCase(fetchTests.rejected, (state) => {
      state.fetchTestsStatus = "fail"
    })
  },
})


export default testsSlice.reducer


export const {
  idleFetchTestsStatus,
} = testsSlice.actions
