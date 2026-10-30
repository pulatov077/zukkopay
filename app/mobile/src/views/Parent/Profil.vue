<template>
  <ion-page class="zukko-app">
    <ion-content :fullscreen="true" class="main-content-bg">
      <div class="mobile-wrapper">

        <!-- Header -->
        <div class="header-section">
          <h1 class="page-title">👤 Profil</h1>
          <button class="edit-btn" @click="editMode = !editMode">{{ editMode ? '✓ Saqlash' : '✏️ Tahrirlash' }}</button>
        </div>

        <!-- Avatar & Name -->
        <div class="glass-card profile-card">
          <div class="avatar-wrap">
            <div class="avatar-lg">M</div>
            <div class="online-dot"></div>
          </div>
          <h2 class="profile-name">Malika Pulatova</h2>
          <p class="profile-role">Ota-ona • Alex Pulatov</p>
          <div class="profile-badges">
            <span class="badge-item badge-green">✅ Tasdiqlangan</span>
            <span class="badge-item badge-blue">🔒 Himoyalangan</span>
          </div>
        </div>

        <!-- Info Fields -->
        <h3 class="section-title">📋 SHAXSIY MA'LUMOTLAR</h3>
        <div class="glass-card">
          <div v-for="f in fields" :key="f.label" class="field-row">
            <span class="field-icon">{{ f.icon }}</span>
            <div class="field-body">
              <span class="field-label">{{ f.label }}</span>
              <input v-if="editMode" class="field-input" v-model="f.value" />
              <span v-else class="field-value">{{ f.value }}</span>
            </div>
          </div>
        </div>

        <!-- Child Info -->
        <h3 class="section-title">🎓 FARZAND MA'LUMOTLARI</h3>
        <div class="glass-card child-info-card">
          <div class="child-row">
            <div class="child-av">A</div>
            <div>
              <p class="child-name">Alex Pulatov</p>
              <p class="child-meta">7-A sinf • Zukko Maktab</p>
            </div>
            <div class="child-status">🟢 Faol</div>
          </div>
          <div class="child-stats">
            <div class="cs-item"><span class="cs-val gold">450,000</span><span class="cs-lbl">UZS</span></div>
            <div class="cs-div"></div>
            <div class="cs-item"><span class="cs-val blue">92</span><span class="cs-lbl">Baho</span></div>
            <div class="cs-div"></div>
            <div class="cs-item"><span class="cs-val green">98%</span><span class="cs-lbl">Davomat</span></div>
          </div>
        </div>

        <!-- Security -->
        <h3 class="section-title">🔐 XAVFSIZLIK</h3>
        <div class="glass-card">
          <div v-for="s in securityItems" :key="s.label" class="security-row">
            <span class="sec-icon">{{ s.icon }}</span>
            <div class="sec-body">
              <p class="sec-label">{{ s.label }}</p>
              <p class="sec-desc">{{ s.desc }}</p>
            </div>
            <button class="sec-btn" :style="{color:s.color,borderColor:s.color,background:s.color+'18'}">{{ s.action }}</button>
          </div>
        </div>

        <!-- Logout -->
        <button class="logout-btn" @click="logout">🚪 Chiqish</button>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const editMode = ref(false);

const fields = ref([
  { icon: '👤', label: 'To\'liq ism', value: 'Malika Pulatova' },
  { icon: '📱', label: 'Telefon', value: '+998 90 123 45 67' },
  { icon: '📧', label: 'Email', value: 'malika@example.com' },
  { icon: '🏠', label: 'Manzil', value: 'Toshkent, Yunusobod' },
]);

const securityItems = [
  { icon: '🔑', label: 'Parol', desc: 'So\'nggi yangilangan: 30 kun oldin', action: 'O\'zgartirish', color: '#3b82f6' },
  { icon: '📱', label: 'Ikki bosqichli tasdiqlash', desc: 'SMS orqali yoqilgan', action: 'Boshqarish', color: '#10b981' },
  { icon: '🔔', label: 'Bildirishnomalar', desc: 'Barcha bildirishnomalar yoqilgan', action: 'Sozlash', color: '#fbbf24' },
];

const logout = () => {
  router.push('/login');
};
</script>

