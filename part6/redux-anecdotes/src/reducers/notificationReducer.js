import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        set(state, action) {
            return action.payload
        },
        reset(state) {return ''}
    }
})

export const { set, reset } = notificationSlice.actions
export default notificationSlice.reducer