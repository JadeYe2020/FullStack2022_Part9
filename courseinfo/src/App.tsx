const App = () => {
  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CoursePartWithDesc extends CoursePartBase {
    description: string;
  }

  interface CourseNormalPart extends CoursePartWithDesc {
    type: "normal";
  }

  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CoursePartWithDesc {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CourseSpecialPart extends CoursePartWithDesc {
    type: "special";
    requirements: string[];
  }

  type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart
    | CourseSpecialPart;

  const Header = ({ name }: { name: string }) => {
    return <h1>{name}</h1>;
  };

  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    switch (coursePart.type) {
      case "normal":
        return (
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
            <br />
            <em>{coursePart.description}</em>
          </p>
        );
        break;
      case "groupProject":
        return (
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
            <br />
            project exercises {coursePart.groupProjectCount}
          </p>
        );
        break;
      case "submission":
        return (
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
            <br />
            <em>{coursePart.description}</em>
            <br />
            submit to {coursePart.exerciseSubmissionLink}
          </p>
        );
        break;
      case "special":
        return (
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
            <br />
            <em>{coursePart.description}</em>
            <br />
            required skills: {coursePart.requirements.join(", ")}
          </p>
        );
        break;
      default:
        return assertNever(coursePart);
        break;
    }
  };

  const Content = (props: { courseParts: CoursePart[] }) => {
    return (
      <div>
        {props.courseParts.map((item) => (
          <Part key={item.name} coursePart={item} />
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

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special",
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
