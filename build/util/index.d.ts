/// <reference types="node" />
import { Tree } from "@angular-devkit/schematics";
import { NodeDependency, NodeDependencyType } from "@schematics/angular/utility/dependencies";
export declare function getJson(tree: Tree, path: string, defaultStructure?: {}): any;
export declare function getDashboardConfig(tree: Tree): any;
export declare function read(tree: Tree, path: string, defaultValue?: string): string;
export declare function write(tree: Tree, path: string, content: string | Buffer): void;
export declare function setDashboardConfig(tree: Tree, jsonObject: any): void;
export declare function getWorkspace(tree: Tree): any;
export declare function getWorkspaceProject(tree: Tree, name: string): any;
export declare function getProjectAppDirectory(tree: Tree, name: string): import("@angular-devkit/schematics").DirEntry;
export declare function addDependencyNode(tree: Tree, nodeDependency: NodeDependency): Promise<Tree>;
export declare function addDependencies(tree: Tree, nodeDependencies: any, type: NodeDependencyType): Promise<Tree>;
