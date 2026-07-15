const workflow = await client.workflow().load("workflow.json");

await workflow.validate();

const execution = await workflow.execute();