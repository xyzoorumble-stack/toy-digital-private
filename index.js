const {
default: makeWASocket,
useMultiFileAuthState
} = require("@whiskeysockets/baileys")

const pino = require("pino")

async function startBot() {

const { state, saveCreds } =
await useMultiFileAuthState("./session")

const sock = makeWASocket({
logger: pino({ level: "silent" }),
auth: state
})

sock.ev.on("creds.update", saveCreds)

console.log("BOT ONLINE")

}

startBot()
