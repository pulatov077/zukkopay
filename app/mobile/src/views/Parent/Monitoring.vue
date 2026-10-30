<template>
  <ion-page class="zukko-app">
    <ion-content :fullscreen="true" class="main-content-bg">
      <div class="mobile-wrapper">

        <div class="header-section">
          <h1 class="page-title">📊 Monitoring</h1>
          <div class="period-badge">Bu hafta</div>
        </div>

        <div class="tab-switcher">
          <button v-for="t in tabs" :key="t.key" class="tab-btn" :class="{ active: activeTab === t.key }" @click="activeTab = t.key">{{ t.label }}</button>
        </div>

        <!-- BAHOLAR -->
        <template v-if="activeTab === 'grades'">
          <div class="glass-card">
            <div class="card-label">O'RTACHA BAHO</div>
            <div class="big-val">92 <span class="val-unit">/ 100</span></div>
            <div class="trend green">↗ O'tgan haftadan +3 ball</div>
          </div>

          <h3 class="section-title">📚 FANLAR BO'YICHA</h3>
          <div class="glass-card" style="padding:0;overflow:hidden;">
            <div v-for="(s,i) in subjects" :key="s.name" class="subj-item" :class="{ last: i===subjects.length-1 }">
              <div class="icon-box" :style="{background:s.iconBg,color:s.color}">{{ s.icon }}</div>
              <div class="subj-info">
                <p class="subj-name">{{ s.name }}</p>
                <div class="bar-row">
                  <div class="bar"><div class="bar-fill" :style="{width:s.grade+'%',background:s.color}"></div></div>
                  <span :style="{color:s.color}" class="bar-pct">{{ s.grade }}</span>
                </div>
              </div>
              <div class="letter-badge" :style="{background:s.color+'18',color:s.color,border:'1px solid '+s.color+'44'}">{{ s.letter }}</div>
            </div>
          </div>

          <h3 class="section-title">📋 SO'NGGI TESTLAR</h3>
          <div class="glass-card">
            <div v-for="t in recentTests" :key="t.id" class="test-row">
              <div><p class="test-subj">{{ t.subject }}</p><p class="test-date">{{ t.date }}</p></div>
              <span class="test-score" :style="{color:t.color}">{{ t.score }}</span>
            </div>
          </div>
        </template>

        <!-- DAVOMAT -->
        <template v-if="activeTab === 'attendance'">
          <div class="glass-card">
            <div class="card-label">DAVOMAT FOIZI</div>
            <div class="big-val" style="color:#10b981">98% <span class="val-unit">bu oy</span></div>
            <div class="trend green">✅ Juda yaxshi ko'rsatkich</div>
          </div>

          <h3 class="section-title">📅 HAFTALIK JADVAL</h3>
          <div class="glass-card">
            <div class="week-row">
              <div v-for="d in weekDays" :key="d.day" class="day-cell">
                <span class="day-name">{{ d.day }}</span>
                <div class="day-dot" :class="d.status"></div>
                <span class="day-lbl" :class="d.status">{{ d.label }}</span>
              </div>
            </div>
          </div>

          <h3 class="section-title">📋 OY BO'YICHA</h3>
          <div class="glass-card">
            <div v-for="m in monthly" :key="m.month" class="month-row">
              <span class="month-name">{{ m.month }}</span>
              <div class="bar" style="flex:1"><div class="bar-fill" :style="{width:m.pct+'%',background:m.color}"></div></div>
              <span :style="{color:m.color}" class="bar-pct">{{ m.pct }}%</span>
            </div>
          </div>
        </template>

        <!-- FAOLIYAT -->
        <template v-if="activeTab === 'activity'">
          <div class="mini-grid">
            <div class="glass-card mini-card" v-for="s in miniStats" :key="s.label">
              <span class="mini-icon">{{ s.icon }}</span>
              <span class="mini-val" :style="{color:s.color}">{{ s.val }}</span>
              <span class="mini-lbl">{{ s.label }}</span>
            </div>
          </div>

          <h3 class="section-title">📋 BARCHA FAOLIYAT</h3>
          <div class="glass-card" style="padding:0;">
            <div v-for="a in allActs" :key="a.id" class="act-item">
              <div class="icon-box" :style="{background:a.iconBg,color:a.color}">{{ a.icon }}</div>
              <div class="act-info"><p class="act-title">{{ a.title }}</p><p class="act-time">{{ a.time }}</p></div>
              <span :style="{color:a.color}" class="act-amount">{{ a.amount }}</span>
            </div>
          </div>
        </template>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';

