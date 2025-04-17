export const convertDataUrlToFile = async (
  dataURL: string,
  filename: string,
  type?: string | undefined,
): Promise<File> => {
  const blob = await (await fetch(dataURL)).blob();
  return new File([blob], filename, { type: type });
};
