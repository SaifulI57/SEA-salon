import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
// import { remix } from 'remix-hono/handler';
import auth from './Routes/RouteDashboardCustomers';
import { prettyJSON } from 'hono/pretty-json';
import { secureHeaders } from 'hono/secure-headers';
import { csrf } from 'hono/csrf';
import route from './Routes/RouteEnc';
import branch from './Routes/RouteBranch';
import service from './Routes/RouteService';
import admin from './Routes/RouteDahsboardAdmin';
const serv: Hono = new Hono();

serv.use(logger());
// serv.use(cors());
serv.use(secureHeaders());
// serv.use(csrf());
serv.use(prettyJSON());
serv.route('/crypto', route);
serv.route('/area/member', auth);
serv.route('/feature/branch', branch);
serv.route('/feature/service', service);
serv.route('/181b4bbe', admin);
serv.get('/', (c) => c.json({ message: 'Startu!!!🔥' }));

console.log('servers started');

export default serv;
