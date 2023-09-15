import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "../feature/employeeSlice";

export const store = configureStore({
  reducer: {
    app: employeeSlice, 
  },
});