import path from 'path'
import { fileURLToPath } from 'url'
import mockServer from 'node-mock-server'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

mockServer({
  restPath: path.join(__dirname, '/rest'),
  uiPath: '/',
  title: 'Vue Dev Guid Mock Server',
  version: 1,
  urlBase: 'http://localhost:3001',
  urlPath: '/api/v1',
  port: 3001,
  contentType: 'application/json',
  accessControlExposeHeaders: 'X-Total-Count',
  accessControlAllowOrigin: '*',
  accessControlAllowMethods: 'GET, POST, PUT, OPTIONS, DELETE, PATCH, HEAD',
  accessControlAllowHeaders: 'origin, x-requested-with, content-type',
  accessControlAllowCredentials: 'true',
  headers: {},
  open: true,
  dirName: __dirname,
})
