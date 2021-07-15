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
exports.addDependencies = exports.addDependencyNode = exports.getProjectAppDirectory = exports.getWorkspaceProject = exports.getWorkspace = exports.setDashboardConfig = exports.write = exports.read = exports.getDashboardConfig = exports.getJson = void 0;
const dependencies_1 = require("@schematics/angular/utility/dependencies");
const path_1 = require("path");
const config_1 = require("../ad-cli/config");
function getJson(tree, path, defaultStructure = {}) {
    try {
        const dashboardJSONString = read(tree, path);
        if (!dashboardJSONString) {
            return defaultStructure;
        }
        return JSON.parse(dashboardJSONString);
    }
    catch (e) {
        return defaultStructure;
    }
}
exports.getJson = getJson;
function getDashboardConfig(tree) {
    const defaultStructure = {
        "applications": {}
    };
    return getJson(tree, config_1.dashboardDefaults.configFileName, defaultStructure);
}
exports.getDashboardConfig = getDashboardConfig;
function read(tree, path, defaultValue = "") {
    if (tree.exists(path)) {
        try {
            const resultBuffer = tree.read(path);
            if (!resultBuffer) {
                return defaultValue;
            }
            return resultBuffer.toString('utf8');
        }
        catch (e) {
            return defaultValue;
        }
    }
    return defaultValue;
}
exports.read = read;
function write(tree, path, content) {
    if (!tree.exists(path)) {
        tree.create(path, content);
        return;
    }
    tree.overwrite(path, content);
}
exports.write = write;
function setDashboardConfig(tree, jsonObject) {
    write(tree, config_1.dashboardDefaults.configFileName, JSON.stringify(jsonObject, null, 2));
}
exports.setDashboardConfig = setDashboardConfig;
function getWorkspace(tree) {
    const angularJSONBuffer = tree.read('/angular.json');
    if (!angularJSONBuffer) {
        return;
    }
    return JSON.parse(angularJSONBuffer.toString('utf8'));
}
exports.getWorkspace = getWorkspace;
function getWorkspaceProject(tree, name) {
    const angularJson = getWorkspace(tree);
    return angularJson.projects[name];
}
exports.getWorkspaceProject = getWorkspaceProject;
function getProjectAppDirectory(tree, name) {
    const projectWorkspaceConfig = getWorkspaceProject(tree, name);
    const rootProjectDir = tree.getDir(projectWorkspaceConfig.root);
    return tree.getDir(path_1.join(rootProjectDir.path, '/src/app'));
}
exports.getProjectAppDirectory = getProjectAppDirectory;
function addDependencyNode(tree, nodeDependency) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('addDependency', nodeDependency.name);
        yield dependencies_1.addPackageJsonDependency(tree, nodeDependency);
        return tree;
    });
}
exports.addDependencyNode = addDependencyNode;
function addDependencies(tree, nodeDependencies, type) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let nodeDependencyName in nodeDependencies) {
            const dep = {
                type: type,
                name: nodeDependencyName,
                version: nodeDependencies[nodeDependencyName],
                overwrite: true,
            };
            yield addDependencyNode(tree, dep);
        }
        return tree;
    });
}
exports.addDependencies = addDependencies;
//# sourceMappingURL=index.js.map