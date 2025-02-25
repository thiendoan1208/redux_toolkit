import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllUser = createAsyncThunk('users/fetchAllUser', async (id, thunkAPI) => {
  let res = await axios.get('http://localhost:8080/users/all');
  return res.data;
});

/*
+ createAsyncThunk: tạo ra actions có tên action và chức năng đang làm gì. 
+ bên trong sẽ truyền vào tham số hoặc không có gì 
*/

const initialState = {
  listUser: [],
  isLoading: false,
  isError: false,
};

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchAllUser.pending, (state, action) => {
        // Add user to the state array
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        // Add user to the state array
        state.listUser = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        // Add user to the state array
        state.isError = true;
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export default userSlice.reducer;

/*
+ Tiếp theo khai báo ra extraReducer để có thể thực hiện các tác vụ không liên quan đến reducer
+ khi chưa load được data thì action.payload sẽ là undefined và khi load được data action.payload sẽ có dữ liệu
*/
