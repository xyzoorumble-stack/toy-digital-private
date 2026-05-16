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

console.log("BOT ONLINE ✅")

sock.ev.on("messages.upsert", async ({ messages }) => {

const msg = messages[0]

if (!msg.message) return

const text =
msg.message.conversation ||
msg.message.extendedTextMessage?.text

const from = msg.key.remoteJid

if (text === ".menu") {

await sock.sendMessage(from, {
text:
`🔥 TOY DIGITAL BOT 🔥

✅ BOT ONLINE

📦 MENU:
• .menu
• .ping
• .owner`
})

}

if (text === ".ping") {

await sock.sendMessage(from, {
text: "PONG ✅"
})

}

if (text === ".owner") {

await sock.sendMessage(from, {
text: "OWNER : TOY DIGITAL STORE"
})

}

})

}

startBot()
