import { AnyAction, createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: { value: [] },
    reducers: {
        currentUser: () => {},
        signIn: () => {},
        signUp: () => {},
        signOut: () => {}
    }
});

export const { currentUser, signIn, signUp, signOut } = userSlice.actions;

export default userSlice.reducer;