import Header from "./components/Header";
import Content from "./components/Content";
import { Data } from "./components/Content";
import Total from "./components/Total";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: Array<Data> = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
        <Header text={ courseName } />
        <Content data={ courseParts } />
        <Total data={ courseParts } />
    </div>
  );
};

export default App;