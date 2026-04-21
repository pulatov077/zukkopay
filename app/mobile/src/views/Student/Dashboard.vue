<template>
  <ion-page class="zukko-app">
    <ion-content :fullscreen="true" class="main-content-bg">

      <div v-if="showSearch" class="modal-overlay" @click.self="showSearch = false">
        <div class="search-modal glass-card-modal">
          <button class="close-btn" @click="showSearch = false">✕</button>
          <h2 class="modal-title" style="text-align:left; font-size:16px; margin-bottom:12px;">Search</h2>
          <div class="search-input-wrap">
            <ion-icon :icon="searchOutline" class="search-inner-icon" />
            <input class="search-input" type="text" placeholder="Search quests, rewards..." v-model="searchQuery" autofocus />
          </div>
          <div v-if="searchQuery" class="search-results">
            <div v-for="r in filteredResults" :key="r" class="search-result-item">{{ r }}</div>
            <div v-if="filteredResults.length === 0" class="no-result">No results found</div>
          </div>
        </div>
      </div>

      <div v-if="showNotify" class="modal-overlay" @click.self="showNotify = false">
        <div class="notify-modal glass-card-modal">
          <button class="close-btn" @click="showNotify = false">✕</button>
          <div class="notify-header-row">
            <h2 class="modal-title" style="text-align:left; font-size:16px; margin:0;">Bildirishnomalar</h2>
            <span class="notif-count-badge">{{ notifications.length }}</span>
          </div>
          <div class="notif-list">
            <div v-for="n in notifications" :key="n.id" class="sms-notif-item" :class="{ unread: n.unread }">
              <div class="sms-icon-wrap" :style="{ background: n.iconBg, color: n.color }">
                {{ n.icon }}
              </div>
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

      <div v-if="selectedQuest" class="modal-overlay" @click.self="selectedQuest = null">
        <div class="modal-content glass-card-modal">
          <button class="close-btn" @click="selectedQuest = null">✕</button>
          <div class="modal-icon-box" :style="{ background: selectedQuest.iconBg, color: selectedQuest.color }">
            <span style="font-size:28px;">{{ selectedQuest.emoji }}</span>
          </div>
          <h2 class="modal-title">{{ selectedQuest.title }}</h2>
          <p class="modal-sub">{{ selectedQuest.sub }}</p>

          <div class="modal-stat">
            <span class="m-label">Progress</span>
            <span class="m-val">{{ selectedQuest.progress }}%</span>
          </div>
          <div class="modal-bar">
            <div class="q-fill" :style="{ width: selectedQuest.progress + '%', background: selectedQuest.color, boxShadow: '0 0 10px ' + selectedQuest.color }"></div>
          </div>

          <div class="modal-reward">
            <span class="m-label">Reward</span>
            <span class="reward-val" :style="{ color: selectedQuest.color }">{{ selectedQuest.reward }}</span>
          </div>

          <div class="task-box">
            <span class="m-label">Task Description</span>
            <p class="task-desc">Finish 5 homework assignments today to complete this quest.</p>
          </div>

          <div class="milestone-box">
            <div class="modal-stat">
              <span class="m-label">Completion Milestone</span>
              <span class="m-val">{{ selectedQuest.progress }}%</span>
            </div>
            <div class="modal-bar">
              <div class="q-fill" :style="{ width: selectedQuest.progress + '%', background: selectedQuest.color }"></div>
            </div>
          </div>

          <button class="continue-btn" :style="{ borderColor: selectedQuest.color, color: selectedQuest.color, background: selectedQuest.color + '18' }">
            ⚡ Continue Quest
          </button>
        </div>
      </div>

      <div v-if="selectedActivity" class="modal-overlay" @click.self="selectedActivity = null">
        <div class="modal-content glass-card-modal">
          <button class="close-btn" @click="selectedActivity = null">✕</button>
          <div class="modal-icon-box" :style="{ background: selectedActivity.iconBg, color: selectedActivity.color }">
            <span style="font-size:28px;">{{ selectedActivity.icon }}</span>
          </div>
          <h2 class="modal-title">{{ selectedActivity.title }}</h2>
          <p class="modal-sub" style="margin-bottom:10px;">{{ selectedActivity.time }}</p>

          <div class="activity-detail-row">
            <span class="m-label">Amount</span>
            <span class="reward-val" :style="{ color: selectedActivity.color, fontSize: '26px' }">{{ selectedActivity.amount }}</span>
          </div>
          <div class="activity-detail-row" style="margin-top:16px;">
            <span class="m-label">Subject</span>
            <p class="task-desc" style="margin:4px 0 0; font-size:14px;">{{ selectedActivity.subject }}</p>
          </div>
          <div class="activity-detail-row" style="margin-top:16px;">
            <span class="m-label">Date &amp; Time</span>
            <p class="task-desc" style="margin:4px 0 0; font-size:14px;">{{ selectedActivity.date }}</p>
          </div>
          <div class="verified-btn">
            <span>✅ Verified by School</span>
          </div>
        </div>
      </div>

      <div class="mobile-wrapper">
        <div class="header-section">
          <div class="user-profile">
            <div class="avatar-box">
              <span class="avatar-text">A</span>
              <div class="online-dot"></div>
            </div>
            <h1 class="greeting">Alex</h1>
          </div>
          <div class="header-tools">
            <button class="tool-btn" @click="showSearch = true">
              <ion-icon :icon="searchOutline" />
            </button>
            <div class="notify-box">
              <button class="tool-btn" @click="showNotify = true">
                <ion-icon :icon="notificationsOutline" />
              </button>
              <span class="badge">{{ notifications.filter(n => n.unread).length }}</span>
            </div>
          </div>
        </div>

        <div class="glass-card main-balance">
          <div class="card-top">
            <span class="label">TOTAL BALANCE</span>
            <button class="eye-btn" @click="balanceVisible = !balanceVisible">
              <ion-icon :icon="balanceVisible ? eyeOutline : eyeOffOutline" class="eye-icon" />
            </button>
          </div>
          <div class="balance-row">
            <h2 class="amount">{{ balanceVisible ? '450,000' : '••••••' }}</h2>
            <span class="unit" v-if="balanceVisible">UZS</span>
          </div>

          <div class="rewards-banner">
            <div class="zap-circle">⚡</div>
            <div class="earned-details">
              <span class="earned-label">REWARDS EARNED</span>
              <span class="earned-value">{{ balanceVisible ? '124.5 ZP' : '••••' }}</span>
            </div>
          </div>

          <div class="action-buttons">
            <button class="act-btn send-btn">SEND</button>
            <button class="act-btn receive-btn">RECEIVE</button>
          </div>
        </div>

        <div class="stats-grid">
          <div class="glass-card stat-box stat-box-gold">
            <div class="stat-header">
              <span class="label">THIS WEEK</span>
              <div class="mini-icon-circle">🪙</div>
            </div>
            <div class="stat-val gold-text">+2,320</div>
            <div class="stat-desc">↗ Coins earned</div>
          </div>
          <div class="glass-card stat-box stat-box-blue">
            <div class="stat-header">
              <span class="label">AVERAGE GRADE</span>
              <div class="mini-icon-circle">🏆</div>
            </div>
            <div class="stat-val blue-text">92</div>
            <div class="stat-desc">↗ Up 5 points</div>
          </div>
        </div>

        <div class="indicator-row">
          <div v-for="s in quickStats" :key="s.label" class="ind-card">
            <span class="ind-icon">{{ s.icon }}</span>
            <span class="ind-label">{{ s.label }}</span>
            <span class="ind-val">{{ s.value }}</span>
          </div>
        </div>

        <div class="section-top">
          <h3 class="section-title">⚡ ACTIVE QUESTS</h3>
          <span class="view-link" @click="navigateTo('/student/earn')">View All ↗</span>
        </div>

        <div class="quests-scroll-wrap">
          <div class="quests-scroll">
            <div
              v-for="q in quests"
              :key="q.id"
              class="quest-scroll-card"
              :style="{ '--q-color': q.color }"
              @click="selectedQuest = q"
            >
              <div class="quest-card-top">
                <div class="q-scroll-icon" :style="{ background: q.iconBg, color: q.color }">
                  {{ q.emoji }}
                </div>
                <span class="quest-reward-badge" :style="{ color: q.color, background: q.color + '18', border: '1px solid ' + q.color + '44' }">
                  {{ q.reward }}
                </span>
              </div>
              <h4 class="q-scroll-title">{{ q.title }}</h4>
              <p class="q-scroll-sub">{{ q.sub }}</p>
              <span class="q-pct" :style="{ color: q.color }">{{ q.progress }}% complete</span>
              <div class="q-progress-bar">
                <div class="q-fill" :style="{ width: q.progress + '%', background: q.color, boxShadow: '0 0 6px ' + q.color }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="glass-card reward-card">
          <div class="reward-card-top">
            <div class="reward-title-row">
              <span class="reward-gift">🎁</span>
              <span class="label">NEXT REWARD</span>
            </div>
            <span class="reward-sparkle">✨</span>
          </div>
          <h3 class="reward-name">School Uniform Voucher</h3>
          <p class="reward-desc">Earn 500 more ZK coins to unlock</p>
          <div class="reward-progress-bar">
            <div class="reward-fill" style="width:65%;"></div>
          </div>
          <div class="reward-meta">
            <span class="r-pct">65% complete</span>
            <span class="r-amount">1,300 / 2,000 ZK</span>
          </div>
          <div class="reward-dots">
            <span v-for="i in 5" :key="i" class="r-dot" :class="{ active: i <= 3 }"></span>
          </div>
        </div>

        <div class="section-top">
          <h3 class="section-title">📋 RECENT ACTIVITY</h3>
          <span class="view-link" @click="navigateTo('/tabs/history')">View All ↗</span>
        </div>

        <div class="glass-card activity-list">
          <div
            v-for="a in activities"
            :key="a.id"
            class="activity-item"
            @click="selectedActivity = a"
          >
            <div class="activity-icon-box" :style="{ background: a.iconBg, color: a.color }">
              {{ a.icon }}
            </div>
            <div class="activity-info">
              <p class="activity-title">{{ a.title }}</p>
              <p class="activity-time">{{ a.time }}</p>
            </div>
            <span class="activity-amount" :style="{ color: a.color }">{{ a.amount }}</span>
          </div>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import { useRouter } from 'vue-router'; // Navigatsiya uchun qo'shildi
