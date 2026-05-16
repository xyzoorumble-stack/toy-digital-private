const {
default: makeWASocket,
useMultiFileAuthState,
DisconnectReason
} = require("@whiskeysockets/baileys")

const pino = require("pino")

async function startBot() {

const { state, saveCreds } =
await useMultiFileAuthState("./session")

const sock = makeWASocket({
logger: pino({ level: "silent" }),
auth: state,
browser: ["TOY DIGITAL", "Chrome", "1.0.0"]
})

sock.ev.on("creds.update", saveCreds)

if (!sock.authState.creds.registered) {

const phoneNumber = "6285768514765"

const code = await sock.requestPairingCode(phoneNumber)

console.log(`
=========================
PAIRING CODE BOT:
${code}
=========================
`)
}

sock.ev.on("connection.update", async (update) => {

const { connection, lastDisconnect } = update

if (connection === "open") {
console.log("BOT BERHASIL TERHUBUNG")
}

if (connection === "close") {

const shouldReconnect =
lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut

console.log("Koneksi terputus. Reconnect:", shouldReconnect)

if (shouldReconnect) {
startBot()
}

}

})

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
`🔥 TOY DIGITAL PRIVATE BOT 🔥

📦 MENU UTAMA
• .menu
• .owner
• .ping
• .script
• .produk
• .runtime

🛡️ FITUR GRUP
• Anti Link
• Anti Spam
• Anti Virtex
• Anti Delete
• Welcome
• Set Rules
• Tag All
• Hide Tag

💼 FITUR BISNIS
• Auto Respon
• Katalog Produk
• Order Otomatis
• Broadcast
• Promo Otomatis

👑 OWNER MENU
• Add Premium
• Del Premium
• Backup Database
• Restart Bot`
})

}

if (text === ".ping") {

await sock.sendMessage(from, {
text: "BOT ONLINE ✅"
})

}

if (text === ".owner") {

await sock.sendMessage(from, {
text: "OWNER : TOY DIGITAL STORE"
})

}

if (text === ".script") {

await sock.sendMessage(from, {
text: "PRIVATE SCRIPT BY TOY DIGITAL STORE"
})

}

if (text === ".produk") {

await sock.sendMessage(from, {
text:
`📦 LIST PRODUK

• SCRIPT GRUP BASIC
• SCRIPT GRUP PREMIUM
• SCRIPT GRUP FULL

• SCRIPT BISNIS BASIC
• SCRIPT BISNIS PREMIUM
• SCRIPT BISNIS FULL

• SCRIPT COMBO BISNIS + GRUP`
})

}

if (text === ".runtime") {

await sock.sendMessage(from, {
text: "BOT AKTIF 24 JAM ✅"
})

}

})

}

startBot()
