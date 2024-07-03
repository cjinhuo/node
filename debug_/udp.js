const cluster = require('node:cluster');
const dgram = require('node:dgram');
const os = require('os')

if (cluster.isPrimary) {
  cluster.fork();
  const s = dgram.createSocket('udp4');
  const uds = `${os.tmpdir()}/uds.sock`;

  s.bind(undefined, uds);
} else {
  const s = dgram.createSocket('udp4');
  // s.bind(undefined, uds);
  // s.close()
}