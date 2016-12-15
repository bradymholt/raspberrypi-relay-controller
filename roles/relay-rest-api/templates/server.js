'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: 3000 });

const rpio = require('rpio');
const defaultPinOnDuration = 500;
const relayToGpioPinMapping = {
    '1': 12,
    '2': 13
};

// Test: curl -X PUT -D - -H "Content-Type: application/json" -d '{ "relay":{"state":"closed"}}' http://localhost:3000/relays/1
server.route({
    method: 'PUT',
    path: '/relays/{number}',
    handler: function (request, reply) {
        let relayNumber = request.params.number;
        let relay = request.payload.relay;
        if (relay.state === "closed") {
            let relayPin = relayToGpioPinMapping[relayNumber];
            let duration = Number(relay.close_duration || defaultPinOnDuration);
            console.log(JSON.stringify(relay));
            toggleGpioPinOn(relayPin, duration);
        }

        reply().code(204);
    }
});

// Start hapi.js HTTP server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

// Broadcast API metadata to UDP socket for discovery by other devices
const broadcastSocket = dgram.createSocket("udp4");
const os = require('os');
const broadcastPort = 41234;
const broadcastMessage = "Relay API";
const broadcastIntervalMilliseconds = 60000;
const broadcastInterface = Object.keys(os.networkInterfaces()).filter((iface) => { return iface != 'lo'; })[0];
const hostAddress = os.networkInterfaces()[broadcastInterface][0].address;
// Replace last octet of hostAddress with .255 so 192.168.1.35 becomes 192.168.1.255
const broadcastAddress = hostAddress.substr(0, hostAddress.lastIndexOf(".")) + ".255";
broadcastSocket.bind(() => {
    broadcastSocket.setBroadcast(true);
    setInterval(function (socket) {
        console.log(`Broadcasting API metadata to: ${broadcastAddress}:${broadcastPort}`);
        socket.send(broadcastMessage, 0, broadcastMessage.length, broadcastPort, broadcastAddress);
    }, broadcastIntervalMilliseconds, broadcastSocket);
});

function toggleGpioPinOn(pin, durationMilliseconds) {
    // Set the initial state to low.
    rpio.open(pin, rpio.OUTPUT, rpio.LOW);
    // Turn pin ON.
    rpio.write(pin, rpio.HIGH);
    // Wait durationMilliseconds
    rpio.msleep(durationMilliseconds);
    // Turn pin OFF.
    rpio.write(pin, rpio.LOW);
}