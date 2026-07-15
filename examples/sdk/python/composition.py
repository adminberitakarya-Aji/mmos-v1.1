from mmos import MMOSClient


def main():

    client = MMOSClient(

        base_url="http://localhost:8080/api/v1",

        api_key="YOUR_API_KEY"
    )

    composition = client.compositions.create(

        name="AI Blog Production",

        description="Generate blog content using AI workflow",

        workflow="workflow.pipeline.multimedia-content",

        runtime={

            "provider": "openai",

            "model": "gpt-4.1"
        },

        input={

            "topic": "Artificial Intelligence",

            "language": "en"
        }
    )

    print(f"Composition ID: {composition.id}")


if __name__ == "__main__":
    main()