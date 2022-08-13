import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './screens/home/HomeSlice'

export const store = configureStore({
  reducer: {
    tests: homeReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {}
export type AppDispatch = typeof store.dispatch
