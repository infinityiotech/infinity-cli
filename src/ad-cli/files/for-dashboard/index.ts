import {
  Rule, Tree, SchematicContext, SchematicsException, apply,
  url, template, chain, branchAndMerge, mergeWith} from '@angular-devkit/schematics';

// import { standardFileConverter } from '../generate-files';
import { experimental, strings } from '@angular-devkit/core';

// export function standardFileConverter(options: any): Rule {
//   return (tree: Tree, _context: SchematicContext) => {
//     _context.logger.info(JSON.stringify(options));
//     const workspaceConfig = tree.read('/angular.json');
//     if (!workspaceConfig) {
//       throw new SchematicsException('Could not find Angular workspace configuration');
//     }
//   // convert workspace to string
//     const workspaceContent = workspaceConfig.toString();

//   // parse workspace string into JSON object
//     const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(workspaceContent);
//     if (!options.project) {
//       options.project = workspace.defaultProject;
//     }

//     const projectName = options.project as string;

//     const project = workspace.projects[projectName];

//     const projectType = project.projectType === 'application' ? 'app' : 'lib';

//     if (options.path === undefined) {
//     options.path = `${project.sourceRoot}/${projectType}`;
//   }



//     // we need to define a source, which conventionally is the files folder inside of the schematics folder
//     const source = apply(url('./files'), [
//       template({
//         // option `flat` if true, creates the file/directory at top level,
//         // otherwise skips generation
//         isFlat: (s: string) => (options.flat ? '' : s),
//         ...strings,
//         ...(options as object)
//       } as any),
//       // since before it was created always at top level,
//       // we needed to move it under the right path
//       // but not anylonger
//       // move(dir),
//     ]);

//     return chain([branchAndMerge(chain([mergeWith(source)]))])(tree, _context);
//   };
// }

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function forDashboard(options: any): Rule {
  return standardFileConverter(options);
}
