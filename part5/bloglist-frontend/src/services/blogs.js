import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (blog, token) => {
    const config = {
        headers: {
            authorization: 'bearer ' + token
        }
    }
    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

const update = async (id, newBlog, token) => {
    const config = {
        headers: {
            authorization: 'bearer ' + token
        }
    }
    const response = await axios.put(`${baseUrl}/${id}`, newBlog, config)
    console.log('Liked!')
    return response.data
}

const remove = async (id, token) => {
    const config = {
        headers: {
            authorization: 'bearer ' + token
        }
    }
    await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, remove }