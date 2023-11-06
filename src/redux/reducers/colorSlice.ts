import { useColorModeValue } from "@chakra-ui/react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface colorState {
  BgColor?: string;
  BgColor2?: string;
  TextColor: string;
}

const initialState: colorState = {
  BgColor: useColorModeValue("gray.300", "gray.600"),
  TextColor: useColorModeValue("gray.800", "white")
}

const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {}
})

export default colorSlice.reducer;