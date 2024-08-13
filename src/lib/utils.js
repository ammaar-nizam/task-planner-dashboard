export const kelvinToCelsius = (kelvin) => {
  if (typeof kelvin !== "number") {
    throw new Error("Input must be a number.");
  }
  return (kelvin - 273.15).toFixed(2);
};
