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
      .addCase(getTodo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTodo.fulfilled, (state, action) => {
        state.status = "successed";
        const todo = action.payload;
        todo.sort((a, b) => b.id - a.id);
        state.todo = todo;
      })
      .addCase(getTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        const todo = state.todo;
        todo.push(action.payload);
        todo.sort((a, b) => b.id - a.id);
        state.todo = todo;
        console.log(action.payload);
      });
  },
});

export const getTodo = createAsyncThunk("todos/getTodo", async () => {
  try {
    let result = await axios.get("https://z0o0wo-3500.preview.csb.app/todos");
    return result.data;
  } catch (e) {
    return e.message;
  }
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  try {
    console.log(todo);
    let result = await axios.post(
      "https://z0o0wo-3500.preview.csb.app/todos",
      todo
    );
    return result.data;
  } catch (e) {
    return e.message;
  }
});

export const selectAllTodo = (state) => state.todo.todo;
export const getTodoStatus = (state) => state.todo.status;
export const getTodoError = (state) => state.todo.error;

export default todo.reducer;
