
const NumberBar = ({ number }: { number: number }) => {
  return (
    <span className="number-bar" style={{ height: `${number}px` }}>
      {number}
    </span>
  );
};

export default NumberBar;
