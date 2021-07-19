import produce from "immer";
import { set, has, isEmpty } from "lodash";

export const enhancedReducer = (state, updateArg) => {
  if (updateArg.constructor === Function) {
    return { ...state, ...updateArg(state) };
  }
  if (updateArg.constructor === Object) {
    if (has(updateArg, "path") && has(updateArg, "value")) {
      const { path, value } = updateArg;
      return produce(state, (draft) => {
        set(draft, path, value);
      });
    } else if (!isEmpty) {
      return { ...state, ...updateArg };
    }
  }
  return state;
};

export const capitalizeFirstLetter = (input) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};
