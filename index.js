const zmq = require("zeromq")

async function run() {
  const sock = new zmq.Push

  await sock.bind("tcp://127.0.0.1:3000")
  console.log("Producer bound to port 3000")
  
  const sock1 = new zmq.Push

  await sock1.bind("tcp://127.0.0.1:3001")
  console.log("Producer bound to port 3001")


  while (true) {
    await sock.send("some work hugygy")
    await new Promise(resolve => { setTimeout(resolve, 500) })
	    await sock1.send("some work hugygy 2")
    await new Promise(resolve => { setTimeout(resolve, 500) })
  }
}

run()