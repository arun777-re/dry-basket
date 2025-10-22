import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorProps, IncomingAPIResponseFormat } from "@/types/response";
import { LoginProps, UpdatePasswordOutgoingDTO, UserPropsIncoming, UserPropsOutgoing } from "@/types/user";
import { defaultError, defaultUserState } from "../services/helpers/userresponse";
import { AuthAPI } from "../services/api/auth";




export interface UserState {
  user:IncomingAPIResponseFormat<UserPropsIncoming>;
  loading:{
    login:boolean;
    register:boolean;
    reset:boolean;
    forgot:boolean;
    logout:boolean;
    get:boolean;
    updatePassword:boolean;
    verifyEmail:boolean;

  };
  error: ErrorProps;
}
const initialState: UserState = {
  user: defaultUserState,
  loading:{
    login:false,
    register:false,
    reset:false,
    forgot:false,
    logout:false,
    get:false,
    updatePassword:false,
    verifyEmail:false,
  },
  error: defaultError

};

// thunk to create user
export const createUser = createAsyncThunk<
  IncomingAPIResponseFormat<null>,
  UserPropsOutgoing,
  { rejectValue: ErrorProps }
>("/user/create", async (formData, { rejectWithValue }) => {
  try {
    const response = await AuthAPI.signup(formData,rejectWithValue)
    return response;


  } catch (error: any) {
    return rejectWithValue({
      message: `Error during create user: ${error.message}`,
      success: false,
      status:500
    });
  }
});

// thunk for login user
export const loginUser = createAsyncThunk<
  IncomingAPIResponseFormat<UserPropsIncoming>,
  LoginProps,
  { rejectValue: ErrorProps }
>("/user/login", async (data, { rejectWithValue }) => {
  try {
  const response = await AuthAPI.signin(data,rejectWithValue)
    return response;
  } catch (error: any) {
    return rejectWithValue({
      message: `Error during login user: ${error.message}`,
      success: false,
      status:500
    });
  }
});
// thunk for login user
export const verifyUserThunk = createAsyncThunk<
  IncomingAPIResponseFormat<UserPropsIncoming>,
  string,
  { rejectValue: ErrorProps }
>("/user/verify", async (token, { rejectWithValue }) => {
  try {
  const response = await AuthAPI.verifyEmail(token,rejectWithValue)
    return response;
  } catch (error: any) {
    return rejectWithValue({
      message: `Error during verify user email: ${error.message}`,
      success: false,
      status:500
    });
  }
});

// thunk for logout user
export const logoutuser = createAsyncThunk<
  ErrorProps,
  void,
  { rejectValue: ErrorProps }
>("user/logout", async (_, { rejectWithValue }) => {
  try {
 const response = await AuthAPI.logout(rejectWithValue)
    return response;
  } catch (error: any) {
    return rejectWithValue({
      message: `Error during logout: ${error.message}`,
      success: false,
      status:500
    });
  }
});


export const forgotPass = createAsyncThunk<
  any,
 string,
  { rejectValue: ErrorProps }
>("/user/forgot-pass", async (email, { rejectWithValue }) => {
  try {
    const res = await AuthAPI.reset(email,rejectWithValue)

    return res;
  } catch (error: any) {
    return rejectWithValue({
      message: `Error during get notification: ${error.message}`,
      success: false,
      status:500
    });
  }
});

export const resetPass = createAsyncThunk<ErrorProps,{
  token:string,
  password:string
},{rejectValue:ErrorProps}>('/user/reset-Password',async({token,password},{rejectWithValue})=>{
try {
    const res = await AuthAPI.update(token,password,rejectWithValue)

    return res;
  } catch (error: any) {
    return rejectWithValue({
      message: `Error during get notification: ${error.message}`,
      success: false,
      status:500
    });
  }
});


export const getUserThunk = createAsyncThunk<
IncomingAPIResponseFormat<UserPropsIncoming>,
void,
{rejectValue:ErrorProps}
>('/user/get',async(_,{rejectWithValue})=>{
const response = await AuthAPI.getUser(rejectWithValue);
return response;
})

export const updatePasswordThunk = createAsyncThunk<
IncomingAPIResponseFormat<UserPropsIncoming>,
UpdatePasswordOutgoingDTO,
{rejectValue:ErrorProps}
>('/auth/update-pass',async({email,password},{rejectWithValue})=>{
const res = await AuthAPI.Update_Password({reject:rejectWithValue,data:{email,password}});
return res;
})
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUserLocally:(state) =>{
    state.user = defaultUserState
    }
  },
  extraReducers: (builder) => {
    builder
    // register
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading.register = false;
        state.user = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.loading.register = true;
        state.error = defaultError;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading.register = false;
        state.error = action.payload as ErrorProps;
        state.user = defaultUserState;
      })

      // login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading.login = false;
        state.error = defaultError;
        state.user = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
          if (typeof state.loading !== 'object') {
    state.loading = { 
      login: false,
      register: false,
      reset: false,
      forgot: false,
      logout: false,
      get:false,
      updatePassword:false,
      verifyEmail:false,
    };
  }
        state.loading.login = true;
        state.error = defaultError;
      })
      .addCase(loginUser.rejected, (state, action) => {
       if (typeof state.loading !== 'object') {
    state.loading = {
      login: false,
      register: false,
      reset: false,
      forgot: false,
      logout: false,
      get:false,
      updatePassword:false,
      verifyEmail:false,
    };
  }

        state.loading.login = false;
        state.error = action.payload as ErrorProps;
        state.user = defaultUserState;
      })

      // logout
      .addCase(logoutuser.fulfilled, (state) => {
        state.loading.logout = false;
        state.error = defaultError;
        state.user = defaultUserState;
      })
      .addCase(logoutuser.pending, (state) => {
        state.loading.logout = true;
        state.error = defaultError;
      })
      .addCase(logoutuser.rejected, (state, action) => {
        state.loading.logout = false;
        state.error = action.payload as ErrorProps;
      })
      // forgot
      .addCase(forgotPass.fulfilled, (state) => {
        state.loading.forgot = false;
        state.error = defaultError;
      })
      .addCase(forgotPass.pending, (state) => {
        state.loading.forgot = true;
      })
      .addCase(forgotPass.rejected, (state, action) => {
        state.loading.forgot = false;
        state.error = action.payload as ErrorProps;
      })
      // reset
      .addCase(resetPass.fulfilled, (state) => {
        state.loading.reset = false;
        state.error = defaultError;
      })
      .addCase(resetPass.pending, (state) => {
        state.loading.reset = true;
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.loading.reset = false;
        state.error = action.payload as ErrorProps;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading.get = false;
        state.user = action.payload;
      })
      .addCase(updatePasswordThunk.fulfilled, (state, action) => {
        state.loading.updatePassword = false;
        state.user = action.payload;
      })
      .addCase(verifyUserThunk.fulfilled, (state, action) => {
        state.loading.verifyEmail = false;
        state.user = action.payload;
      })
  },
});

export const {logoutUserLocally} = userSlice.actions;

export default userSlice.reducer;
