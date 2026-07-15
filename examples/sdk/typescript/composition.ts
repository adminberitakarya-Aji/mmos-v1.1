import { MMOSClient } from "@mmos-ai/sdk";

async function main() {

    const client = new MMOSClient({

        baseUrl: "http://localhost:8080/api/v1",

        apiKey: "YOUR_API_KEY"
    });

    const composition = await client.compositions.create({

        name: "AI Blog Production",

        description: "Generate blog content using AI workflow",

        workflow: "workflow.pipeline.multimedia-content",

        runtime: {

            provider: "openai",

            model: "gpt-4.1"
        },

        input: {

            topic: "Artificial Intelligence",

            language: "en"
        }
    });

    console.log("Composition ID:", composition.id);
}

main().catch(console.error);