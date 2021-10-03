import { REACT_APP_SERVER_URL } from "@env"
import  Constants  from "expo-constants"

const { manifest } = Constants

// const host2 = `http://${manifest.debuggerHost.split(":").shift()}:5000`
export const host = "https://relaxed-smoke-45677.pktriot.net"
// export const host = "http://192.168.43.87:5000"

export const requestLoginUrl = `${host}/auth/authenticate`
export const verifyLoginUrl = `${host}/auth/verify`
export const refreshTokenUrl = `${host}/auth/refresh`
export const testUrl = `${host}/chat/test`
export const syncContactUrl = `${host}/auth/sync`