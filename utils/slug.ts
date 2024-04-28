import slugify from "slugify";
import { uuidRegex } from "./regex";

export const generateSlug = (name: string, id: string) => {
  const path = slugify(name, {
    lower: true,
    locale: "vi",
  });

  return `${path}-${id}.html`;
};

export const decodeSlug = (path: string) => {
  const matches = path.match(uuidRegex);

  if (matches) {
    return matches[0];
  } else {
    return null;
  }
};
