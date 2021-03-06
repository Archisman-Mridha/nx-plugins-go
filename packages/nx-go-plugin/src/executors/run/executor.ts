import { RunExecutorSchema } from "./schema"
import { spawn } from "child_process"
import { ExecutorContext } from "@nrwl/devkit"

export default async function runExecutor(options: RunExecutorSchema, context: ExecutorContext) {
    try {
        await new Promise<void>(function(resolve, reject) {

            spawn(`go run ./${ context.workspace.projects[context.projectName].sourceRoot }`, {

                stdio: "inherit",
                shell: true,
                cwd: context.root
            })
                .on("error", reject)
                .on("close", resolve)
        })

        return { success: true }
    } catch(error) {
        console.error(error)

        return { success: false }
    }
}
