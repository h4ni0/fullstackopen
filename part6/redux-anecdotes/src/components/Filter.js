import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    
    const handleChange = (e) => {
        const filter = e.target.value
        dispatch(setFilter(filter))
    }
    
    return (
        <div>
            filter <input type="text" onChange={handleChange} name="filter" />
        </div>
    )
}

export default Filter