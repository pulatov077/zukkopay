<template>
  <ion-page class="zukko-app">
    <ion-content :fullscreen="true" class="main-content-bg">

      <!-- Notifications Modal -->
      <div v-if="showNotify" class="modal-overlay" @click.self="showNotify = false">
        <div class="notify-modal glass-card-modal">
          <button class="close-btn" @click="showNotify = false">✕</button>
          <div class="notify-header-row">
            <h2 class="modal-title" style="text-align:left;font-size:16px;margin:0;">Bildirishnomalar</h2>
            <span class="notif-count-badge">{{ notifications.length }}</span>
          </div>
          <div class="notif-list">
            <div v-for="n in notifications" :key="n.id" class="sms-notif-item" :class="{ unread: n.unread }">
              <div class="sms-icon-wrap" :style="{ background: n.iconBg, color: n.color }">{{ n.icon }}</div>
              <div class="sms-body">
                <div class="sms-top-row">
                  <span class="sms-sender">{{ n.sender }}</span>
                  <span class="sms-time">{{ n.time }}</span>
                </div>
                <p class="sms-text">{{ n.text }}</p>
              </div>
              <div v-if="n.unread" class="unread-dot"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="mobile-wrapper">
        <!-- Header -->
        <div class="header-section">
          <div class="user-profile">
            <div class="avatar-box">
              <span class="avatar-text">O</span>
              <div class="online-dot"></div>
            </div>
            <div>
              <p class="greeting-sub">Xush kelibsiz 👋</p>
              <h1 class="greeting">Ota-ona</h1>
            </div>
          </div>
          <div class="header-tools">
            <div class="notify-box">
              <button class="tool-btn" @click="showNotify = true">
                <ion-icon :icon="notificationsOutline" />
              </button>
              <span class="badge">{{ notifications.filter(n => n.unread).length }}</span>
            </div>
          </div>
        </div>

        <!-- Child Info Card -->
        <div class="glass-card child-card">
          <div class="child-card-top">
            <span class="label">FARZAND MA'LUMOTI</span>
            <span class="child-status-badge">🟢 Faol</span>
          </div>
          <div class="child-info-row">
            <div class="child-avatar">A</div>
            <div>
              <h2 class="child-name">Alex Pulatov</h2>
              <p class="child-class">7-A sinf • Zukko Maktab</p>
            </div>
          </div>
          <div class="child-stats-row">
            <div class="child-stat">
              <span class="cstat-val gold-text">450,000</span>
              <span class="cstat-label">UZS Balans</span>
            </div>
            <div class="child-stat-divider"></div>
            <div class="child-stat">
              <span class="cstat-val blue-text">92</span>
              <span class="cstat-label">O'rtacha baho</span>
            </div>
            <div class="child-stat-divider"></div>
            <div class="child-stat">
              <span class="cstat-val green-text">98%</span>
              <span class="cstat-label">Davomat</span>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="stats-grid">
          <div class="glass-card stat-box">
            <div class="stat-header">
              <span class="label">BU HAFTA TOPILGAN</span>
              <div class="mini-icon">🪙</div>
            </div>
            <div class="stat-val gold-text">+2,320</div>
            <div class="stat-desc">↗ ZK coin</div>
          </div>
          <div class="glass-card stat-box">
            <div class="stat-header">
              <span class="label">FAOL QUESTLAR</span>
              <div class="mini-icon">🎯</div>
            </div>
            <div class="stat-val blue-text">3/5</div>
            <div class="stat-desc">↗ Bajarilmoqda</div>
          </div>
        </div>

        <!-- Indicator Row -->
        <div class="indicator-row">
          <div v-for="s in quickStats" :key="s.label" class="ind-card">
            <span class="ind-icon">{{ s.icon }}</span>
            <span class="ind-label">{{ s.label }}</span>
            <span class="ind-val">{{ s.value }}</span>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="section-top">
          <h3 class="section-title">📋 SO'NGGI FAOLIYAT</h3>
          <span class="view-link" @click="$router.push('/parent/monitoring')">Barchasi ↗</span>
        </div>

        <div class="glass-card activity-list">
          <div v-for="a in activities" :key="a.id" class="activity-item">
            <div class="activity-icon-box" :style="{ background: a.iconBg, color: a.color }">{{ a.icon }}</div>
            <div class="activity-info">
              <p class="activity-title">{{ a.title }}</p>
              <p class="activity-time">{{ a.time }}</p>
            </div>
            <span class="activity-amount" :style="{ color: a.color }">{{ a.amount }}</span>
          </div>
        </div>

        <!-- Week Progress -->
        <div class="section-top">
          <h3 class="section-title">📊 HAFTALIK NATIJALAR</h3>
        </div>
        <div class="glass-card">
          <div v-for="s in weekSubjects" :key="s.name" class="subject-row">
            <div class="subject-name-row">
              <span class="subject-icon">{{ s.icon }}</span>
              <span class="subject-name">{{ s.name }}</span>
              <span class="subject-grade" :style="{ color: s.color }">{{ s.grade }}</span>
            </div>
            <div class="subject-bar">
              <div class="subject-fill" :style="{ width: s.pct + '%', background: s.color }"></div>
            </div>
          </div>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import { notificationsOutline } from 'ionicons/icons';

