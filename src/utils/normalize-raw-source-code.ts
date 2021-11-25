type MultiSource = {
  [name: string]: string;
};

const normalize = (rawContent: string): MultiSource | string => {
  if (rawContent.startsWith("{{") && rawContent.endsWith("}}")) {
    try {
      const modifyContent = rawContent.slice(1, -1).replaceAll("\r\n", "");
      const payload: {
        sources: { [p: string]: { content: string } };
        settings: never;
      } = JSON.parse(modifyContent);

      const multiSource = Object.entries(payload.sources).reduce(
        (acc, [fileName, { content }]) => {
          acc[fileName] = content;
          return acc;
        },
        {} as MultiSource
      );

      multiSource["settings.json"] = JSON.stringify(
        payload.settings,
        undefined,
        2
      );
      multiSource["test.py"] = "xxx";
      multiSource["test2.txt"] = "xxx";
      multiSource["test3.etc"] = "xxx";

      return multiSource;
    } catch (e) {
      console.error(e);
    }
  }

  return rawContent;
};

export default normalize;
