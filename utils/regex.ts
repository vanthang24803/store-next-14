const capitalizeRegex =
  /^[\p{Lu}\p{Ll}\p{Lt}\p{Lm}\p{Lo}][\p{L}\p{Mn}\p{Mc}\p{Nd}\p{Nl}\p{Pc}\p{Cf}\p{Zl}\p{Zp}\p{Ps}\p{Pe}\p{Pi}\p{Pf}\p{Sm}\p{Sc}\p{Sk}\p{So}\p{Pd}\p{Po}\p{C}]*$/u;

const specialCharRegex = /[\p{S}\p{P}]/u;
const uppercaseCharRegex = /[A-Z]/;
const digitRegex = /\d/;

export { capitalizeRegex, specialCharRegex, uppercaseCharRegex, digitRegex };
