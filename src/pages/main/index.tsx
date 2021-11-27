import SplitPane from "../../components/split-pane";
import { useCallback, useState } from "react";
import Explorer from "../../features/explorer";
import EditorPane from "../../features/editor-pane";

const LeftPanel = ({
  onFileSelected,
}: {
  onFileSelected: (name: string) => void;
}) => {
  return <Explorer onFileSelected={onFileSelected} />;
};

const RightPane = ({ fileIds }: { fileIds: string[] }) => {
  return <EditorPane fileIds={fileIds} />;
};

const MainPage = () => {
  const [fileIds, setFileIds] = useState<string[]>(() => []);

  const onFileSelected = useCallback((id: string) => {
    setFileIds(() => [id]);
  }, []);

  return (
    <SplitPane allowResize split={"vertical"} minSize={"10%"} defaultSize="20%">
      <LeftPanel onFileSelected={onFileSelected} />
      <RightPane fileIds={fileIds} />
    </SplitPane>
  );
};

export default MainPage;
