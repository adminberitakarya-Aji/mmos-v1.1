const artifact = await client.artifact().upload("./image.png");

console.log(artifact.id);

await client.artifact().download(artifact.id);