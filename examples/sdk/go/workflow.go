package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/mmos-ai/sdk-go/mmos"
)

func main() {

	client := mmos.NewClient(mmos.Config{
		BaseURL: "http://localhost:8080/api/v1",
		APIKey:  "YOUR_API_KEY",
	})

	ctx := context.Background()

	// Execute workflow
	execution, err := client.Workflows.Execute(
		ctx,
		mmos.ExecuteWorkflowRequest{

			WorkflowID: "workflow.pipeline.multimedia-content",

			Runtime: mmos.RuntimeConfig{
				Provider: "openai",
				Model:    "gpt-4.1",
			},

			Input: map[string]any{
				"topic":    "Artificial Intelligence",
				"language": "en",
			},
		},
	)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Execution:", execution.ID)

	// Poll execution status
	for {

		status, err := client.Executions.Get(
			ctx,
			execution.ID,
		)

		if err != nil {
			log.Fatal(err)
		}

		fmt.Println("Status:", status.State)

		if status.State == "completed" {
			break
		}

		if status.State == "failed" {
			log.Fatal("workflow failed")
		}

		time.Sleep(2 * time.Second)
	}

	// Get artifacts
	artifacts, err := client.Executions.Artifacts(
		ctx,
		execution.ID,
	)

	if err != nil {
		log.Fatal(err)
	}

	for _, artifact := range artifacts {

		fmt.Printf(
			"%s (%s)\n",
			artifact.Name,
			artifact.Type,
		)
	}
}