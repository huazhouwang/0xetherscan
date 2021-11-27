import SplitPane from "../../components/split-pane";
import { useCallback, useEffect, useState } from "react";
import Explorer from "../../features/explorer";
import EditorPane from "../../features/editor-pane";
import { useParams } from "react-router-dom";
import { fetchSourceCodeAsync } from "../../features/explorer/slice";
import { useAppDispatch } from "../../redux/hooks";

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
  const routeParams = useParams();
  const dispatch = useAppDispatch();
  const [fileIds, setFileIds] = useState<string[]>(() => []);

  const onFileSelected = useCallback((id: string) => {
    setFileIds(() => [id]);
  }, []);

  useEffect(() => {
    const { address } = routeParams || {};
    if (address) {
      dispatch(
        fetchSourceCodeAsync({
          chainId: "eth",
          address: address,
        })
      );
    }
  }, []);

  return (
    <SplitPane allowResize split={"vertical"} minSize={"10%"} defaultSize="20%">
      <LeftPanel onFileSelected={onFileSelected} />
      <RightPane fileIds={fileIds} />
    </SplitPane>
  );
};

export default MainPage;
