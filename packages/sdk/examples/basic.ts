const client = new MMOSClient();

const execution = await client.run(composition);

await execution.wait();

console.log(execution.result);