// initial state
export const initialState = {
  currentValue: "0", // store as string (use parse later)
  operator: null,
  previousValue: null
};

// number
export const handleNumber = (value, state) => {
  // replace starting 0
  if (state.currentValue === "0") {
    // if start with decimal (i.e. "0.") (to solve NaN display)
    if (value === ".") return { currentValue: `${state.currentValue}${value}` };
    return { currentValue: `${value}` };
  }
  return {
    currentValue: `${state.currentValue}${value}`
  };
};

// equal
export const handleEqual = state => {
  const { currentValue, previousValue, operator } = state; // object destructure (get from state)

  const current = parseFloat(currentValue); // string to float
  const previous = parseFloat(previousValue); // string to float

  // reset operator and previousValue
  const resetState = {
    operator: null,
    previousValue: null
  };

  // divide
  if (operator === "/") {
    return {
      currentValue: previous / current,
      ...resetState // objct spread
    };
  }

  // multiply
  if (operator === "*") {
    return {
      currentValue: previous * current,
      ...resetState
    };
  }

  // add
  if (operator === "+") {
    return {
      currentValue: previous + current,
      ...resetState
    };
  }

  // subtract
  if (operator === "-") {
    return {
      currentValue: previous - current,
      ...resetState
    };
  }

  // always return state
  return state;
};

// calculator functionality
const calculator = (type, value, state) => {
  switch (type) {
    case "number":
      return handleNumber(value, state);
    case "operator":
      return {
        operator: value,
        previousValue: state.currentValue, // store current value
        currentValue: "0" // reset current value
      };
    case "equal":
      return handleEqual(state);
    case "clear":
      return initialState;
    case "posneg":
      return {
        currentValue: `${parseFloat(state.currentValue) * -1}` // string to float * -1
      };
    case "percentage":
      return {
        currentValue: `${parseFloat(state.currentValue) * 0.01}` // string to float * 0.01
      };
    default:
      // always return state
      return state;
  }
};

export default calculator;
