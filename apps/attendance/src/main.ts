const localtunnel = require('localtunnel');

import { localtunnelConfig } from './config';

(async () => {
  const tunnel = await localtunnel({
    port: localtunnelConfig.port,
    local_host: localtunnelConfig.localhost,
    subdomain: localtunnelConfig.subdomain,
  });

  console.log('tunnel url:', tunnel.url);
  console.lo

  tunnel.on('close', () => {
    console.log('tunnel closed: ', tunnel.url);
  });
})();
