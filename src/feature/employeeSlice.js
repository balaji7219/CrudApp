
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const creatUser = createAsyncThunk(
  "createUsers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://sweede.app/DeliveryBoy/Add-Employee/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        // Handle non-successful responses here if needed
        throw new Error('Failed to create user');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const getUserById = createAsyncThunk(
  "getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://sweede.app/DeliveryBoy/Get-Employee/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch user by ID");
      }

      const result = await response.json();
      return result; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const updateUser = createAsyncThunk(
  "updateUser",
  async (user, { rejectWithValue }) => {
    console.log("updateData..", user);


    if (!user.Study) {
      user.Study = "Something"; 
    }
    try {
      const response = await fetch(
        `https://sweede.app/DeliveryBoy/update-Employee/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        // Handle non-successful HTTP responses
        const errorData = await response.json();
        return rejectWithValue({ message: errorData.message, status: response.status });
      }

      const result = await response.json();
      return result;
    } catch (error) {
      // Handle other errors (e.g., network issues)
      return rejectWithValue({ message: "An error occurred", error });
    }
  }
);


export const getUser = createAsyncThunk(
  "getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://sweede.app/DeliveryBoy/Get-Employee/"
      );

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://sweede.app/DeliveryBoy/delete-Employee/${id}`,
        { method: "DELETE" }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const employeeSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isLoading: false,
    isError: null,

    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      console.log(action.payload);
      state.searchData = action.payload;
    },
  },
  extraReducers: {
    [creatUser.pending]: (state) => {
      state.isLoading = true;
    },
    [creatUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users.push(action.payload); // Corrected
    },
    [creatUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload; // Corrected
    },
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;

      const { id } = action.payload;
      if (id) {
        state.users = state.users.filter((item) => item.id !== id); // Corrected
      }
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload; // Corrected
    },
    [getUserById.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload; // Store the fetched user in the state
    },
    [getUserById.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload; // Corrected
    },
  },
});

export default employeeSlice.reducer;

export const { searchUser } = employeeSlice.actions;