const showNotify = ref(false);

const notifications = ref([
  { id: 1, icon: '📚', sender: 'Zukko Maktab', unread: true, text: 'Alex bugun matematika testidan 95 ball oldi!', time: '10:30', iconBg: 'rgba(59,130,246,0.15)', color: '#3b82f6' },
  { id: 2, icon: '💰', sender: 'Zukko Wallet', unread: true, text: 'Alexning walletiga +150 ZK coin tushdi.', time: '09:15', iconBg: 'rgba(16,185,129,0.15)', color: '#10b981' },
  { id: 3, icon: '🔔', sender: 'Davomat', unread: false, text: 'Alex bugun maktabga 08:05 da keldi.', time: 'Kecha', iconBg: 'rgba(251,191,36,0.15)', color: '#fbbf24' },
]);

const quickStats = [
  { label: 'STREAK', value: '7 Kun', icon: '🔥' },
  { label: 'DAVOMAT', value: '98%', icon: '📅' },
  { label: 'XARAJAT', value: '12,000', icon: '💳' },
  { label: 'REYTING', value: '#4', icon: '🏆' },
];

const activities = [
  { id: 1, icon: '📖', title: 'Matematika uy ishi topshirildi', time: '2 soat oldin', amount: '+50 ZK', color: '#10b981', iconBg: 'rgba(16,185,129,0.15)' },
  { id: 2, icon: '🧪', title: 'Kimyo testi — A\'lo', time: '5 soat oldin', amount: '+120 ZK', color: '#3b82f6', iconBg: 'rgba(59,130,246,0.15)' },
  { id: 3, icon: '🏆', title: 'Haftalik davomat bonusi', time: '1 kun oldin', amount: '+80 ZK', color: '#fbbf24', iconBg: 'rgba(251,191,36,0.15)' },
];

const weekSubjects = [
  { name: 'Matematika', icon: '📐', grade: '95', pct: 95, color: '#3b82f6' },
  { name: 'Kimyo', icon: '🧪', grade: '88', pct: 88, color: '#10b981' },
  { name: 'Ingliz tili', icon: '🌍', grade: '92', pct: 92, color: '#a78bfa' },
  { name: 'Tarix', icon: '📜', grade: '84', pct: 84, color: '#fbbf24' },
];
</script>

