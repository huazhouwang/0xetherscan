import MonacoEditor from "../../components/monaco-editor";
import { FileDetail, getFilesSelector } from "../explorer/slice";
import { useAppSelector } from "../../redux/hooks";

type EditorPaneProps = {
  fileIds: string[];
};

const Editor = ({ file }: { file: FileDetail }) => {
  return <MonacoEditor language={file.ext} value={file.content} />;
};

const EditorPane = ({ fileIds }: EditorPaneProps) => {
  const [file] = useAppSelector((state) => getFilesSelector(state, fileIds));
  return <>{file && <Editor file={file} />}</>;
};

export default EditorPane;
