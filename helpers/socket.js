import OpenSocket from "socket.io-client"
import { webSocketHost } from "../constants/endpoints";
let socket;

export const init = (token) => {
    if(socket){
        return socket
    }
    socket = OpenSocket(webSocketHost, {
        query: { token: token },
    })
    return socket
}

export const getScoket = () => {
    if (!socket) {
        throw new Error("No Socket client have been initialized!")
    }
    return socket
}