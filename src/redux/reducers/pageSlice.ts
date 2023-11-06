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