import { TreeItem, TreeItemProps, TreeView } from "@mui/lab";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExtIcon from "../ext-icons";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

type LeafNode = {
  id: string;
  name: string;
  ext?: string;
};

type BranchNode = Omit<LeafNode, "ext"> & {
  children: Array<BranchNode | LeafNode>;
};

export type WorkspaceProps = {
  id: string;
  name: string;
  node: BranchNode;
  onNodeTailClick: (id: string) => void;
  onProjectDeleteClick: () => void;
};

const StyledTreeItem = (props: TreeItemProps) => (
  <TreeItem
    {...props}
    ContentProps={{
      style: { height: "40px" },
      ...(props.ContentProps || {}),
    }}
  />
);

const RecursiveNode = ({
  node,
  onNodeTailClick,
}: {
  node: BranchNode | LeafNode;
  onNodeTailClick: (id: string) => void;
}) => (
  <>
    {"children" in node ? (
      <StyledTreeItem
        nodeId={node.id}
        key={node.id}
        label={node.name}
        icon={node.children.length === 0 ? <FolderOffIcon /> : undefined}
      >
        {node.children.map((i) => (
          <RecursiveNode
            key={i.id}
            node={i}
            onNodeTailClick={onNodeTailClick}
          />
        ))}
      </StyledTreeItem>
    ) : (
      <StyledTreeItem
        nodeId={node.id}
        key={node.id}
        label={node.name}
        onClick={() => onNodeTailClick(node.id)}
        icon={<ExtIcon ext={node.ext || ""} />}
      />
    )}
  </>
);

const Workspace = ({
  id,
  name,
  node,
  onNodeTailClick,
  onProjectDeleteClick,
}: WorkspaceProps) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <>
      <TreeView
        ref={setMenuAnchorEl}
        onContextMenu={(e) => {
          e.preventDefault();
          setOpenMenu(true);
        }}
        disableSelection
        key={id}
        aria-label={name}
        defaultCollapseIcon={<KeyboardArrowDownIcon />}
        defaultExpandIcon={<KeyboardArrowRightIcon />}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          overflowX: "clip",
        }}
      >
        <RecursiveNode node={node} onNodeTailClick={onNodeTailClick} />
      </TreeView>
      <Menu
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        anchorEl={menuAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem onClick={onProjectDeleteClick}>
          <ListItemIcon>
            <DeleteIcon sx={{ color: "inherit" }} />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Workspace;
export type { BranchNode, LeafNode };
