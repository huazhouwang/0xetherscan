import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { allProjectsSelector, fetchSourceCodeAsync, Project } from "./slice";
import { useEffect } from "react";
import { Column } from "../../components/basic";
import { useTree } from "./hooks";
import Workspace from "../../components/workspace";

const ProjectHolder = ({
  project,
  onNodeTailClick,
}: {
  project: Project;
  onNodeTailClick: (id: string) => void;
}) => {
  const node = useTree(project);
  return (
    <Workspace
      id={project.id}
      name={project.name}
      node={node}
      onNodeTailClick={onNodeTailClick}
    />
  );
};

const Explorer = () => {
  const dispatch = useAppDispatch();
  const allProjects = useAppSelector(allProjectsSelector);

  useEffect(() => {
    dispatch(
      fetchSourceCodeAsync({
        chainId: "eth",
        address: "0xe592427a0aece92de3edee1f18e0157c05861564",
      })
    )
      .then(() =>
        dispatch(
          fetchSourceCodeAsync({
            chainId: "eth",
            address: "0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95",
          })
        )
      )
      .then(() =>
        dispatch(
          fetchSourceCodeAsync({
            chainId: "eth",
            address: "0x011a014d5e8eb4771e575bb1000318d509230afa",
          })
        )
      );
  }, []);

  const onNodeTailClick = (id: string) => {
    console.log("click: ", id);
  };

  return (
    <Column>
      {allProjects.map((project) => (
        <ProjectHolder
          key={project.id}
          project={project}
          onNodeTailClick={onNodeTailClick}
        />
      ))}
    </Column>
  );
};

export default Explorer;
