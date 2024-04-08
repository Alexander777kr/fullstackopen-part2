const Total = ({ parts }) => {
  let totalSum = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);
  return (
    <p>
      <strong>total of {totalSum} exercises</strong>
    </p>
  );
};

export default Total;
