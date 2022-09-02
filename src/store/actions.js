import * as actionTypes from "./actionTypes";

export const updateSteps = (steps) => ({
  type: actionTypes.UPDATE_STEPS,
  payload: { steps },
});

export const updatePosition = (position) => ({
  type: actionTypes.UPDATE_POSITION,
  payload: { position },
});

export const updateDetails = (details) => ({
  type: actionTypes.UPDATE_DETAILS,
  payload: { details },
});

export const nextPosition = () => ({
  type: actionTypes.NEXT_POSITION,
});
