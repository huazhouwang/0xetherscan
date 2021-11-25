import { TreeItem, TreeView } from "@mui/lab";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExtIcon from "../ext-icons";

type File = {
  id: string;
  name: string;
  ext?: string;
};

type Folder = File & {
  children: Array<Folder | File>;
};

type WorkspaceProps = {
  name: string;
  folders: Folder[];
  onFileClick: (id: string) => void;
};

const getExtName = (name: string) => {
  const dotIndex = name.lastIndexOf(".");
  if (dotIndex < 0) {
    return "";
  }
  return dotIndex >= 0 ? name.slice(dotIndex) : "";
};

const RecursiveTreeNodes = ({
  folders,
  onFileClick,
}: Pick<WorkspaceProps, "folders" | "onFileClick">) => (
  <>
    {folders.map((folder) => (
      <TreeItem
        key={folder.id}
        nodeId={folder.id}
        label={folder.name}
        icon={folder.children.length === 0 ? <FolderOffIcon /> : undefined}
      >
        {folder.children.map((node) =>
          "children" in node ? (
            <RecursiveTreeNodes folders={[node]} onFileClick={onFileClick} />
          ) : (
            <TreeItem
              nodeId={node.id}
              key={node.id}
              label={node.name}
              onClick={() => onFileClick(node.id)}
              icon={<ExtIcon ext={getExtName(node.name)} />}
            />
          )
        )}
      </TreeItem>
    ))}
  </>
);

const Workspace = ({ name, folders, onFileClick }: WorkspaceProps) => {
  return (
    <TreeView
      aria-label={name}
      defaultCollapseIcon={<KeyboardArrowDownIcon />}
      defaultExpandIcon={<KeyboardArrowRightIcon />}
    >
      <RecursiveTreeNodes folders={folders} onFileClick={onFileClick} />
    </TreeView>
  );
};

export default Workspace;
export type { Folder };
