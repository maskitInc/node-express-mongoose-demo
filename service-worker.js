'use strict';

importScripts('/sw-toolbox/sw-toolbox.js');

toolbox.precache(['sw.html','css/general.css']);
toolbox.router.get('/images/*', toolbox.cacheFirst);
toolbox.router.get('/*', toolbox.networkFirst, { networkTimeoutSeconds: 5});