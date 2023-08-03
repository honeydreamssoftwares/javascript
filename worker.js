const zmq = require("zeromq")

async function run() {
  const sock = new zmq.Pull
  const sock2 = new zmq.Pull

  sock.connect("tcp://127.0.0.1:3000")
  console.log("Worker connected to port 3000")
    sock.connect("tcp://127.0.0.1:3001")
  console.log("Worker connected to port 3001")

  for await (const [msg] of sock) {
    console.log("work: %s", msg.toString())
  }
   for await (const [msg] of sock2) {
    console.log("work: %s", msg.toString())
  }
}

run()