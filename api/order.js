/**
 * Sevgi Ayiqchasi — buyurtma qabul qiluvchi Vercel Serverless Function.
 *
 * Mijoz formasidan kelgan ma'lumotni Telegram botga yuboradi.
 * Bot tokeni bu yerda EMAS — u Vercel'ning maxfiy Environment Variable'ida
 * (BOT_TOKEN) saqlanadi, shuning uchun saytni ochgan hech kim ko'ra olmaydi.
 *
 * Vercel'da qo'shiladigan Environment Variable:
 *   BOT_TOKEN  — Telegram bot tokeni (MAXFIY)
 *
 * Buyurtma quyidagi ikkala manzilga ham yuboriladi:
 *   - Bot (shaxsiy):  5137983794  (Hojiakbarxon)
 *   - Kanal:          -1003770834725  ("Ramantik ayiq 2")
 */

const CHAT_IDS = [5137983794, -1003770834725];

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method" });
    return;
  }

  // Vercel JSON tanani avtomatik o'qiydi; ehtiyot uchun qo'lda ham qayta ishlaymiz.
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  // Spam-tuzoq: yashirin maydon to'ldirilgan bo'lsa — bu bot, jim qaytaramiz.
  if (body.website) {
    res.status(200).json({ ok: true });
    return;
  }

  const name = clean(body.name, 100);
  const phone = clean(body.phone, 40);
  const region = clean(body.region, 60);

  if (!name || !phone || !region) {
    res.status(400).json({ ok: false, error: "missing" });
    return;
  }

  const token = process.env.BOT_TOKEN;
  if (!token) {
    res.status(500).json({ ok: false, error: "no_token" });
    return;
  }

  const text =
    "🧸 <b>Yangi buyurtma!</b>\n\n" +
    "👤 <b>Ism:</b> " + esc(name) + "\n" +
    "📞 <b>Telefon:</b> " + esc(phone) + "\n" +
    "📍 <b>Manzil:</b> " + esc(region) + "\n\n" +
    "🕒 " + new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" });

  const tgUrl = "https://api.telegram.org/bot" + token + "/sendMessage";

  const results = await Promise.all(
    CHAT_IDS.map((id) =>
      fetch(tgUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: id, text: text, parse_mode: "HTML" }),
      })
        .then((r) => r.ok)
        .catch(() => false)
    )
  );

  if (results.some(Boolean)) {
    res.status(200).json({ ok: true });
  } else {
    res.status(502).json({ ok: false, error: "telegram" });
  }
};

function clean(v, max) {
  return (v == null ? "" : String(v)).trim().slice(0, max);
}
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
