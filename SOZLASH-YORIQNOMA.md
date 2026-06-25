# 🧸 Sevgi Ayiqchasi — GitHub + Vercel'ga chiqarish

Sayt **Vercel**'da joylanadi. Mijoz ma'lumotlari xavfsiz:
bot tokeni Vercel'ning maxfiy o'zgaruvchisida turadi, saytda **hech qachon ko'rinmaydi**.

✅ Buyurtma **ikkala manzilga** tushadi:
- 🤖 Bot (shaxsiy chat) — `5137983794`
- 📢 Kanal "Ramantik ayiq 2" — `-1003770834725`

## Loyiha tuzilishi
```
index.html          → asosiy sahifa
thank-you.html      → rahmat sahifasi
bear-roses.jpg      → ayiqcha + atirgul rasmi
bear-hats.jpg       → gulli qalpoq rasmi
api/order.js        → maxfiy backend (buyurtmani botga yuboradi)
```

---

## 1-QADAM — GitHub'ga yuklash
**Variant A (eng oson — GitHub veb sayti):**
1. https://github.com/new sahifasiga kiring.
2. Repository nomi: `ayiqcha-sayt` → **Create repository**.
3. Ochilgan sahifada **"uploading an existing file"** havolasini bosing.
4. Shu papkadagi BARCHA fayllarni (jumladan `api` papkasini) sudrab tashlang → **Commit changes**.

**Variant B (git orqali):** men repo'ni commit qilib qo'yaman, siz faqat
GitHub'da bo'sh repo ochib, uning manzilini menga bering — men `push` qilaman.

---

## 2-QADAM — Vercel'ga ulash
1. https://vercel.com saytiga GitHub akkauntingiz bilan kiring (bepul).
2. **Add New… → Project** → GitHub'dagi `ayiqcha-sayt` repo'sini **Import**.
3. Hech narsani o'zgartirmasdan **Environment Variables** bo'limini oching va qo'shing:
   - **Name:** `BOT_TOKEN`
   - **Value:** bot tokeni
4. **Deploy** bosing.
5. Bir necha soniyada sayt tayyor — manzili: `https://ayiqcha-sayt.vercel.app`

---

## ✅ Tekshirish
Saytni ochib, test buyurtma yuboring. Bot va kanalga shunday xabar tushishi kerak:

```
🧸 Yangi buyurtma!
👤 Ism: ...
📞 Telefon: ...
📍 Manzil: ...
```

Hammasi shu! Mijoz ma'lumotlari faqat sizning bot/kanalingizga tushadi,
hech kim ularni saytdan o'qiy olmaydi.

---

## 🔒 Xavfsizlik eslatmasi
Token bu suhbatda ko'ringani uchun, hammasi ishlagach BotFather'da `/revoke`
qilib tokenni yangilang, so'ng Vercel → Settings → Environment Variables
ichidagi `BOT_TOKEN` ni yangisiga almashtiring va qayta Deploy qiling.
