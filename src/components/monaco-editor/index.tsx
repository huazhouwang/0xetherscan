import Editor, { loader, EditorProps } from "@monaco-editor/react";
// import EDITOR_THEME_TOMORROW_NIGHT_BLUE from "monaco-themes/themes/Tomorrow-Night-Blue.json";
import * as solidity from "./solidity";
import { useTheme } from "@mui/material";

loader.init().then((monaco) => {
  // monaco.editor.defineTheme(
  //   "TomorrowNightBlue",
  //   EDITOR_THEME_TOMORROW_NIGHT_BLUE
  // );

  monaco.languages.register({ id: "solidity" });
  monaco.languages.setLanguageConfiguration(
    "solidity",
    solidity.languageConfiguration
  );
  monaco.languages.setMonarchTokensProvider(
    "solidity",
    solidity.monarchTokensProvider
  );
});

type MonacoEditorProps = EditorProps;
const MonacoEditor = ({ theme, ...others }: MonacoEditorProps) => {
  const uiTheme = useTheme();

  if (!theme) {
    theme = uiTheme.palette.mode === "light" ? "light" : "vs-dark";
  }

  return <Editor theme={theme} {...others} />;
};

export default MonacoEditor;
export type { MonacoEditorProps };
