const zmq = require("zeromq");
const readline = require('readline');

async function run() {
  const subSock = new zmq.Subscriber;
  const pushSock = new zmq.Push;

  subSock.connect("tcp://127.0.0.1:3000");
  pushSock.connect("tcp://127.0.0.1:3001");

  subSock.subscribe(""); // Subscribe to all messages

  // Listening for incoming messages
  (async () => {
    for await (const [msg] of subSock) {
      console.log(`Received: ${msg.toString()}`);
    }
  })();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Reading and sending user input
  rl.on('line', (input) => {
    pushSock.send(input);
  });
}

run();
