const capitalizeRegex =
  /^[\p{Lu}\p{Ll}\p{Lt}\p{Lm}\p{Lo}][\p{L}\p{Mn}\p{Mc}\p{Nd}\p{Nl}\p{Pc}\p{Cf}\p{Zl}\p{Zp}\p{Ps}\p{Pe}\p{Pi}\p{Pf}\p{Sm}\p{Sc}\p{Sk}\p{So}\p{Pd}\p{Po}\p{C}]*$/u;

const specialCharRegex = /[\p{S}\p{P}]/u;
const uppercaseCharRegex = /[A-Z]/;
const textRegex = /^[A-Z][a-zA-Z]*$/;
const digitRegex = /\d/;
const phoneNumberRegex = /^\d{10}$/;

const sqlInjectionRegex =
  /(\b(AND|OR)\b[\s]*[\d]+\=[\d]+|(\bUNION\b|\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bCREATE\b|\bDROP\b|\bALTER\b)\b|(\bWHERE\b[\s]*\d+\=[\d]+))/i;

const uuidRegex =
  /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;

export {
  capitalizeRegex,
  specialCharRegex,
  uppercaseCharRegex,
  digitRegex,
  phoneNumberRegex,
  sqlInjectionRegex,
  textRegex,
  uuidRegex,
};
