import { generateFiles, Tree } from "@nrwl/devkit"
import { join } from "path"
import { CLIOptions } from "../schema"

export function updateWorkspaceConfiguration(tree: Tree, providedOptions: CLIOptions) {

    if(! tree.exists("go.work"))
        generateFiles(tree, join(__dirname, "../files/init"), ".", { })

    const updatedWorkspaceConfiguration=
        tree.read("go.work")
            .toString( )
            .split("\n")
            .reduce(
                (accumulator, currentLine) => {
                    if(currentLine === ")")
                        accumulator += "\n" + `    apps/${ providedOptions.projectName }`

                    accumulator += "\n" + currentLine

                    return accumulator
                }
            )

    tree.write("go.work", updatedWorkspaceConfiguration)
}
