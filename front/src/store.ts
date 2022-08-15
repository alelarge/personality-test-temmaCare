import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './screens/Home/HomeSlice'
import testReducer from './screens/Test/TestSlice'

export const store = configureStore({
  reducer: {
    home: homeReducer,
    test: testReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {}
export type AppDispatch = typeof store.dispatch
