import { MMOSClient } from "@mmos-ai/sdk";

async function main() {

    const client = new MMOSClient({

        baseUrl: "http://localhost:8080/api/v1",

        apiKey: "YOUR_API_KEY"
    });

    // ----------------------------------------------------
    // Runtime Health
    // ----------------------------------------------------

    const health = await client.runtime.health();

    console.log("Runtime Status :", health.status);
    console.log("Version        :", health.version);
    console.log("Uptime         :", health.uptime);

    // ----------------------------------------------------
    // Runtime Information
    // ----------------------------------------------------

    const info = await client.runtime.info();

    console.log("\nRuntime");

    console.log("Environment :", info.environment);
    console.log("Mode        :", info.mode);

    // ----------------------------------------------------
    // Registered Providers
    // ----------------------------------------------------

    const providers =
        await client.runtime.providers();

    console.log("\nProviders");

    for (const provider of providers) {

        console.log(
            `${provider.name} (${provider.status})`
        );
    }

    // ----------------------------------------------------
    // Runtime Statistics
    // ----------------------------------------------------

    const stats =
        await client.runtime.stats();

    console.log("\nStatistics");

    console.log(
        "Running Workflows:",
        stats.runningWorkflows
    );

    console.log(
        "Queued Tasks:",
        stats.queuedTasks
    );

    console.log(
        "Active Workers:",
        stats.activeWorkers
    );

    console.log(
        "CPU Usage:",
        stats.cpuUsage
    );

    console.log(
        "Memory Usage:",
        stats.memoryUsage
    );

    // ----------------------------------------------------
    // Graceful Shutdown (Optional)
    // ----------------------------------------------------

    await client.runtime.shutdown();

    console.log("\nRuntime shutdown request accepted.");
}

main().catch(console.error);