import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "reactstrap";
export const CounterHooks = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div className="border">
      <p>Counter: {counter}</p>
      <Badge onClick={() => dispatch({ type: "counter/add", payload: 1 })}>
        Add
      </Badge>
      <Badge onClick={() => dispatch({ type: "counter/add", payload: -1 })}>
        Remove
      </Badge>
      <Badge onClick={() => dispatch({ type: "counter/reset" })}>Reset</Badge>
    </div>
  );
};
