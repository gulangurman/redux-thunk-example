const counter = (state = 0, action) => {
  switch (action.type) {
    case "counter/add":
      return state + action.payload;
    case "counter/reset":
      return 0;
    default:
      return state;
  }
};
export default counter;
