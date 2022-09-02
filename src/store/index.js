import { createContext, useContext, useReducer } from "react";

const MultiStepContext = createContext();
MultiStepContext.displayName = "MultiStepContext";

export const useStore = () => useContext(MultiStepContext);

export const MultiStepProvider = ({ children, initialState, reducer }) => {
  const [globalState, dispatch] = useReducer(reducer, initialState);

  return (
    <MultiStepContext.Provider value={[globalState, dispatch]}>
      {children}
    </MultiStepContext.Provider>
  );
};
