const localtunnel = require('localtunnel');

import { localtunnelConfig } from './config';

console.log('process.env', process.env.TUNNEL_URL);

(async () => {
  const tunnel = await localtunnel({
    port: localtunnelConfig.port,
    local_host: localtunnelConfig.localhost,
    subdomain: localtunnelConfig.subdomain,
  });

  console.log('tunnel url:', tunnel.url);

  tunnel.on('close', () => {
    console.log('tunnel closed: ', tunnel.url);
  });
})();
