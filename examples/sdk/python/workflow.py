from time import sleep

from mmos import MMOSClient


def main():

    client = MMOSClient(

        base_url="http://localhost:8080/api/v1",

        api_key="YOUR_API_KEY"
    )

    # ----------------------------------------------------
    # Execute Workflow
    # ----------------------------------------------------

    execution = client.workflows.execute(

        workflow_id="workflow.pipeline.multimedia-content",

        runtime={

            "provider": "openai",

            "model": "gpt-4.1"
        },

        input={

            "topic": "Artificial Intelligence",

            "language": "en"
        }
    )

    print(f"Execution: {execution.id}")

    # ----------------------------------------------------
    # Wait Until Completed
    # ----------------------------------------------------

    while True:

        status = client.executions.get(
            execution.id
        )

        print(f"Status: {status.state}")

        if status.state == "completed":
            break

        if status.state == "failed":
            raise RuntimeError(
                "Workflow execution failed."
            )

        sleep(2)

    # ----------------------------------------------------
    # Retrieve Artifacts
    # ----------------------------------------------------

    artifacts = client.executions.artifacts(
        execution.id
    )

    print("\nArtifacts")

    for artifact in artifacts:

        print(
            f"- {artifact.name} ({artifact.type})"
        )


if __name__ == "__main__":
    main()