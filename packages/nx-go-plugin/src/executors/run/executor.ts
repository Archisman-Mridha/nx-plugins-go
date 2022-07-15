import { RunExecutorSchema } from "./schema"
import { spawn } from "child_process"
import { ExecutorContext } from "@nrwl/devkit"

// value of context :
// {
//     root: '/home/archi/Documents/go-microservices',
//     target: { executor: 'nx-go-plugin:run' },
//     workspace: { projects: { auth: {
//         root: 'apps/auth',
//         '$schema': '../../node_modules/nx/schemas/project-schema.json',
//         projectType: 'application',
//         sourceRoot: 'apps/auth',
//         targets: { run: { executor: 'nx-go-plugin:run' } },
//         tags: [],
//         files: [] }, version: 2
//     },
//     projectName: 'auth',
//     targetName: 'run',
//     configurationName: undefined,
//     cwd: '/home/archi/Documents/go-microservices',
//     isVerbose: false
// }

export default async function runExecutor(options: RunExecutorSchema, context: ExecutorContext) {
    try {
        await new Promise<void>(function(resolve, reject) {

            spawn(`go run ./${ context.workspace.projects[context.projectName].sourceRoot }`, {

                stdio: "inherit",
                shell: true,
                cwd: context.root
            })
                .on("error", reject)
                .on("close", ( ) => resolve( ))
        })

        return { success: true }
    } catch(error) {
        console.error(error)

        return { success: false }
    }
}
