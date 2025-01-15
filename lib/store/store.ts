import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import loginReducer from "./features/login/loginSlice";

import loadingReducer from "./features/loading/loadingSlice";
import myProfileReducer from "./features/myProfile/myProfileSlice";
import MyRequestsReducer from "./features/myRequests/myRequests";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      login: loginReducer,
      loadHandler: loadingReducer,
      myProfile: myProfileReducer,
      myRequests:MyRequestsReducer
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
