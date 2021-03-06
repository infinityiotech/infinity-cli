import { Rule,
  SchematicContext,
  Tree,
  apply,
  template,
  url,
  mergeWith,
  branchAndMerge,
  chain
 } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
import { getWorkspace } from '@schematics/angular/utility/config';

export function generateFiles(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.logger.info(JSON.stringify(options));

    // since project name is dynamic, we need to retrieve it from the config of the workspace
    const workspace = getWorkspace(tree);
    const project = (Object.keys(workspace.projects)[0]).toString();
    const dir = options.path;
    const projectId = dasherize(options.name);
    const currentStyles = `./src/styles.scss`;
    const angularConfigPath = './angular.json';
    const styles = [`${dir}/${projectId}/global.scss`];

    // delete 'styles.scss' generated by default by schematics
    if (tree.exists(currentStyles)) {
      tree.delete(currentStyles);

      // update angular.json to import `src/styles/global.scss` instead of `src/styles.scss`
      // this operation needs to be done only once, and if `styles.scss` does not exist anymore, it's likely no longer needed!
      const angularJSONBuffer = tree.read('./angular.json');
      if (!angularJSONBuffer) {
        return;
      }

      const rawAngularConfig = JSON.parse(angularJSONBuffer.toString('utf8'));
      // we update the property with the new value for global
      rawAngularConfig.projects[project].architect['build'].options['styles'] = styles;

      const updatedAngularConfig = {
        ...rawAngularConfig
      };

      tree.overwrite(angularConfigPath, JSON.stringify(updatedAngularConfig, null, 2));
    }

    // we need to define a source, which conventionally is the files folder inside of the schematics folder
    const source = apply(url('./files'), [
      template({
        // option `flat` if true, creates the file/directory at top level,
        // otherwise skips generation
        isFlat: (s: string) => (options.flat ? '' : s),
        ...strings,
        ...(options as object)
      } as any),
      // since before it was created always at top level,
      // we needed to move it under the right path
      // but not anylonger
      // move(dir),
    ]);

    return chain([branchAndMerge(chain([mergeWith(source)]))])(tree, _context);
  };
}

