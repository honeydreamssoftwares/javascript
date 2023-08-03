const zmq = require("zeromq");

async function run() {
  const pubSock = new zmq.Publisher;
  const pullSock = new zmq.Pull;

  await pubSock.bind("tcp://127.0.0.1:3000");
  await pullSock.bind("tcp://127.0.0.1:3001");

  console.log("Server ready.");

  // Broadcast messages coming from clients
  for await (const [msg] of pullSock) {
    pubSock.send(msg);
    console.log(`Broadcasting: ${msg.toString()}`);
  }
}

run();
