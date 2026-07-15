from mmos import MMOSClient


def main():

    client = MMOSClient(

        base_url="http://localhost:8080/api/v1",

        api_key="YOUR_API_KEY"
    )

    # ----------------------------------------------------
    # Runtime Health
    # ----------------------------------------------------

    health = client.runtime.health()

    print("Runtime Status :", health.status)
    print("Version        :", health.version)
    print("Uptime         :", health.uptime)

    # ----------------------------------------------------
    # Runtime Information
    # ----------------------------------------------------

    info = client.runtime.info()

    print("\nRuntime")

    print("Environment :", info.environment)
    print("Mode        :", info.mode)

    # ----------------------------------------------------
    # Registered Providers
    # ----------------------------------------------------

    providers = client.runtime.providers()

    print("\nProviders")

    for provider in providers:

        print(
            f"- {provider.name} ({provider.status})"
        )

    # ----------------------------------------------------
    # Runtime Statistics
    # ----------------------------------------------------

    stats = client.runtime.stats()

    print("\nStatistics")

    print("Running Workflows :", stats.running_workflows)
    print("Queued Tasks      :", stats.queued_tasks)
    print("Active Workers    :", stats.active_workers)
    print("CPU Usage         :", stats.cpu_usage)
    print("Memory Usage      :", stats.memory_usage)

    # ----------------------------------------------------
    # Runtime Health Check
    # ----------------------------------------------------

    checks = client.runtime.health_checks()

    print("\nHealth Checks")

    for check in checks:

        print(
            f"- {check.component}: {check.status}"
        )

    # ----------------------------------------------------
    # Runtime Configuration
    # ----------------------------------------------------

    config = client.runtime.configuration()

    print("\nRuntime Configuration")

    print("Execution Mode :", config.mode)
    print("Event Bus      :", config.event_bus)
    print("Memory         :", config.memory)
    print("Cache          :", config.cache)

    # ----------------------------------------------------
    # Graceful Shutdown (Optional)
    # ----------------------------------------------------

    client.runtime.shutdown()

    print("\nRuntime shutdown request accepted.")


if __name__ == "__main__":
    main()