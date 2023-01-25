import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todo: [],
  status: "idle",
  error: null,
};

const todo = createSlice({
  name: "todos",
  initialState,
  reducers: {
    loadTodo: (state, action) => {
      state.todo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.status = "successed";
        state.todo = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const fetchTodo = createAsyncThunk(
  "todos/fetchTodo",
  async (params, thunkAPI) => {
    try {
      let result = await axios.get("https://z0o0wo-3500.preview.csb.app/todos");
      return result.data;
    } catch (e) {
      return e.message;
    }
  }
);

export const selectAllTodo = (state) => state.todo.todo;
export const getTodoStatus = (state) => state.todo.status;
export const getTodoError = (state) => state.todo.error;

export default todo.reducer;
