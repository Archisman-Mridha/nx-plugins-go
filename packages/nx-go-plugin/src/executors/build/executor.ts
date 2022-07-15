import { BuildExecutorSchema } from "./schema"
import { spawn } from "child_process"
import { ExecutorContext } from "@nrwl/devkit"

export default async function buildExecutor(options: BuildExecutorSchema, context: ExecutorContext) {
    try {
        await new Promise<void>(function(resolve, reject) {

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            spawn(`go build ./${ context.workspace.projects[context.projectName!].sourceRoot } -o ./${ context.workspace.projects[context.projectName!].sourceRoot }/build`, {

                stdio: "inherit",
                shell: true,
                cwd: context.root
            })
                .on("error", reject)
                .on("exit", resolve)
        })

        return { success: true }
    } catch(error) {
        console.error(error)

        return { success: false }
    }
}
