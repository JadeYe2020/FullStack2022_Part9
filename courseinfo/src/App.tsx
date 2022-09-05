const App = () => {
  const Header = ({ name }: { name: string }) => {
    return <h1>{name}</h1>;
  };

  interface CoursePart {
    name: string;
    exerciseCount: number;
  }

  const Content = (props: { courseParts: CoursePart[] }) => {
    return (
      <div>
        {props.courseParts.map((item) => (
          <p key={item.name}>
            {item.name} {item.exerciseCount}
          </p>
        ))}
      </div>
    );
  };

  const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    );
  };

  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;