import {
  searchOutline,
  notificationsOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons';

const router = useRouter();

// Navigatsiya funksiyasi
const navigateTo = (path: string) => {
  router.push(path);
};

const showSearch = ref(false);
const showNotify = ref(false);
const balanceVisible = ref(true);
const searchQuery = ref('');
const selectedQuest = ref<any>(null);
const selectedActivity = ref<any>(null);

const searchItems = [
  'Complete Daily Reading', 'School Quiz Master', 'Math Homework',
  'Rewards Store', 'Wallet History', 'Weekly Streak',
];

const filteredResults = computed(() =>
  searchItems.filter(i => i.toLowerCase().includes(searchQuery.value.toLowerCase()))
);

// SMS-style notifications
const notifications = ref([
  {
    id: 1, icon: '💰', sender: 'Zukko Wallet', unread: true,
    text: "Walletingizga +150 ZK coin tushdi! \"Daily Reading\" questini bajargangiz uchun mukofot berildi.",
    time: '14:23', iconBg: 'rgba(16,185,129,0.15)', color: '#10b981',
  },
  {
    id: 2, icon: '🎯', sender: 'Quest System', unread: true,
    text: "Tabriklaymiz! \"School Quiz Master\" questini 92% natija bilan bajardingiz. +100 ZP berildi.",
    time: '11:05', iconBg: 'rgba(251,191,36,0.15)', color: '#fbbf24',
  },
  {
    id: 3, icon: '🔐', sender: 'Xavfsizlik', unread: true,
    text: "Parolingiz muvaffaqiyatli o'zgartirildi. Agar siz o'zgartirmagan bo'lsangiz, qo'llab-quvvatlash bilan bog'laning.",
    time: '09:47', iconBg: 'rgba(239,68,68,0.15)', color: '#ef4444',
  },
  {
    id: 4, icon: '📚', sender: 'Zukko School', unread: false,
    text: "Yangi quest mavjud: \"Math Champion\" — 10 ta algebra masalasini yeching va +80 ZP oling!",
    time: 'Kecha', iconBg: 'rgba(167,139,250,0.15)', color: '#a78bfa',
  },
  {
    id: 5, icon: '🔥', sender: 'Streak Bot', unread: false,
    text: "Siz 7 kunlik ketma-ket qatnashish rekordini o'rnatdingiz! Streak bonusi: +30 ZK coin.",
    time: 'Kecha', iconBg: 'rgba(249,115,22,0.15)', color: '#f97316',
  },
  {
    id: 6, icon: '💳', sender: 'Zukko Pay', unread: false,
    text: "Haftalik to'lov muvaffaqiyatli amalga oshirildi. Balansingiz: 450,000 UZS.",
    time: '2 kun oldin', iconBg: 'rgba(59,130,246,0.15)', color: '#3b82f6',
  },
]);

const quickStats = [
  { label: 'STREAK', value: '7 Days', icon: '🔥' },
  { label: 'QUESTS', value: '3/5', icon: '🎯' },
  { label: 'XP TODAY', value: '+170', icon: '⚡' },
  { label: 'ATTENDANCE', value: '98%', icon: '📅' },
];

const quests = [
  {
    id: 1, emoji: '📖', title: 'Complete Daily Reading', sub: 'Read any chapter from your textbook',
    progress: 75, reward: '+50 ZP', color: '#3b82f6', iconBg: 'rgba(59,130,246,0.15)',
  },
  {
    id: 2, emoji: '⭐', title: 'School Quiz Master', sub: "Score 90% on today's quiz",
    progress: 60, reward: '+100 ZP', color: '#fbbf24', iconBg: 'rgba(251,191,36,0.15)',
  },
  {
    id: 3, emoji: '👥', title: 'Collaborate with Friends', sub: 'Work on a group project',
    progress: 40, reward: '+75 ZP', color: '#10b981', iconBg: 'rgba(16,185,129,0.15)',
  },
  {
    id: 4, emoji: '📐', title: 'Math Champion', sub: 'Solve 10 algebra problems',
    progress: 20, reward: '+80 ZP', color: '#a78bfa', iconBg: 'rgba(167,139,250,0.15)',
  },
];

const activities = [
  {
    id: 1, icon: '📖', title: 'Math Homework Submitted', time: '2 hours ago',
    amount: '+50 ZK', color: '#10b981', iconBg: 'rgba(16,185,129,0.15)',
    subject: 'Mathematics', date: '4/21/2026 at 01:43 PM',
  },
  {
    id: 2, icon: '🧪', title: 'Science Quiz - Top Score', time: '5 hours ago',
    amount: '+120 ZK', color: '#3b82f6', iconBg: 'rgba(59,130,246,0.15)',
    subject: 'Science', date: '4/21/2026 at 10:15 AM',
  },
  {
    id: 3, icon: '🏆', title: 'Weekly Attendance Bonus', time: '1 day ago',
    amount: '+80 ZK', color: '#fbbf24', iconBg: 'rgba(251,191,36,0.15)',
    subject: 'Attendance', date: '4/20/2026 at 08:00 AM',
  },
];
</script>

<style scoped>
.zukko-app { --background: #030712 !important; }
.main-content-bg { --background: #030712 !important; background-color: #030712 !important; }
.mobile-wrapper { max-width: 450px; margin: 0 auto; padding: 8px 16px 100px; background: #030712; }

/* GLASS CARDS */
.glass-card {
  background: #111827 !important; border: 1px solid #1f2937 !important;
  border-radius: 20px; padding: 16px; margin-bottom: 12px; transition: box-shadow 0.25s ease;
}

/* HEADER */
.header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.user-profile { display: flex; align-items: center; }
.avatar-box {
  width: 40px; height: 40px; background: #6366f1; border-radius: 11px;
  display: flex; align-items: center; justify-content: center; position: relative;
}
.avatar-text { color: white; font-weight: 800; font-size: 15px; }
.online-dot {
  position: absolute; bottom: -2px; right: -2px; width: 11px; height: 11px;
  background: #10b981; border: 2px solid #030712; border-radius: 50%;
}
.greeting { color: white; font-size: 17px; font-weight: 800; margin: 0 0 0 10px; }
.header-tools { display: flex; align-items: center; gap: 8px; }
.tool-btn {
  background: #1f2937; border: none; padding: 7px 9px; border-radius: 10px;
  color: #94a3b8; font-size: 19px; cursor: pointer; transition: background 0.2s, box-shadow 0.2s;
  display: flex; align-items: center;
}
.tool-btn:hover { background: #374151; box-shadow: 0 0 12px rgba(99,102,241,0.4); }
.notify-box { position: relative; }
.badge {
  position: absolute; top: -5px; right: -5px; background: #ef4444; color: white;
  font-size: 8px; font-weight: 800; border-radius: 20px; padding: 2px 5px; border: 1.5px solid #030712;
}

/* BALANCE — compact */
.main-balance { position: relative; padding: 14px 16px; }
.card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; }
.label { color: #94a3b8; font-size: 10px; font-weight: 700; letter-spacing: 1px; }
.eye-btn {
  background: none; border: none; color: #6b7280; font-size: 17px; cursor: pointer;
  padding: 2px; display: flex; align-items: center; transition: color 0.2s;
}
.eye-btn:hover { color: #94a3b8; }
.eye-icon { font-size: 17px; }
.balance-row { display: flex; align-items: baseline; gap: 5px; margin: 2px 0 0; }
.amount { color: white; font-size: 32px; font-weight: 900; margin: 0; letter-spacing: -1px; }
.unit { color: #6b7280; font-size: 13px; font-weight: 600; }

/* Rewards banner — compact */
.rewards-banner {
  background: rgba(251,191,36,0.08); border: 1px solid rgba(251,191,36,0.18);
  border-radius: 11px; padding: 9px 12px; display: flex; align-items: center; gap: 10px; margin: 10px 0;
}
.zap-circle {
  background: #fbbf24; border-radius: 50%; width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;
}
.earned-label { display: block; color: #94a3b8; font-size: 9px; font-weight: 700; letter-spacing: 1px; }
.earned-value { color: #fbbf24; font-weight: 800; font-size: 14px; }

/* Action buttons — compact */
.action-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.act-btn {
  padding: 10px; border-radius: 10px; border: none; font-weight: 800; font-size: 12px;
  cursor: pointer; transition: box-shadow 0.25s ease, transform 0.15s ease; letter-spacing: 0.5px;
}
.send-btn { background: #064e3b; color: #10b981; }
.send-btn:hover { box-shadow: 0 0 18px rgba(16,185,129,0.5); transform: translateY(-1px); }
.receive-btn { background: #1e3a8a; color: #3b82f6; }
.receive-btn:hover { box-shadow: 0 0 18px rgba(59,130,246,0.5); transform: translateY(-1px); }

/* STATS */
.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.stat-box { cursor: default; padding: 14px; }
.stat-box-gold:hover { box-shadow: 0 0 24px rgba(251,191,36,0.4) !important; }
.stat-box-blue:hover { box-shadow: 0 0 24px rgba(59,130,246,0.4) !important; }
.stat-header { display: flex; justify-content: space-between; align-items: center; }
.mini-icon-circle { font-size: 18px; }
.stat-val { font-size: 24px; font-weight: 900; margin: 4px 0 2px; }
.gold-text { color: #fbbf24; text-shadow: 0 0 12px rgba(251,191,36,0.5); }
.blue-text { color: #3b82f6; text-shadow: 0 0 12px rgba(59,130,246,0.5); }
.stat-desc { color: #10b981; font-size: 10px; font-weight: 700; }

/* INDICATORS */
.indicator-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 12px 0; }
.ind-card {
  background: #111827; border: 1px solid #1f2937; border-radius: 14px; padding: 10px 5px;
  text-align: center; transition: box-shadow 0.2s, transform 0.2s; cursor: default;
}
.ind-card:hover { box-shadow: 0 0 14px rgba(99,102,241,0.3); transform: translateY(-2px); }
.ind-icon { display: block; font-size: 18px; margin-bottom: 4px; }
.ind-label { display: block; font-size: 7.5px; color: #94a3b8; font-weight: 800; letter-spacing: 0.3px; }
.ind-val { color: white; font-size: 11px; font-weight: 800; }

/* SECTION HEADER */
.section-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.section-title { color: white; font-size: 14px; font-weight: 800; margin: 0; }
.view-link { 
  color: #6366f1; 
  font-size: 12px; 
  font-weight: 700; 
  cursor: pointer; 
  transition: opacity 0.2s;
}
.view-link:active { opacity: 0.6; }

/* HORIZONTAL SCROLL QUESTS — compact */
.quests-scroll-wrap { margin-left: -16px; margin-right: -16px; margin-bottom: 12px; overflow: hidden; }
.quests-scroll {
  display: flex; gap: 10px; overflow-x: auto;
  padding: 4px 16px 10px; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;
}
.quests-scroll::-webkit-scrollbar { display: none; }
.quest-scroll-card {
  min-width: 175px; max-width: 175px;
  background: #111827; border: 1px solid #1f2937;
  border-radius: 18px; padding: 13px; cursor: pointer; flex-shrink: 0;
  scroll-snap-align: start; transition: transform 0.2s ease, box-shadow 0.25s ease;
}
.quest-scroll-card:hover { transform: translateY(-3px); box-shadow: 0 0 18px color-mix(in srgb, var(--q-color) 30%, transparent); }
.quest-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 9px; }
.q-scroll-icon {
  width: 36px; height: 36px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; font-size: 17px;
}
.quest-reward-badge { font-size: 10px; font-weight: 800; padding: 3px 7px; border-radius: 20px; }
.q-scroll-title { color: white; font-size: 12px; font-weight: 800; margin: 0 0 3px; line-height: 1.3; }
.q-scroll-sub { color: #94a3b8; font-size: 10px; margin: 0 0 5px; line-height: 1.4; }
.q-pct { font-size: 9px; font-weight: 800; display: block; margin-bottom: 5px; }
.q-progress-bar { height: 4px; background: #1f2937; border-radius: 10px; overflow: hidden; }
.q-fill { height: 100%; border-radius: 10px; }

/* NEXT REWARD */
.reward-card { padding: 14px 16px; }
.reward-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; }
.reward-title-row { display: flex; align-items: center; gap: 7px; }
.reward-gift { font-size: 16px; }
.reward-sparkle { font-size: 18px; }
.reward-name { color: white; font-size: 15px; font-weight: 800; margin: 0 0 3px; }
.reward-desc { color: #94a3b8; font-size: 11px; margin: 0 0 11px; }
.reward-progress-bar { height: 6px; background: #1f2937; border-radius: 10px; overflow: hidden; margin-bottom: 7px; }
.reward-fill { height: 100%; background: #3b82f6; box-shadow: 0 0 10px #3b82f6; border-radius: 10px; }
.reward-meta { display: flex; justify-content: space-between; margin-bottom: 10px; }
.r-pct { color: #94a3b8; font-size: 11px; font-weight: 700; }
.r-amount { color: #3b82f6; font-size: 12px; font-weight: 800; }
.reward-dots { display: flex; gap: 6px; }
.r-dot { width: 7px; height: 7px; border-radius: 50%; background: #1f2937; }
.r-dot.active { background: #3b82f6; }

/* RECENT ACTIVITY */
.activity-list { padding: 0; }
.activity-item {
  display: flex; align-items: center; gap: 12px; padding: 12px 0;
  border-bottom: 1px solid #1f2937; cursor: pointer; transition: all 0.2s;
}
.activity-item:last-child { border-bottom: none; padding-bottom: 0; }
.activity-item:first-child { padding-top: 0; }
.activity-item:hover { background: rgba(255,255,255,0.03); border-radius: 10px; padding-left: 7px; padding-right: 7px; margin: 0 -7px; }
.activity-icon-box {
  width: 38px; height: 38px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;
}
.activity-info { flex: 1; }
.activity-title { color: white; font-size: 12px; font-weight: 700; margin: 0 0 2px; }
.activity-time { color: #64748b; font-size: 10px; margin: 0; }
.activity-amount { font-size: 13px; font-weight: 800; }

/* MODALS */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.85); z-index: 1000;
  display: flex; align-items: center; justify-content: center; padding: 20px;
}
.glass-card-modal {
  background: #0f172a; border: 1px solid #1e293b; border-radius: 26px;
  width: 100%; max-width: 380px; padding: 26px; position: relative;
}
.close-btn {
  position: absolute; top: 16px; right: 16px; background: #1e293b; border: none;
  color: #94a3b8; font-size: 15px; width: 28px; height: 28px; border-radius: 8px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.modal-icon-box {
  width: 60px; height: 60px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;
}
.modal-title { color: white; font-size: 19px; font-weight: 800; margin-bottom: 4px; text-align: center; }
.modal-sub { color: #94a3b8; font-size: 13px; margin-bottom: 18px; text-align: center; }
.modal-stat { display: flex; justify-content: space-between; margin-bottom: 7px; }
.m-label { color: #64748b; font-size: 11px; font-weight: 800; text-transform: uppercase; display: block; }
.m-val { color: white; font-weight: 800; font-size: 13px; }
.modal-bar { height: 7px; background: #1e293b; border-radius: 10px; margin-bottom: 16px; overflow: hidden; }
.modal-reward { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.reward-val { font-weight: 900; font-size: 22px; }
.task-box { text-align: left; margin: 12px 0; }
.task-desc { color: white; font-weight: 600; font-size: 14px; margin-top: 4px; }
.milestone-box { margin-top: 2px; }
.continue-btn {
  width: 100%; padding: 14px; border-radius: 13px; font-weight: 800; font-size: 14px;
  cursor: pointer; transition: opacity 0.2s; border-width: 1px; border-style: solid; margin-top: 4px;
}
.continue-btn:hover { opacity: 0.8; }
.activity-detail-row { text-align: left; }
.verified-btn {
  margin-top: 20px; background: rgba(16,185,129,0.1); border: 1px solid #10b981;
  color: #10b981; padding: 12px; border-radius: 12px; font-weight: 800; font-size: 13px; text-align: center;
}

/* SMS NOTIFICATION MODAL */
.notify-header-row { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.notif-count-badge {
  background: #ef4444; color: white; font-size: 10px; font-weight: 800;
  padding: 2px 7px; border-radius: 20px;
}
.notif-list { display: flex; flex-direction: column; gap: 8px; max-height: 65vh; overflow-y: auto; }
.notif-list::-webkit-scrollbar { width: 3px; }
.notif-list::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
.sms-notif-item {
  display: flex; align-items: flex-start; gap: 11px;
  padding: 12px; background: #1e293b; border-radius: 14px;
  position: relative; border: 1px solid transparent; transition: border-color 0.2s;
}
.sms-notif-item.unread { border-color: #334155; background: #1a2744; }
.sms-icon-wrap {
  width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 18px;
}
.sms-body { flex: 1; min-width: 0; }
.sms-top-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.sms-sender { color: white; font-size: 12px; font-weight: 800; }
.sms-time { color: #64748b; font-size: 10px; font-weight: 600; flex-shrink: 0; margin-left: 8px; }
.sms-text { color: #94a3b8; font-size: 11.5px; line-height: 1.5; margin: 0; }
.unread-dot {
  width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; flex-shrink: 0; margin-top: 4px;
}

/* SEARCH MODAL */
.search-modal { max-width: 380px; padding: 24px; }
.search-input-wrap {
  display: flex; align-items: center; background: #1e293b; border: 1px solid #334155;
  border-radius: 11px; padding: 0 13px; margin-bottom: 14px;
}
.search-inner-icon { color: #64748b; font-size: 17px; margin-right: 9px; }
.search-input {
  background: none; border: none; outline: none; color: white;
  font-size: 14px; font-weight: 600; width: 100%; padding: 12px 0;
}
.search-result-item {
  padding: 11px 13px; background: #1e293b; border-radius: 9px; color: white;
  font-size: 13px; font-weight: 600; margin-bottom: 7px; cursor: pointer; transition: background 0.2s;
}
.search-result-item:hover { background: #334155; }
.no-result { color: #64748b; text-align: center; padding: 18px; font-size: 13px; }
</style>