const fallback = (fallbackLogic: Function) => (logic: Function): any => {
  try {
    return logic();
  } catch (error) {
    return fallbackLogic(error);
  }
};

export default fallback;
