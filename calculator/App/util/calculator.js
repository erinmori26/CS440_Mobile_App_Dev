// initial state
export const initialState = {
  currentValue: "0", // stores current values being inputted and answer value after calculation
  operator: null, // stores selected operator
  previousValue: null, // stores previous value for calculation and then current value for display
  prepreValue: null, // stores previous value for display when previous value is overwritten by current value
  equalPressed: false, // flag for when "=" pressed
  opDisplay: null // store operator that is displayed so operator state value can change
};

//////////
export const clearDisplayState = {
  opDisplay: null,
  operator: null,
  equalPressed: false
};

// Custom Method: Updates current value based on number being pressed
export const handleNumber = (value, state) => {
  // replace starting 0
  if (state.currentValue === "0") {
    // if start with decimal (i.e. "0.") (to solve NaN display)
    if (value === ".") return { currentValue: `${state.currentValue}${value}` };
    return { currentValue: `${value}` };
  }

  // append the new number (3 on screen, 4 pressed --> 34)
  return {
    currentValue: `${state.currentValue}${value}`
  };
};

// Custom Method: A mathematical operation is executed based on inputs
export const handleEqual = state => {
  const { currentValue, previousValue, operator } = state; // object destructure (get from state)

  const current = parseFloat(currentValue); // string to float
  const previous = parseFloat(previousValue); // string to float

  // set state values to display equation at top properly
  const equationDisplayState = {
    prepreValue: previous,
    previousValue: current,
    equalPressed: true
  };

  // divide
  if (operator === "/") {
    return {
      currentValue: previous / current,
      ...equationDisplayState
    };
  }

  // multiply
  if (operator === "*") {
    return {
      currentValue: previous * current,
      ...equationDisplayState
    };
  }

  // add
  if (operator === "+") {
    // let temp = previous;
    return {
      currentValue: previous + current,
      ...equationDisplayState
    };
  }

  // subtract
  if (operator === "-") {
    return {
      currentValue: previous - current,
      ...equationDisplayState
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
      // display "x" for multiplication (instead of "*")
      if (value == "*") replaceVal = "x";
      else replaceVal = value;
      return {
        equalPressed: false,
        opDisplay: replaceVal,
        operator: value,
        prepreValue: state.previousValue,
        previousValue: state.currentValue, // store current value
        currentValue: "0" // reset current value
      };
    case "equal":
      if (state.equalPressed == true) break;
      return handleEqual(state);
    case "clear":
      return initialState;
    case "posneg":
      return {
        currentValue: `${parseFloat(state.currentValue) * -1}`, // string to float * -1
        ...clearDisplayState
      };
    case "percentage":
      return {
        currentValue: `${parseFloat(state.currentValue) * 0.01}`, // string to float * 0.01
        ...clearDisplayState
      };
    case "squareroot":
      if (state.equalPressed == true) break;
      return {
        prepreValue: "",
        opDisplay: value,
        previousValue: state.currentValue,
        currentValue: `${Math.sqrt(parseFloat(state.currentValue))}`,
        equalPressed: true
      };
    default:
      // always return state
      return state;
  }
};

export default calculator;
