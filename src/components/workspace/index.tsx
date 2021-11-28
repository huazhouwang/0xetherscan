import { TreeItem, TreeItemProps, TreeView } from "@mui/lab";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExtIcon from "../ext-icons";

type LeafNode = {
  id: string;
  name: string;
  ext?: string;
};

type BranchNode = Omit<LeafNode, "ext"> & {
  children: Array<BranchNode | LeafNode>;
};

type WorkspaceProps = {
  id: string;
  name: string;
  node: BranchNode;
  onNodeTailClick: (id: string) => void;
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

const Workspace = ({ id, name, node, onNodeTailClick }: WorkspaceProps) => {
  return (
    <TreeView
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
  );
};

export default Workspace;
export type { BranchNode, LeafNode };
