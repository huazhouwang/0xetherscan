import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { allProjectsSelector, Project, removeProjectById } from "./slice";
import { Column, Row } from "../../components/basic";
import { useTree } from "./hooks";
import Workspace, { WorkspaceProps } from "../../components/workspace";
import { Divider, IconButton, List, ListItem, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

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
  onNodeTailClick,
  onProjectDeleteClick,
}: Pick<WorkspaceProps, "onNodeTailClick" | "onProjectDeleteClick"> & {
  project: Project;
}) => {
  const node = useTree(project);
  return (
    <Workspace
      id={project.id}
      name={project.name}
      node={node}
      onNodeTailClick={onNodeTailClick}
      onProjectDeleteClick={onProjectDeleteClick}
    />
  );
};

const Explorer = ({ onImportClick, onFileSelected }: ExplorerProps) => {
  const dispatch = useAppDispatch();
  const allProjects = useAppSelector(allProjectsSelector);

  return (
    <Column>
      <Header onImportClick={onImportClick} />
      <Divider />
      <List>
        {allProjects.reduce((acc, project) => {
          acc.push(
            <ListItem key={project.id} disablePadding>
              <ProjectHolder
                project={project}
                onNodeTailClick={onFileSelected}
                onProjectDeleteClick={() =>
                  dispatch(removeProjectById(project.id))
                }
              />
            </ListItem>
          );
          acc.push(
            <Divider
              key={`${project.id}_divider`}
              orientation={"horizontal"}
              light
              variant={"middle"}
            />
          );
          return acc;
        }, [] as React.ReactNode[])}
      </List>
    </Column>
  );
};

export default Explorer;
