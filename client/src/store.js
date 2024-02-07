import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./features/projects/project";
import cohortReducer from "./features/cohorts/cohort";
import userReducer from "./features/users/users";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    cohorts: cohortReducer,
    users: userReducer,
  },
});
