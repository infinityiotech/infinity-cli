import { Tree } from "@angular-devkit/schematics";
import { NodeDependency, addPackageJsonDependency, NodeDependencyType } from "@schematics/angular/utility/dependencies";
import { join } from "path";
import { dashboardDefaults } from "../ad-cli/config";

export function getJson(tree: Tree, path:string, defaultStructure = {}){
    try{
      const dashboardJSONString = read(tree, path);
      if(!dashboardJSONString){
        return defaultStructure;
      }
      return JSON.parse(dashboardJSONString);
    }
    catch(e){
      return defaultStructure;
    }
  }
  
  export  function getDashboardConfig(tree: Tree){
    const defaultStructure = {
      "applications":{
      }
    };
    return getJson(tree, dashboardDefaults.configFileName, defaultStructure);
  }
  
  export  function read(tree: Tree, path: string, defaultValue: string = ""){
    if(tree.exists(path)){
      try{
      const resultBuffer = tree.read(path);
        if(!resultBuffer){
          return defaultValue;
        }
        return resultBuffer.toString('utf8');
      }
      catch(e){
        return defaultValue;
      }
    }
    return defaultValue;
  }

  export function write(tree: Tree, path: string, content: string | Buffer){
    if(!tree.exists(path)){
      tree.create(path, content);
      return;
    }
    tree.overwrite(path, content);
  }

  export function setDashboardConfig(tree: Tree, jsonObject:any){
    write(tree, dashboardDefaults.configFileName, JSON.stringify(jsonObject, null, 2));
  }
  
  export function getWorkspace(tree: Tree){
    const angularJSONBuffer = tree.read('/angular.json');
    if (!angularJSONBuffer) {
      return;
    }
    return JSON.parse(angularJSONBuffer.toString('utf8'));
  }
  export function getWorkspaceProject(tree: Tree, name: string){
    const angularJson = getWorkspace(tree);
    return angularJson.projects[name];
  }
  export function getProjectAppDirectory(tree: Tree, name: string){
    const projectWorkspaceConfig = getWorkspaceProject(tree, name);
    const rootProjectDir = tree.getDir(projectWorkspaceConfig.root);
    return tree.getDir(join(rootProjectDir.path, '/src/app'));
  }
  export async function  addDependencyNode(tree: Tree, nodeDependency: NodeDependency):Promise<Tree> {
      console.log('addDependency', nodeDependency.name);
      await addPackageJsonDependency(tree, nodeDependency);
      return tree;
  }
  export async function addDependencies(tree: Tree, nodeDependencies: any, type: NodeDependencyType):Promise<Tree> {
    for (let nodeDependencyName in nodeDependencies){
      const dep: NodeDependency = {
        type: type,
        name: nodeDependencyName,
        version: nodeDependencies[nodeDependencyName],
        overwrite: true,
      };
      await addDependencyNode(tree, dep);
    }
    return tree;
  }
  