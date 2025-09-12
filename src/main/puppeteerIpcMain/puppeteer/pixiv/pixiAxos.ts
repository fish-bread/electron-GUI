import { HttpsProxyAgent } from 'https-proxy-agent'
import axios from 'axios'
const host = '127.0.0.1'
const port = 7897
const httpsAgent = new HttpsProxyAgent(`http://${host}:${port}`)
export const pixivAxios = axios.create({
  proxy: false,
  timeout: 25000,
  httpsAgent
})
