import { useState, memo } from "react";
// memo - built-in function which can be wrapped around component functions, to prevent unnecessary
// component functions executions

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.js";

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

// adding the memo-function (wrapping around the whole component-function, which we want to export):
// each time a component should be re-rendered (f.e. because a parent component was re-rendered,
// memo will add the new prop value, compare the old with the new prop value, and if they are the same,
// memo will prevent that this component-function is re-rendered).
// This component-function will re-execute only if the prop value, or if it's internal state, has changed.
//
const Counter = memo(function Counter({ initialCount }) {
  log("<Counter /> rendered", 1);
  const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);
  // useMemo - only to be used for complex functions/calculations
  // useMemo also has dependencies array

  const [counter, setCounter] = useState(initialCount);

  function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
  }

  function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  }

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
});

export default Counter;

// When we interact with the page and cause something to change, React compares only 2 virtual DOM states: 
// previous Virtual DOM state with the new Virtual DOM state (not checking in real DOM). 
// And then if there was a changed, React changes only this particular thing in real DOM, 
// which was changed (f.e. something inside one HTML-element),
// but it doesn't re-render the whole html-page each time when something was changed. 
// This is important for the performance, it would not be economical to re-render the whole page each time
// something has changed. 

// If we create multiple instances of the same component, f.e. <Counter>, every component keeps her own state,
// and those different states don't affect each other. 