const activeTab = ref('grades');
const tabs = [
  { key: 'grades', label: '📚 Baholar' },
  { key: 'attendance', label: '📅 Davomat' },
  { key: 'activity', label: '⚡ Faoliyat' },
];
const subjects = [
  { name: 'Matematika', icon: '📐', grade: 95, letter: 'A', color: '#3b82f6', iconBg: 'rgba(59,130,246,0.15)' },
  { name: 'Kimyo', icon: '🧪', grade: 88, letter: 'B+', color: '#10b981', iconBg: 'rgba(16,185,129,0.15)' },
  { name: 'Ingliz tili', icon: '🌍', grade: 92, letter: 'A', color: '#a78bfa', iconBg: 'rgba(167,139,250,0.15)' },
  { name: 'Tarix', icon: '📜', grade: 84, letter: 'B', color: '#fbbf24', iconBg: 'rgba(251,191,36,0.15)' },
  { name: 'Fizika', icon: '⚛️', grade: 90, letter: 'A-', color: '#f97316', iconBg: 'rgba(249,115,22,0.15)' },
];
const recentTests = [
  { id: 1, subject: 'Matematika — Algebra', date: '21 Aprel, 2026', score: '95/100', color: '#10b981' },
  { id: 2, subject: 'Kimyo — Organik', date: '20 Aprel, 2026', score: '88/100', color: '#3b82f6' },
  { id: 3, subject: 'Ingliz tili — Grammar', date: '19 Aprel, 2026', score: '92/100', color: '#a78bfa' },
];
const weekDays = [
  { day: 'Du', status: 'present', label: '✓' },
  { day: 'Se', status: 'present', label: '✓' },
  { day: 'Ch', status: 'present', label: '✓' },
  { day: 'Pa', status: 'absent', label: '✗' },
  { day: 'Ju', status: 'present', label: '✓' },
  { day: 'Sh', status: 'holiday', label: '—' },
  { day: 'Ya', status: 'holiday', label: '—' },
];
const monthly = [
  { month: 'Yanvar', pct: 100, color: '#10b981' },
  { month: 'Fevral', pct: 96, color: '#3b82f6' },
  { month: 'Mart', pct: 98, color: '#a78bfa' },
  { month: 'Aprel', pct: 98, color: '#fbbf24' },
];
const miniStats = [
  { icon: '⚡', val: '+2,320', label: 'ZK coin', color: '#fbbf24' },
  { icon: '🎯', val: '3/5', label: 'Quest', color: '#3b82f6' },
  { icon: '🔥', val: '7 kun', label: 'Streak', color: '#f97316' },
  { icon: '🏆', val: '#4', label: 'Reyting', color: '#a78bfa' },
];
const allActs = [
  { id: 1, icon: '📖', title: 'Matematika uy ishi topshirildi', time: '2 soat oldin', amount: '+50 ZK', color: '#10b981', iconBg: 'rgba(16,185,129,0.15)' },
  { id: 2, icon: '🧪', title: "Kimyo testi — A'lo", time: '5 soat oldin', amount: '+120 ZK', color: '#3b82f6', iconBg: 'rgba(59,130,246,0.15)' },
  { id: 3, icon: '🏆', title: 'Haftalik davomat bonusi', time: '1 kun oldin', amount: '+80 ZK', color: '#fbbf24', iconBg: 'rgba(251,191,36,0.15)' },
  { id: 4, icon: '🎯', title: 'Quest bajarildi — Reading', time: '1 kun oldin', amount: '+50 ZP', color: '#a78bfa', iconBg: 'rgba(167,139,250,0.15)' },
  { id: 5, icon: '🔥', title: '7 kunlik streak bonusi', time: '2 kun oldin', amount: '+30 ZK', color: '#f97316', iconBg: 'rgba(249,115,22,0.15)' },
];
</script>

