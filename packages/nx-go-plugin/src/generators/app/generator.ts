import { addProjectConfiguration, formatFiles, generateFiles, getWorkspaceLayout, Tree } from "@nrwl/devkit"
import { join } from "path"
import { CLIOptions } from "./schema"
import { updateWorkspaceConfiguration } from "./utils/update-workspace-configuration.util"

export default async function(tree: Tree, providedOptions: CLIOptions) {
    providedOptions.projectRoot= `${ getWorkspaceLayout(tree).appsDir }/${ providedOptions.projectName }`

    addProjectConfiguration(tree, providedOptions.projectName, {

        root: providedOptions.projectRoot,
        projectType: "application",
        sourceRoot: providedOptions.projectRoot,
        targets: {

			run: {
				executor: "nx-go-plugin:run"
			}
        }
    })

    addFilesToTree(tree, providedOptions)
    updateWorkspaceConfiguration(tree, providedOptions)

    formatFiles(tree)
}

function addFilesToTree(tree: Tree, providedOptions: CLIOptions) {
    generateFiles(

        tree,
        join(__dirname, `files/project/${ providedOptions.usesGraphQL ? "graphql": "rest" }`),
        providedOptions.projectRoot,
        { projectName: providedOptions.projectName, template: "" }
    )

    if(providedOptions.dockerize)
        generateFiles(tree, join(__dirname, "files/dockerfiles"), providedOptions.projectRoot, { })
}
