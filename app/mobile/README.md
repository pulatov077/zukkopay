<div align="center">

<h1>⚡ ZukkoPay</h1>

<p><strong>Gamifikatsiyalangan maktab moliyaviy ekotizimi</strong></p>

<p>
  <img src="https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat-square&logo=vue.js" />
  <img src="https://img.shields.io/badge/Ionic-7.x-3880FF?style=flat-square&logo=ionic" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat-square&logo=supabase" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" />
</p>

</div>

---

## 📖 Loyiha haqida

**ZukkoPay** — maktab o'quvchilari va ularning ota-onalari uchun mo'ljallangan **gamifikatsiyalangan mobil ilov**. O'quvchilar dars topshirib, questlar bajarib, reytingda yuqorilashib **ZK coin** to'plashadi va real mukofotlarga almashadilar.

### 🎯 Asosiy maqsad
Maktab hayotini moliyaviy savodxonlik va o'yin elementlari bilan birlashtirish orqali o'quvchilarning motivatsiyasini oshirish.

---

## ✨ Imkoniyatlar

| Rol | Imkoniyatlar |
|-----|-------------|
| 👨‍🎓 **O'quvchi** | Dashboard, ZK coin, Questlar, Reyting, Hamyon, Do'kon |
| 👨‍👩‍👧 **Ota-ona** | Farzand monitoring, Baholar, Davomat, Profil boshqaruvi |

---

## 🏗️ Texnologiyalar

- **Frontend:** Vue 3 (Composition API) + TypeScript
- **Mobile Framework:** Ionic 7 + Capacitor
- **Styling:** Tailwind CSS + Scoped CSS
- **Backend:** Supabase (Auth + PostgreSQL + Realtime)
- **Build Tool:** Vite
- **Router:** Vue Router 4

---

## 🚀 Ishga tushirish

### Talablar
- Node.js `>= 18.x`
- npm `>= 9.x`

### O'rnatish

```bash
# 1. Repozitoriyni klonlash
git clone https://github.com/pulatov077/zukkopay.git
cd zukkopay/app/mobile

# 2. Bog'liqliklarni o'rnatish
npm install

# 3. Muhit o'zgaruvchilarini sozlash
cp .env.example .env
# .env fayliga Supabase kalitlaringizni kiriting

# 4. Ishga tushirish
npm run dev
```

### Build

```bash
# Production build
npm run build

# TypeScript tekshiruvi
npx vue-tsc --noEmit
```

---

## 🔐 Xavfsizlik

- Barcha maxfiy kalitlar `.env` faylida saqlanadi va **git-ga commit qilinmaydi**
- `.env.example` faylida faqat kalit nomlari (haqiqiy qiymatlar yo'q)
- Supabase Row Level Security (RLS) yoqilgan
- Foydalanuvchi parollari hech qachon client-side loglanmaydi

> ⚠️ `.env` faylingizni hech qachon GitHub-ga push qilmang!

---

## 📁 Loyiha tuzilmasi

```
app/mobile/src/
├── router/
│   └── index.ts          # Vue Router konfiguratsiyasi
├── views/
│   ├── Student/           # O'quvchi sahifalari
│   │   ├── Dashboard.vue
│   │   ├── Earn.vue
│   │   ├── Wallet.vue
│   │   ├── Reyting.vue
│   │   ├── Profil.vue
│   │   ├── Store.vue
│   │   └── TabsPage.vue
│   ├── Parent/            # Ota-ona sahifalari
│   │   ├── Dashboard.vue
│   │   ├── Monitoring.vue
│   │   ├── Profil.vue
│   │   └── TabsPage.vue
│   ├── LoginPage.vue
│   ├── RegisterPage.vue
│   └── IndexPage.vue
├── supabase.ts            # Supabase client
└── main.ts
```

---

## 🤝 Hissa qo'shish

1. Fork qiling
2. Feature branch yarating: `git checkout -b feat/your-feature`
3. O'zgarishlarni commit qiling: `git commit -m "feat: add new feature"`
4. Push qiling: `git push origin feat/your-feature`
5. Pull Request oching

### Commit xabarlari standarti ([Conventional Commits](https://www.conventionalcommits.org/))

```
feat:     Yangi imkoniyat
fix:      Xatolik tuzatish
refactor: Kodni qayta yozish (funksionallik o'zgarmaydi)
perf:     Samaradorlikni yaxshilash
docs:     Hujjat yangilash
style:    Formatlash, nuqta-vergul va h.k.
chore:    Build jarayoni, bog'liqliklar yangilash
```

---

## 📄 Litsenziya

MIT © 2026 ZukkoPay Team
