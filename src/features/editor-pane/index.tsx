import MonacoEditor from "../../components/monaco-editor";
import { FileDetail, getFilesSelector } from "../explorer/slice";
import { useAppSelector } from "../../redux/hooks";
import { Center } from "../../components/basic";
import SolidityLogo from "../../assets/solidity_logo_256.png";

type EditorPaneProps = {
  fileIds: string[];
};

const Editor = ({ file }: { file: FileDetail }) => {
  return <MonacoEditor language={file.ext} value={file.content} />;
};

const EditorPane = ({ fileIds }: EditorPaneProps) => {
  const [file] = useAppSelector((state) => getFilesSelector(state, fileIds));
  return (
    <>
      {file ? (
        <Editor file={file} />
      ) : (
        <Center
          sx={{
            height: "100%",
          }}
        >
          <img src={SolidityLogo} alt={"solidity logo"} />
        </Center>
      )}
    </>
  );
};

export default EditorPane;
