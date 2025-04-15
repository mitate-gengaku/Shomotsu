export const generateContents = (content: string | null) => {
  if (!content) return [];
  const arrayOfParsedContent = content.split("\n");
  const chapters: string[] = [];
  let tmp: string[] = [];

  for (let i = 0; i < arrayOfParsedContent.length; i++) {
    const parsedItem = arrayOfParsedContent[i];
    const next = arrayOfParsedContent[i + 1];

    tmp.push(parsedItem);

    if (next && next.startsWith("## ")) {
      chapters.push(tmp.join("\n"));

      tmp = [];
    } else if (i === arrayOfParsedContent.length - 1) {
      chapters.push(tmp.join("\n"));
    }
  }

  return chapters;
};
