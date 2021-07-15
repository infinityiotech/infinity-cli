"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.readDir = exports.installApplicationFilesAsDefaultDashboardProject = exports.removeApplicationFilesFromProject = exports.initDashboardConfig = exports.initDashboardDependencies = exports.createNewDashboardApplication = exports.init = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const dependencies_1 = require("@schematics/angular/utility/dependencies");
const schema_1 = require("@schematics/angular/application/schema");
const core_1 = require("@angular-devkit/core");
const util_1 = require("../../util");
const config_1 = require("../config");
function init(_options) {
    return (tree, _context) => __awaiter(this, void 0, void 0, function* () {
        tree = tree;
        return schematics_1.chain([
            initDashboardDependencies(_options),
            initDashboardConfig(_options),
            createNewDashboardApplication(_options)
        ]);
    });
}
exports.init = init;
function createNewDashboardApplication(_options) {
    return (tree, _context) => __awaiter(this, void 0, void 0, function* () {
        tree = tree;
        _options = _options;
        const angularSchematicsPackage = '@schematics/angular';
        const name = _options.name || config_1.dashboardDefaults.projectName;
        const routing = _options.routing || true;
        const strict = _options.strict || true;
        const style = _options.style || schema_1.Style.Scss;
        const ngApplicationOptions = {
            name,
            routing,
            strict,
            style
        };
        return schematics_1.chain([
            schematics_1.externalSchematic(angularSchematicsPackage, 'application', ngApplicationOptions),
            removeApplicationFilesFromProject(ngApplicationOptions),
            installApplicationFilesAsDefaultDashboardProject(ngApplicationOptions)
        ]);
    });
}
exports.createNewDashboardApplication = createNewDashboardApplication;
function initDashboardDependencies(_options) {
    return (tree, _context) => __awaiter(this, void 0, void 0, function* () {
        yield util_1.addDependencies(tree, config_1.dashboardDependencies, dependencies_1.NodeDependencyType.Default);
        yield util_1.addDependencies(tree, config_1.dashboardDevDependencies, dependencies_1.NodeDependencyType.Dev);
        return schematics_1.chain([]);
    });
}
exports.initDashboardDependencies = initDashboardDependencies;
function initDashboardConfig(_options) {
    const dashboardName = _options.name || config_1.dashboardDefaults.projectName;
    return (tree, _context) => __awaiter(this, void 0, void 0, function* () {
        tree = tree;
        _options = _options;
        let dashboardConfigJson = util_1.getDashboardConfig(tree);
        dashboardConfigJson['sourceName'] = dashboardName;
        dashboardConfigJson['entryPoint'] = 'app/dashboard/dashboard.module.ts';
        util_1.setDashboardConfig(tree, dashboardConfigJson);
        return schematics_1.chain([]);
    });
}
exports.initDashboardConfig = initDashboardConfig;
function removeApplicationFilesFromProject(_options) {
    return (tree, _context) => __awaiter(this, void 0, void 0, function* () {
        const targetDir = util_1.getProjectAppDirectory(tree, _options.name);
        targetDir.subfiles.forEach(file => {
            tree.delete(core_1.join(targetDir.path, file));
        });
        return schematics_1.chain([]);
    });
}
exports.removeApplicationFilesFromProject = removeApplicationFilesFromProject;
function installApplicationFilesAsDefaultDashboardProject(_options) {
    return (tree, _context) => __awaiter(this, void 0, void 0, function* () {
        const targetDir = util_1.getProjectAppDirectory(tree, _options.name);
        const templateSource = schematics_1.apply(schematics_1.url('./files/tryit/app'), [
            schematics_1.applyTemplates({
                classify: core_1.strings.classify,
                dasherize: core_1.strings.dasherize,
                name: _options.name
            }),
            schematics_1.move(core_1.normalize(targetDir.path))
        ]);
        return schematics_1.chain([
            schematics_1.mergeWith(templateSource)
        ]);
    });
}
exports.installApplicationFilesAsDefaultDashboardProject = installApplicationFilesAsDefaultDashboardProject;
function readDir(_options) {
    return (tree, _context) => {
        console.log('ttest successful!');
        const newProjectRoot = 'projects';
        const someDir = tree.getDir(newProjectRoot);
        someDir.subdirs.forEach(dir => {
            console.log('dir: ', dir);
        });
        someDir.subfiles.forEach(file => {
            console.log('file: ', file);
        });
        return tree;
    };
}
exports.readDir = readDir;
function test(_options) {
    return (tree, _context) => {
        console.log('ttest successful!');
        return tree;
    };
}
exports.test = test;
//# sourceMappingURL=index.js.map