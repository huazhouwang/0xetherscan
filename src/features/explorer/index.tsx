import { useAppSelector } from "../../redux/hooks";
import { allProjectsSelector, Project } from "./slice";
import { Column, Row } from "../../components/basic";
import { useTree } from "./hooks";
import Workspace from "../../components/workspace";
import { Divider, IconButton, List, ListItem, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type ExplorerProps = {
  onImportClick: () => void;
  onFileSelected: (fileId: string) => void;
};

const Header = ({ onImportClick }: Pick<ExplorerProps, "onImportClick">) => {
  return (
    <Row
      sx={{
        height: "64px",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#bbbbbb",
      }}
    >
      <Typography
        variant={"overline"}
        display={"block"}
        align={"center"}
        sx={{ marginLeft: "8px", fontSize: "16px" }}
      >
        Explorer
      </Typography>
      <IconButton onClick={onImportClick} sx={{ color: "inherit" }}>
        <AddIcon />
      </IconButton>
    </Row>
  );
};

const ProjectHolder = ({
  project,
  onFileSelected,
}: Pick<ExplorerProps, "onFileSelected"> & {
  project: Project;
}) => {
  const node = useTree(project);
  return (
    <Workspace
      id={project.id}
      name={project.name}
      node={node}
      onNodeTailClick={onFileSelected}
    />
  );
};

const Explorer = ({ onImportClick, onFileSelected }: ExplorerProps) => {
  const allProjects = useAppSelector(allProjectsSelector);

  return (
    <Column>
      <Header onImportClick={onImportClick} />
      <Divider />
      <List>
        {allProjects.map((project) => (
          <>
            <ListItem key={project.id} disablePadding>
              <ProjectHolder
                project={project}
                onFileSelected={onFileSelected}
              />
            </ListItem>
            <Divider orientation={"horizontal"} light variant={"middle"} />
          </>
        ))}
      </List>
    </Column>
  );
};

export default Explorer;
