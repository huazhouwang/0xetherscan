import { useAppSelector } from "../../redux/hooks";
import { allProjectsSelector, Project } from "./slice";
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

type ExplorerProps = {
  onFileSelected: (fileId: string) => void;
};

const Explorer = ({ onFileSelected }: ExplorerProps) => {
  const allProjects = useAppSelector(allProjectsSelector);

  return (
    <Column>
      {allProjects.map((project) => (
        <ProjectHolder
          key={project.id}
          project={project}
          onNodeTailClick={onFileSelected}
        />
      ))}
    </Column>
  );
};

export default Explorer;
