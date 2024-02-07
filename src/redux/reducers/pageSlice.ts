import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface PageState {
  currPage: number,
  filter: string,
  randomize: boolean,
  rerender: boolean,
}

const initialState: PageState = {
  currPage: 1,
  filter: "",
  randomize: false,
  rerender: false,
}

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currPage = action.payload;
    },
    incremented: state => {
      state.currPage += 1;
    },
    decremented: state => {
      state.currPage -= 1;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setRandomize: (state, action: PayloadAction<boolean>) => {
      state.randomize = action.payload;
    },
    clear: state => {
      state.filter = "";
    },
    forceRerender: (state) => {
      state.rerender = !state.rerender;
    }
  }
})

export const { setPage, incremented, decremented, setFilter, setRandomize, forceRerender, clear } = pageSlice.actions

export default pageSlice.reducer;