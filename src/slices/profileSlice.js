import { createSlice } from '@reduxjs/toolkit';

// Initial state for the auth slice
const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
}

// Create the profile slice using Redux Toolkit's createSlice function
const profileSlice = createSlice({
    name: "profile", // Name of the slice
    initialState: initialState, // Initial state of the slice
    reducers: {
        // Reducer to set the user in the state
        setUser(state, action) {
            state.user = action.payload; // Set the user value from the action payload
            localStorage.setItem("user", JSON.stringify(action.payload)); // Persist the user to localStorage
        }
    }
});

// Export the setUser action creator
export const { setUser } = profileSlice.actions;

// Export the reducer as the default export
export default profileSlice.reducer;