<style scoped>
.zukko-app { --background: #030712 !important; }
.main-content-bg { --background: #030712 !important; background-color: #030712 !important; }
.mobile-wrapper { max-width: 450px; margin: 0 auto; padding: 8px 16px 100px; background: #030712; }

.glass-card {
  background: #111827 !important; border: 1px solid #1f2937 !important;
  border-radius: 20px; padding: 16px; margin-bottom: 12px;
}

/* HEADER */
.header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.user-profile { display: flex; align-items: center; gap: 10px; }
.avatar-box {
  width: 44px; height: 44px; background: #6366f1; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; position: relative; flex-shrink: 0;
}
.avatar-text { color: white; font-weight: 800; font-size: 16px; }
.online-dot { position: absolute; bottom: -2px; right: -2px; width: 11px; height: 11px; background: #10b981; border: 2px solid #030712; border-radius: 50%; }
.greeting-sub { color: #64748b; font-size: 10px; font-weight: 600; margin: 0; }
.greeting { color: white; font-size: 17px; font-weight: 800; margin: 0; }
.header-tools { display: flex; align-items: center; gap: 8px; }
.tool-btn { background: #1f2937; border: none; padding: 7px 9px; border-radius: 10px; color: #94a3b8; font-size: 19px; cursor: pointer; display: flex; align-items: center; }
.notify-box { position: relative; }
.badge { position: absolute; top: -5px; right: -5px; background: #ef4444; color: white; font-size: 8px; font-weight: 800; border-radius: 20px; padding: 2px 5px; border: 1.5px solid #030712; }

/* CHILD CARD */
.child-card { padding: 16px; }
.child-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.label { color: #94a3b8; font-size: 10px; font-weight: 700; letter-spacing: 1px; }
.child-status-badge { background: rgba(16,185,129,0.1); border: 1px solid #10b981; color: #10b981; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 20px; }
.child-info-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.child-avatar { width: 48px; height: 48px; background: #6366f1; border-radius: 14px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 20px; flex-shrink: 0; }
.child-name { color: white; font-size: 18px; font-weight: 800; margin: 0 0 2px; }
.child-class { color: #64748b; font-size: 11px; margin: 0; }
.child-stats-row { display: flex; align-items: center; gap: 0; background: #0f172a; border-radius: 12px; padding: 12px; }
.child-stat { flex: 1; text-align: center; }
.child-stat-divider { width: 1px; height: 32px; background: #1f2937; }
.cstat-val { display: block; font-size: 18px; font-weight: 900; }
.cstat-label { display: block; color: #64748b; font-size: 9px; font-weight: 700; margin-top: 2px; }
.gold-text { color: #fbbf24; }
.blue-text { color: #3b82f6; }
.green-text { color: #10b981; }

/* STATS GRID */
.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.stat-box { padding: 14px; }
.stat-header { display: flex; justify-content: space-between; align-items: center; }
.mini-icon { font-size: 18px; }
.stat-val { font-size: 24px; font-weight: 900; margin: 4px 0 2px; }
.stat-desc { color: #10b981; font-size: 10px; font-weight: 700; }

/* INDICATORS */
.indicator-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 12px 0; }
.ind-card { background: #111827; border: 1px solid #1f2937; border-radius: 14px; padding: 10px 5px; text-align: center; }
.ind-icon { display: block; font-size: 18px; margin-bottom: 4px; }
.ind-label { display: block; font-size: 7.5px; color: #94a3b8; font-weight: 800; letter-spacing: 0.3px; }
.ind-val { color: white; font-size: 11px; font-weight: 800; }

/* SECTION */
.section-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.section-title { color: white; font-size: 14px; font-weight: 800; margin: 0; }
.view-link { color: #6366f1; font-size: 12px; font-weight: 700; cursor: pointer; }

/* ACTIVITY */
.activity-list { padding: 0; }
.activity-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #1f2937; cursor: pointer; }
.activity-item:last-child { border-bottom: none; padding-bottom: 0; }
.activity-item:first-child { padding-top: 0; }
.activity-icon-box { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.activity-info { flex: 1; }
.activity-title { color: white; font-size: 12px; font-weight: 700; margin: 0 0 2px; }
.activity-time { color: #64748b; font-size: 10px; margin: 0; }
.activity-amount { font-size: 13px; font-weight: 800; }

/* SUBJECTS */
.subject-row { margin-bottom: 12px; }
.subject-row:last-child { margin-bottom: 0; }
.subject-name-row { display: flex; align-items: center; gap: 6px; margin-bottom: 5px; }
.subject-icon { font-size: 14px; }
.subject-name { color: #94a3b8; font-size: 11px; font-weight: 700; flex: 1; }
.subject-grade { font-size: 12px; font-weight: 900; }
.subject-bar { height: 5px; background: #1f2937; border-radius: 10px; overflow: hidden; }
.subject-fill { height: 100%; border-radius: 10px; }

/* MODAL */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
.glass-card-modal { background: #0f172a; border: 1px solid #1e293b; border-radius: 26px; width: 100%; max-width: 380px; padding: 26px; position: relative; }
.close-btn { position: absolute; top: 16px; right: 16px; background: #1e293b; border: none; color: #94a3b8; font-size: 15px; width: 28px; height: 28px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.notify-header-row { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.notif-count-badge { background: #ef4444; color: white; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 20px; }
.notif-list { display: flex; flex-direction: column; gap: 8px; max-height: 65vh; overflow-y: auto; }
.sms-notif-item { display: flex; align-items: flex-start; gap: 11px; padding: 12px; background: #1e293b; border-radius: 14px; position: relative; border: 1px solid transparent; }
.sms-notif-item.unread { border-color: #334155; background: #1a2744; }
.sms-icon-wrap { width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 18px; }
.sms-body { flex: 1; min-width: 0; }
.sms-top-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.sms-sender { color: white; font-size: 12px; font-weight: 800; }
.sms-time { color: #64748b; font-size: 10px; font-weight: 600; }
.sms-text { color: #94a3b8; font-size: 11.5px; line-height: 1.5; margin: 0; }
.unread-dot { width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
.modal-title { color: white; font-size: 19px; font-weight: 800; margin-bottom: 4px; }
</style>
