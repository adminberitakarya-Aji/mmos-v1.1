const execution = await client.run(composition);

for await (const event of execution.stream()) {
    console.log(event);
}