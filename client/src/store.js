import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./features/projects/project";

export const store = configureStore({
  reducer: { projects: projectsReducer },
});
