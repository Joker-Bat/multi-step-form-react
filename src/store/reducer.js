import * as actionTypes from "./actionTypes";

export const initialState = {
  userDetails: {
    fullName: "",
    displayName: "",
    workspaceName: "",
    workspaceUrl: "",
    purpose: "",
  },
  currentPosition: 0,
  steps: [],
};

const STEP_STATUS = {
  NOT_STARTED: "NOT_STARTED",
  DONE: "DONE",
};

export const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_STEPS: {
      const updatedSteps = action.payload.steps.map((step) => ({
        ...step,
        status: STEP_STATUS.NOT_STARTED,
      }));
      return { ...state, steps: updatedSteps };
    }

    case actionTypes.UPDATE_POSITION: {
      const curPosition = state.currentPosition;
      const nextPosition = action.payload.position;

      // If user clicks on previous position
      if (nextPosition < curPosition) {
        return {
          ...state,
          currentPosition:
            nextPosition <= state.steps.length - 1 ? nextPosition : curPosition,
        };
      }

      // If prev positions are not done, then don't go to next position
      if (nextPosition > curPosition) {
        let isPrevValid = true;
        let curArr = [...Array(nextPosition).keys()];

        for (let step of curArr) {
          if (state.steps[step].status !== STEP_STATUS.DONE) {
            isPrevValid = false;
            break;
          }
        }

        if (!isPrevValid) return state;

        return {
          ...state,
          currentPosition:
            nextPosition <= state.steps.length - 1 ? nextPosition : curPosition,
        };
      }
      return state;
    }

    case actionTypes.UPDATE_DETAILS: {
      return {
        ...state,
        userDetails: { ...state.userDetails, ...action.payload.details },
        steps: state.steps.map((step, index) => {
          if (index === state.currentPosition) {
            return { ...step, status: STEP_STATUS.DONE };
          }
          return step;
        }),
      };
    }

    case actionTypes.NEXT_POSITION: {
      const curPosition = state.currentPosition;
      // If current position is not done, then don't go to next position
      if (state.steps[curPosition].status !== STEP_STATUS.DONE) {
        return state;
      }

      return {
        ...state,
        currentPosition:
          state.currentPosition < state.steps.length - 1
            ? ++state.currentPosition
            : state.currentPosition,
      };
    }

    default: {
      return state;
    }
  }
};
