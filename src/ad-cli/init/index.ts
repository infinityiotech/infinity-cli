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
  NodeDependencyType
} from '@schematics/angular/utility/dependencies';
import {
  Schema as AngularApplicationSchema,
  Style
} from '@schematics/angular/application/schema';
import { join, normalize, strings } from '@angular-devkit/core';
import { addDependencies, getDashboardConfig, setDashboardConfig, getProjectAppDirectory } from '../../util';
import { dashboardDependencies, dashboardDevDependencies, dashboardDefaults } from '../config';




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
    const name = _options.name || dashboardDefaults.projectName;
    const routing = _options.routing || true;
    const strict = _options.strict || true;
    const style = _options.style || Style.Scss;
    const ngApplicationOptions: AngularApplicationSchema = {
      name,
      routing,
      strict,
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
    let dashboardConfigJson = getDashboardConfig(tree);
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
