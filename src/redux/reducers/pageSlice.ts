import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface PageState {
  currPage: number
}

const initialState: PageState = {
  currPage: 1,
}

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currPage = action.payload
    },
    incremented: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.currPage += 1
    },
    decremented: state => {
      state.currPage -= 1
    }
  }
})

export const { setPage, incremented, decremented } = pageSlice.actions

export const selectPage = (state: PageState) => state.currPage

export default pageSlice.reducer;