<style scoped>
.zukko-app { --background: #030712 !important; }
.main-content-bg { --background: #030712 !important; background-color: #030712 !important; }
.mobile-wrapper { max-width: 450px; margin: 0 auto; padding: 8px 16px 100px; background: #030712; }
.glass-card { background: #111827 !important; border: 1px solid #1f2937 !important; border-radius: 20px; padding: 16px; margin-bottom: 12px; }

.header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.page-title { color: white; font-size: 20px; font-weight: 800; margin: 0; }
.edit-btn { background: #1f2937; border: 1px solid #374151; color: #94a3b8; font-size: 12px; font-weight: 700; padding: 7px 14px; border-radius: 20px; cursor: pointer; transition: all 0.2s; }
.edit-btn:hover { border-color: #6366f1; color: #6366f1; }

.profile-card { display: flex; flex-direction: column; align-items: center; padding: 24px 16px; }
.avatar-wrap { position: relative; margin-bottom: 12px; }
.avatar-lg { width: 72px; height: 72px; background: linear-gradient(135deg,#6366f1,#8b5cf6); border-radius: 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 28px; font-weight: 900; }
.online-dot { position: absolute; bottom: -2px; right: -2px; width: 14px; height: 14px; background: #10b981; border: 2.5px solid #030712; border-radius: 50%; }
.profile-name { color: white; font-size: 20px; font-weight: 800; margin: 0 0 4px; text-align: center; }
.profile-role { color: #64748b; font-size: 12px; margin: 0 0 12px; text-align: center; }
.profile-badges { display: flex; gap: 8px; }
.badge-item { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; }
.badge-green { background: rgba(16,185,129,0.1); border: 1px solid #10b981; color: #10b981; }
.badge-blue { background: rgba(59,130,246,0.1); border: 1px solid #3b82f6; color: #3b82f6; }

.section-title { color: white; font-size: 13px; font-weight: 800; margin: 0 0 10px; letter-spacing: 0.5px; }

.field-row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #1f2937; }
.field-row:last-child { border-bottom: none; padding-bottom: 0; }
.field-row:first-child { padding-top: 0; }
.field-icon { font-size: 18px; width: 28px; text-align: center; flex-shrink: 0; }
.field-body { flex: 1; }
.field-label { display: block; color: #64748b; font-size: 9px; font-weight: 800; letter-spacing: 0.5px; margin-bottom: 2px; }
.field-value { color: white; font-size: 13px; font-weight: 600; }
.field-input { background: #1f2937; border: 1px solid #374151; border-radius: 8px; color: white; font-size: 13px; font-weight: 600; padding: 6px 10px; width: 100%; outline: none; }
.field-input:focus { border-color: #6366f1; }

.child-info-card { padding: 16px; }
.child-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.child-av { width: 44px; height: 44px; background: #6366f1; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 18px; flex-shrink: 0; }
.child-name { color: white; font-size: 15px; font-weight: 800; margin: 0 0 2px; }
.child-meta { color: #64748b; font-size: 11px; margin: 0; }
.child-status { font-size: 11px; font-weight: 700; margin-left: auto; background: rgba(16,185,129,0.1); border: 1px solid #10b981; color: #10b981; padding: 4px 10px; border-radius: 20px; }
.child-stats { display: flex; background: #0f172a; border-radius: 12px; padding: 12px; }
.cs-item { flex: 1; text-align: center; }
.cs-div { width: 1px; background: #1f2937; }
.cs-val { display: block; font-size: 16px; font-weight: 900; }
.cs-lbl { display: block; color: #64748b; font-size: 9px; font-weight: 700; margin-top: 2px; }
.gold { color: #fbbf24; }
.blue { color: #3b82f6; }
.green { color: #10b981; }

.security-row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #1f2937; }
.security-row:last-child { border-bottom: none; padding-bottom: 0; }
.security-row:first-child { padding-top: 0; }
.sec-icon { font-size: 20px; width: 28px; text-align: center; flex-shrink: 0; }
.sec-body { flex: 1; }
.sec-label { color: white; font-size: 12px; font-weight: 700; margin: 0 0 2px; }
.sec-desc { color: #64748b; font-size: 10px; margin: 0; }
.sec-btn { font-size: 10px; font-weight: 800; padding: 5px 11px; border-radius: 8px; border-width: 1px; border-style: solid; cursor: pointer; white-space: nowrap; transition: opacity 0.2s; }
.sec-btn:hover { opacity: 0.75; }

.logout-btn { width: 100%; padding: 14px; border-radius: 16px; border: 1px solid #ef4444; background: rgba(239,68,68,0.08); color: #ef4444; font-size: 14px; font-weight: 800; cursor: pointer; transition: all 0.2s; margin-top: 4px; }
.logout-btn:hover { background: rgba(239,68,68,0.18); }
</style>
