import { MMOSClient } from "@mmos-ai/sdk";

async function main() {

    const client = new MMOSClient({

        baseUrl: "http://localhost:8080/api/v1",

        apiKey: "YOUR_API_KEY"
    });

    // ----------------------------------------------------
    // Execute Workflow
    // ----------------------------------------------------

    const execution = await client.workflows.execute({

        workflowId: "workflow.pipeline.multimedia-content",

        runtime: {

            provider: "openai",

            model: "gpt-4.1"
        },

        input: {

            topic: "Artificial Intelligence",

            language: "en"
        }
    });

    console.log("Execution:", execution.id);

    // ----------------------------------------------------
    // Wait Until Completed
    // ----------------------------------------------------

    while (true) {

        const status = await client.executions.get(
            execution.id
        );

        console.log("Status:", status.state);

        if (status.state === "completed") {
            break;
        }

        if (status.state === "failed") {
            throw new Error("Workflow execution failed.");
        }

        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // ----------------------------------------------------
    // Retrieve Artifacts
    // ----------------------------------------------------

    const artifacts =
        await client.executions.artifacts(
            execution.id
        );

    console.log("\nArtifacts");

    for (const artifact of artifacts) {

        console.log(
            `${artifact.name} (${artifact.type})`
        );
    }
}

main().catch(console.error);