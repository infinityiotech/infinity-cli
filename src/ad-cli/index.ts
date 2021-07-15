import { 
  Rule, 
  SchematicContext, 
  Tree,
  externalSchematic,
  chain,
  applyTemplates,
  move,
  mergeWith,
  apply,
  url,
} from '@angular-devkit/schematics';
import {
  NodeDependency,
  NodeDependencyType,
  addPackageJsonDependency
} from '@schematics/angular/utility/dependencies';
import {
  Schema as AngularApplicationSchema,
  Style
} from '@schematics/angular/application/schema';
//import { spawn } from 'child_process';
import { join, normalize, strings } from '@angular-devkit/core';


const dashboardDependencies = {
  "@angular/animations": "~11.0.3",
  "@angular/flex-layout": "^11.0.0-beta.33",
  "@angular/material": "^11.0.2",
  "@fortawesome/angular-fontawesome": "^0.4.0",
  "@fortawesome/fontawesome-svg-core": "^1.2.17",
  "@fortawesome/free-brands-svg-icons": "^5.8.1",
  "@fortawesome/free-solid-svg-icons": "^5.8.1",
  "@ngrx/store": "^10.1.0",
  "@swimlane/ngx-charts": "^16.0.0",
  "bootstrap": "^4.3.1",
  "hammerjs": "^2.0.8",
};
const dashboardDevDependencies = {
  "@schematics/angular": "^12.1.1"
}
const dashboardDefaults = {
  projectName: 'ad-dashboard',
  configFileName: '/ad-dashboard-config.json'
}

export function init(_options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    tree = tree;
    return chain([
      initDashboardDependencies(_options),
      initDashboardConfig(_options),
      createNewDashboardApplication(_options)
    ]);
  };
}
export function createNewDashboardApplication(_options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    tree = tree;
    _options = _options;
    const angularSchematicsPackage = '@schematics/angular';
    const name = _options.name;
    const routing = _options.name || true;
    const strict = _options.strict || true;
    const legacyBrowsers = _options.legacyBrowsers || false;
    const style = _options.style || Style.Scss;
    const ngApplicationOptions: AngularApplicationSchema = {
      name,
      routing,
      strict,
      legacyBrowsers,
      style
    };
    
    return chain([
      externalSchematic(angularSchematicsPackage, 'application', ngApplicationOptions),
      removeApplicationFilesFromProject(ngApplicationOptions),
      installApplicationFilesAsDefaultDashboardProject(ngApplicationOptions)
    ]);
  };
}

export function initDashboardDependencies(_options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    
    await addDependencies(tree, dashboardDependencies, NodeDependencyType.Default);
    await addDependencies(tree, dashboardDevDependencies, NodeDependencyType.Dev);
    return chain([
    ]);
  };
}

export function initDashboardConfig(_options: any){
  const dashboardName = _options.name|| dashboardDefaults.projectName;
  return async (tree: Tree, _context: SchematicContext) => {
    tree = tree;
    _options = _options;
    let dashboardConfigJson = getDashboardConfig(tree) || {
      "applications":{
      }
    };
    dashboardConfigJson['sourceName'] = dashboardName;
    dashboardConfigJson['entryPoint'] = 'app/dashboard/dashboard.module.ts';
    setDashboardConfig(tree, dashboardConfigJson);
    return chain([
    ]);
  };
}
export function removeApplicationFilesFromProject(_options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    const targetDir = getProjectAppDirectory(tree, _options.name);
    targetDir.subfiles.forEach(file=>{
      tree.delete(join( targetDir.path, file ))
    })
    return chain([]);
  };
}

export function installApplicationFilesAsDefaultDashboardProject(_options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    const targetDir = getProjectAppDirectory(tree, _options.name);
    const templateSource = apply(url('./files/tryit/app'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: _options.name
      }),
      move(normalize(targetDir.path))
    ]);
    return chain([
      mergeWith(templateSource)
    ]);
  };
}
export function readDir(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    console.log('ttest successful!');
    const newProjectRoot = 'projects';
    const someDir = tree.getDir(newProjectRoot);
    someDir.subdirs.forEach(dir=>{
      console.log('dir: ', dir);
    })
    someDir.subfiles.forEach(file=>{
      console.log('file: ', file);
    })
    return tree;
  };
}
export function test(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    console.log('ttest successful!');
    
    return tree;
  };
}
function getDashboardConfig(tree: Tree){
  const angularJSONBuffer = tree.read(dashboardDefaults.configFileName);
  if (!angularJSONBuffer) {
    return;
  }
  return JSON.parse(angularJSONBuffer.toString('utf8'));
}
function setDashboardConfig(tree: Tree, jsonObject:any){
  tree.overwrite(dashboardDefaults.configFileName, JSON.stringify(jsonObject, null, 2));
}

function getWorkspace(tree: Tree){
  const angularJSONBuffer = tree.read('./angular.json');
  if (!angularJSONBuffer) {
    return;
  }
  return JSON.parse(angularJSONBuffer.toString('utf8'));
}
function getWorkspaceProject(tree: Tree, name: string){
  const angularJson = getWorkspace(tree);
  return angularJson.projects[name];
}
function getProjectAppDirectory(tree: Tree, name: string){
  const projectWorkspaceConfig = getWorkspaceProject(tree, name);
  const rootProjectDir = tree.getDir(projectWorkspaceConfig.root);
  return tree.getDir(join(rootProjectDir.path, '/src/app'));
}
async function  addDependencyNode(tree: Tree, nodeDependency: NodeDependency):Promise<Tree> {
    console.log('addDependency', nodeDependency.name);
    await addPackageJsonDependency(tree, nodeDependency);
    return tree;
}
async function addDependencies(tree: Tree, nodeDependencies: any, type: NodeDependencyType):Promise<Tree> {
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
