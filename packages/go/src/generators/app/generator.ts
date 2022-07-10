import { addProjectConfiguration, formatFiles, generateFiles, Tree } from "@nrwl/devkit"
import { join } from "path"
import { CLIOptions } from "./schema"
import { updateWorkspaceConfiguration } from "./utils/update-workspace-configuration.util"

export default async function(tree: Tree, providedOptions: CLIOptions) {
    addProjectConfiguration(tree, providedOptions.projectName, {

        root: `apps/${ providedOptions.projectName }`,
        projectType: "application",
        sourceRoot: `apps/${ providedOptions.projectName }`,
        targets: { }
    })

    addFilesToTree(tree, providedOptions)
    updateWorkspaceConfiguration(tree, providedOptions)

    formatFiles(tree)
}

function addFilesToTree(tree: Tree, providedOptions: CLIOptions) {
    generateFiles(

        tree,
        join(__dirname, `files/project/${ providedOptions.usesGraphQL ? "graphql": "rest" }`),
        `apps/${ providedOptions.projectName }`,
        { projectName: providedOptions.projectName, template: "" }
    )
}
