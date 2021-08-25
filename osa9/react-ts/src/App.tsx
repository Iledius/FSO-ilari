import React from "react";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseWithDesc extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseWithDesc {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseWithDesc {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseWithDesc {
  type: "special";
  requirements: string[];
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

type CourseParts = CoursePart[];

const Header = ({ courseName }: { courseName: string }) => (
  <div>
    <h1>{courseName}</h1>
  </div>
);

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <dt style={{ fontWeight: "bold", fontSize: "20px" }}>{part.name}</dt>
          <dt>{part.description}</dt>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <dt style={{ fontWeight: "bold", fontSize: "20px" }}>{part.name}</dt>
          <pre>project exercises:{part.groupProjectCount}</pre>
        </div>
      );
    case "submission":
      return (
        <div>
          <dt style={{ fontWeight: "bold", fontSize: "20px" }}>{part.name}</dt>
          <dt>{part.description}</dt>
          <pre>submit to: {part.exerciseSubmissionLink}</pre>
        </div>
      );
    case "special":
      return (
        <div>
          <dt style={{ fontWeight: "bold", fontSize: "20px" }}>{part.name}</dt>
          <dt>{part.description}</dt>
          <pre>requirements: {part.requirements.join(", ")}</pre>
        </div>
      );
    default:
      return null;
  }
};

const Content = ({ courseParts }: { courseParts: CourseParts }) => (
  <div>
    {courseParts.map((coursePart) => {
      return (
        <div key={coursePart.name}>
          <Part part={coursePart}></Part>
          <hr />
        </div>
      );
    })}
  </div>
);

const Total = ({ courseParts }: { courseParts: CourseParts }) => (
  <div>
    <p style={{ fontWeight: "bolder", fontSize: "15px" }}>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  </div>
);

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
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
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
