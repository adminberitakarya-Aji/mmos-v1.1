package main

import (
	"context"
	"fmt"

	"github.com/mmos-ai/sdk-go/mmos"
)

func main() {

	client := mmos.NewClient(mmos.Config{
		BaseURL: "http://localhost:8080/api/v1",
		APIKey:  "YOUR_API_KEY",
	})

	composition := mmos.Composition{

		Name:        "AI Blog Production",

		Description: "Generate blog content using AI workflow",

		Workflow: "workflow.pipeline.multimedia-content",

		Runtime: mmos.RuntimeConfig{
			Provider: "openai",
			Model:    "gpt-4.1",
		},

		Input: map[string]any{
			"topic":    "Artificial Intelligence",
			"language": "en",
		},
	}

	result, err := client.Compositions.Create(
		context.Background(),
		composition,
	)

	if err != nil {
		panic(err)
	}

	fmt.Println("Composition ID:", result.ID)
}