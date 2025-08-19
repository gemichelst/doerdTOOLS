const { exec } = require('child_process');

function scan(callback) {
  exec('arp -a', (err, stdout) => {
    if (err) return callback(err);

    const devices = stdout
      .split('\n')
      .filter(line => line.includes(' at '))
      .map(line => {
        const match = line.match(/\(?([0-9.]+)\)? at ([0-9a-f:]+)/i);
        if (!match) return null;
        return {
          ip: match[1],
          mac: match[2].toUpperCase(),
          name: line.split(' ') || 'unknown',
          type: 'Unbekannt',
          lastSeen: new Date().toISOString()
        };
      })
      .filter(Boolean);

    callback(null, devices);
  });
}

module.exports = { scan };
