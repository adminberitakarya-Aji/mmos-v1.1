package main

import (
	"context"
	"fmt"
	"log"

	"github.com/mmos-ai/sdk-go/mmos"
)

func main() {

	client := mmos.NewClient(mmos.Config{
		BaseURL: "http://localhost:8080/api/v1",
		APIKey:  "YOUR_API_KEY",
	})

	ctx := context.Background()

	// ----------------------------------------------------
	// Runtime Health
	// ----------------------------------------------------

	health, err := client.Runtime.Health(ctx)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Runtime Status :", health.Status)
	fmt.Println("Version        :", health.Version)
	fmt.Println("Uptime         :", health.Uptime)

	// ----------------------------------------------------
	// Runtime Information
	// ----------------------------------------------------

	info, err := client.Runtime.Info(ctx)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Environment :", info.Environment)
	fmt.Println("Mode        :", info.Mode)

	// ----------------------------------------------------
	// Registered Providers
	// ----------------------------------------------------

	providers, err := client.Runtime.Providers(ctx)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("\nAvailable Providers")

	for _, provider := range providers {

		fmt.Printf(
			"- %s (%s)\n",
			provider.Name,
			provider.Status,
		)
	}

	// ----------------------------------------------------
	// Runtime Statistics
	// ----------------------------------------------------

	stats, err := client.Runtime.Stats(ctx)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("\nRuntime Statistics")

	fmt.Println("Running Workflows :", stats.RunningWorkflows)
	fmt.Println("Queued Tasks      :", stats.QueuedTasks)
	fmt.Println("Active Workers    :", stats.ActiveWorkers)
	fmt.Println("CPU Usage         :", stats.CPUUsage)
	fmt.Println("Memory Usage      :", stats.MemoryUsage)

	// ----------------------------------------------------
	// Graceful Shutdown (Optional)
	// ----------------------------------------------------

	err = client.Runtime.Shutdown(ctx)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("\nRuntime shutdown request accepted.")
}