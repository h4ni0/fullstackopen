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

export const setNotification = (text, time) => {
    return dispatch => {
        dispatch(set(text))
        setTimeout(() => {
            dispatch(reset())
        }, time * 1000)
    }
}

export default notificationSlice.reducer