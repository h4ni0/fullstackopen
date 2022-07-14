import { Data } from "./Content"

const Total = (props: {data: Data[]}) => {
    return (
        <>
            <p>
                Number of exercises{" "}
                {props.data.reduce((carry, part) => carry + part.exerciseCount, 0)}
            </p>
        </>
    )
}

export default Total