<style scoped>
.zukko-app { --background: #030712 !important; }
.main-content-bg { --background: #030712 !important; background-color: #030712 !important; }
.mobile-wrapper { max-width: 450px; margin: 0 auto; padding: 8px 16px 100px; background: #030712; }
.glass-card { background: #111827 !important; border: 1px solid #1f2937 !important; border-radius: 20px; padding: 16px; margin-bottom: 12px; }

.header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.page-title { color: white; font-size: 20px; font-weight: 800; margin: 0; }
.period-badge { background: #1f2937; color: #94a3b8; font-size: 11px; font-weight: 700; padding: 5px 12px; border-radius: 20px; }

.tab-switcher { display: flex; gap: 8px; margin-bottom: 16px; overflow-x: auto; }
.tab-switcher::-webkit-scrollbar { display: none; }
.tab-btn { background: #111827; border: 1px solid #1f2937; color: #64748b; font-size: 11px; font-weight: 700; padding: 8px 14px; border-radius: 20px; cursor: pointer; white-space: nowrap; transition: all 0.2s; }
.tab-btn.active { background: #6366f1; border-color: #6366f1; color: white; }

.section-title { color: white; font-size: 14px; font-weight: 800; margin: 0 0 10px; }
.card-label { color: #94a3b8; font-size: 10px; font-weight: 700; letter-spacing: 1px; margin-bottom: 6px; }
.big-val { color: white; font-size: 38px; font-weight: 900; margin: 0; }
.val-unit { color: #64748b; font-size: 16px; font-weight: 600; }
.trend { font-size: 11px; font-weight: 700; margin-top: 6px; }
.trend.green { color: #10b981; }

.subj-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-bottom: 1px solid #1f2937; }
.subj-item.last { border-bottom: none; }
.icon-box { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
.subj-info { flex: 1; }
.subj-name { color: white; font-size: 12px; font-weight: 700; margin: 0 0 5px; }
.bar-row { display: flex; align-items: center; gap: 8px; }
.bar { flex: 1; height: 4px; background: #1f2937; border-radius: 10px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 10px; }
.bar-pct { font-size: 11px; font-weight: 800; min-width: 24px; }
.letter-badge { font-size: 11px; font-weight: 800; padding: 4px 9px; border-radius: 8px; }

.test-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #1f2937; }
.test-row:last-child { border-bottom: none; padding-bottom: 0; }
.test-row:first-child { padding-top: 0; }
.test-subj { color: white; font-size: 12px; font-weight: 700; margin: 0 0 2px; }
.test-date { color: #64748b; font-size: 10px; margin: 0; }
.test-score { font-size: 14px; font-weight: 900; }

.week-row { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.day-cell { display: flex; flex-direction: column; align-items: center; gap: 5px; }
.day-name { color: #64748b; font-size: 9px; font-weight: 800; }
.day-dot { width: 28px; height: 28px; border-radius: 50%; }
.day-dot.present { background: rgba(16,185,129,0.2); border: 2px solid #10b981; }
.day-dot.absent { background: rgba(239,68,68,0.2); border: 2px solid #ef4444; }
.day-dot.holiday { background: #1f2937; border: 2px solid #374151; }
.day-lbl { font-size: 9px; font-weight: 800; }
.day-lbl.present { color: #10b981; }
.day-lbl.absent { color: #ef4444; }
.day-lbl.holiday { color: #374151; }

.month-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.month-row:last-child { margin-bottom: 0; }
.month-name { color: #94a3b8; font-size: 11px; font-weight: 700; min-width: 60px; }

.mini-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.mini-card { display: flex; flex-direction: column; align-items: center; padding: 16px 10px; gap: 4px; }
.mini-icon { font-size: 22px; }
.mini-val { font-size: 20px; font-weight: 900; }
.mini-lbl { color: #64748b; font-size: 9px; font-weight: 700; text-align: center; }

.act-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-bottom: 1px solid #1f2937; }
.act-item:last-child { border-bottom: none; }
.act-info { flex: 1; }
.act-title { color: white; font-size: 12px; font-weight: 700; margin: 0 0 2px; }
.act-time { color: #64748b; font-size: 10px; margin: 0; }
.act-amount { font-size: 13px; font-weight: 800; }
</style>
