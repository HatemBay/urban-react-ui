import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface PageState {
  currPage: number,
  filter: string
}

const initialState: PageState = {
  currPage: 1,
  filter: "",
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
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    clear: state => {
      state.filter = "";
    },
  }
})

export const { setPage, incremented, decremented, setFilter, clear } = pageSlice.actions

export const selectPage = (state: PageState) => state.currPage

export default pageSlice.reducer;