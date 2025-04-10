export const generateToc = (content: string) => {
  const arrayOfParsedContent = content.split("\n");
  const toc: string[] = [];

  for (let i = 0; i < arrayOfParsedContent.length; i++) {
    const parsedItem = arrayOfParsedContent[i];

    if (parsedItem.startsWith("## ")) {
      toc.push(parsedItem.replace("## ", ""));
    }
  }

  return toc;
};
