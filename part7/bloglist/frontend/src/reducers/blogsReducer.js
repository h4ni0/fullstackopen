import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        addBlog(state, action) {
            state.push(action.payload)
        },
    },
})

export const { setBlogs, addBlog } = blogsSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogsService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const create = (blog, token) => {
    return async (dispatch) => {
        const createdBlog = await blogsService.create(blog, token)
        dispatch(addBlog(createdBlog))
    }
}

export default blogsSlice.reducer
