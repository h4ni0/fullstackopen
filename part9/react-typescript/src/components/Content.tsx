export interface Data  {
    name: string;
    exerciseCount: number;
}
const Content = (props: { data: Array<Data> }) => {
    return (
        <>
            {props.data.map(coursePart => 
                <p>
                    {coursePart.name} {coursePart.exerciseCount}
                </p>
            )}
        </>
    )
}

export default Content