export const formatString = (text: string | undefined) => {
  let lines = text?.split("<br/>");
  let newText = lines?.map((line, index) => <p key={index}>{line}</p>);

  return newText;
};
