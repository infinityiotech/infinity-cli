import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
export declare function init(_options: any): Rule;
export declare function createNewDashboardApplication(_options: any): Rule;
export declare function initDashboardDependencies(_options: any): Rule;
export declare function initDashboardConfig(_options: any): (tree: Tree, _context: SchematicContext) => Promise<Rule>;
export declare function removeApplicationFilesFromProject(_options: any): Rule;
export declare function installApplicationFilesAsDefaultDashboardProject(_options: any): Rule;
export declare function readDir(_options: any): Rule;
export declare function test(_options: any): Rule;
