import { Project } from "./slice";
import { useMemo } from "react";
import { BranchNode, LeafNode } from "../../components/workspace";
import { getFileExt } from "./utils";

const customNameCompare = (a: string, b: string): number => {
  const ab = [a, b];

  let match = ab.filter((i) => i.indexOf(".") >= 0);
  if (match.length === 1) {
    return match[0] === a ? 1 : -1; // check dir or file, dir first
  }

  match = [a, b].filter((i) => i.startsWith("implementation@"));
  if (match.length === 1) {
    return match[0] === a ? -1 : 1; // check is implementation or not, implementation first
  }

  match = [a, b].filter((i) => i.startsWith("@"));
  if (match.length === 1) {
    return match[0] === a ? -1 : 1; // check if starts with @, @ first
  }

  return a.localeCompare(b);
};

const asNode = (project: Project): BranchNode => {
  type TempNode = Omit<BranchNode, "children"> & {
    children?: Record<string, TempNode>;
    ext?: string;
  };

  const tempRoot: TempNode = {
    id: project.id,
    name: project.name,
    children: {},
  };

  project.filePaths.reduce((root: TempNode, filePath) => {
    const splits = filePath.split("/");
    const final: TempNode = splits
      .slice(0, -1)
      .reduce((cur: TempNode, dirName) => {
        if (!cur.children) {
          throw new Error("Illegal state");
        }

        if (!cur.children[dirName]) {
          cur.children[dirName] = {
            id: `${cur.id}/${dirName}`,
            name: dirName,
            children: {},
          };
        }
        return cur.children[dirName];
      }, root);

    if (!final.children) {
      throw new Error("Illegal state");
    }

    const filName = splits[splits.length - 1];
    const ext = getFileExt(filName);
    final.children[filName] = {
      id: `${final.id}/${filName}`,
      name: filName,
      ext,
    };

    return root;
  }, tempRoot);

  const convert = (node: TempNode): BranchNode | LeafNode => {
    const newNode: BranchNode | LeafNode = {
      id: node.id,
      name: node.name,
    };

    if (node.children) {
      const branchNode = newNode as BranchNode;
      branchNode.children = Object.values(node.children)
        .map(convert)
        .sort((a, b) => customNameCompare(a.name, b.name));
    } else {
      newNode.ext = node.ext;
    }

    return newNode;
  };

  return convert(tempRoot) as BranchNode;
};

export const useTree = (project: Project) => {
  return useMemo(() => asNode(project), [project]);
};
