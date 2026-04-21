<template>
  <ion-page class="zukko-app">
    <ion-content :fullscreen="true" class="main-content-bg">
      <div class="mobile-wrapper" v-if="!showPremium">
        
        <div class="header-section">
          <div class="title-group">
            <h1 class="page-title">Earn Rewards</h1>
            <p class="page-subtitle">Bilim oling va ZukkoCoin to'plang</p>
          </div>
          <div class="coin-badge">
            <span class="coin-icon">🪙</span>
            <span class="coin-count">1,250</span>
          </div>
        </div>

        <div class="premium-promo-card" @click="showPremium = true">
          <div class="promo-content">
            <span class="promo-crown">👑</span>
            <div class="promo-text">
              <h4>Premium Kurslar</h4>
              <p>Ekspert mentorlar va sertifikatlar</p>
            </div>
          </div>
          <button class="promo-btn">O'tish</button>
        </div>

        <h3 class="section-title">⚡ O'RGANISHDA DAVOM ETING</h3>
        <div class="glass-card continue-card">
          <div class="course-info">
            <div class="course-icon-wrap">🐍</div>
            <div class="course-text">
              <h4 class="course-name">Python asoslari</h4>
              <p class="course-meta">65% bajarildi • Beginner</p>
            </div>
          </div>
          <div class="progress-container">
            <div class="progress-bar"><div class="progress-fill" style="width: 65%"></div></div>
            <span class="pct-text">65%</span>
          </div>
          <button class="resume-btn">Darsni davom ettirish</button>
        </div>

        <div class="section-top">
          <h3 class="section-title">📋 ASOSIY KURSLAR</h3>
        </div>
        <div class="courses-grid">
          <div v-for="course in courses" :key="course.id" class="glass-card course-item" @click="openDetails(course)">
            <div class="course-main">
              <div class="course-emoji" :style="{ background: course.iconBg, color: course.color }">{{ course.icon }}</div>
              <div class="course-details">
                <h4 class="c-title">{{ course.title }}</h4>
                <div class="reward-tag">
                  <span class="zk-plus">+{{ course.reward }}</span>
                  <span class="zk-unit">ZK</span>
                </div>
              </div>
            </div>
            <div class="level-badge" :class="course.level.toLowerCase()">{{ course.level }}</div>
          </div>
        </div>
      </div>

      <div class="mobile-wrapper" v-else>
        <div class="back-nav" @click="showPremium = false">
          <span>← Orqaga</span>
          <h2 class="premium-title">Premium Kurslar</h2>
        </div>
        
        <div class="premium-grid">
          <div v-for="pCourse in premiumCourses" :key="pCourse.id" class="glass-card p-item">
            <div class="p-header">
              <span class="p-icon">{{ pCourse.icon }}</span>
              <span class="p-price">{{ pCourse.price }} ZK</span>
            </div>
            <h3 class="p-title">{{ pCourse.title }}</h3>
            <p class="p-desc">{{ pCourse.desc }}</p>
            <div class="p-stats">
              <span>⏱️ {{ pCourse.duration }}</span>
              <span>📝 {{ pCourse.exams }} imtihon</span>
            </div>
            <button class="buy-btn">Sotib olish</button>
          </div>
        </div>
      </div>

      <ion-modal :is-open="isModalOpen" @didDismiss="isModalOpen = false" class="course-modal">
        <div class="modal-content" v-if="selectedCourse">
          <div class="modal-header">
            <span class="close-icon" @click="isModalOpen = false">×</span>
            <div class="modal-emoji" :style="{ background: selectedCourse.iconBg }">{{ selectedCourse.icon }}</div>
            <h2>{{ selectedCourse.title }}</h2>
          </div>
          
          <div class="modal-body">
            <div class="info-row">
              <div class="info-box"><span>Daraja:</span> <strong>{{ selectedCourse.level }}</strong></div>
              <div class="info-box"><span>Davomiyligi:</span> <strong>{{ selectedCourse.duration }}</strong></div>
            </div>
            <div class="info-row">
              <div class="info-box"><span>Imtihonlar:</span> <strong>{{ selectedCourse.exams }} ta</strong></div>
              <div class="info-box"><span>Mukofot:</span> <strong class="text-yellow-500">{{ selectedCourse.reward }} ZK</strong></div>
            </div>
            <p class="course-description">
              Ushbu kursda siz {{ selectedCourse.title }} bo'yicha eng muhim tushunchalarni o'rganasiz. 
              Darslar TryHackMe va xalqaro standartlar asosida tuzilgan.
            </p>
            <button class="start-now-btn">Kursni boshlash</button>
          </div>
        </div>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonModal } from '@ionic/vue';
import { ref } from 'vue';

const showPremium = ref(false);
const isModalOpen = ref(false);
const selectedCourse = ref<any>(null);

const courses = [
  { id: 1, title: 'Kiberxavfsizlik', reward: 500, icon: '🛡️', color: '#10b981', iconBg: 'rgba(16,185,129,0.15)', level: 'Beginner', duration: '12 soat', exams: 3 },
  { id: 2, title: 'Frontend (Vue.js)', reward: 750, icon: '💻', color: '#3b82f6', iconBg: 'rgba(59,130,246,0.15)', level: 'Middle', duration: '24 soat', exams: 5 },
  { id: 3, title: 'Moliya savodi', reward: 300, icon: '📈', color: '#fbbf24', iconBg: 'rgba(251,191,36,0.15)', level: 'Beginner', duration: '8 soat', exams: 2 }
];

const premiumCourses = [
  { id: 101, title: 'Ethical Hacking PRO', price: 2500, icon: '💀', desc: 'Eng kuchli mentorlar bilan kiberxavfsizlikni chuqur o\'rganing.', duration: '40 soat', exams: 10 },
  { id: 102, title: 'Advanced Cryptography', price: 1800, icon: '🔐', desc: 'Murakkab algoritmlar va shifrlash usullari.', duration: '30 soat', exams: 7 }
];

const openDetails = (course: any) => {
  selectedCourse.value = course;
  isModalOpen.value = true;
};
</script>

<style scoped>
.zukko-app { --background: #030712 !important; }
.main-content-bg { --background: #030712 !important; }
.mobile-wrapper { max-width: 450px; margin: 0 auto; padding: 20px 16px 100px; }

/* PREMIUM PROMO */
.premium-promo-card {
  background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
  border-radius: 24px; padding: 20px; display: flex; justify-content: space-between;
  align-items: center; margin-bottom: 24px; cursor: pointer;
  box-shadow: 0 10px 20px rgba(217, 119, 6, 0.2);
}
.promo-content { display: flex; align-items: center; gap: 15px; }
.promo-crown { font-size: 30px; }
.promo-text h4 { color: #000; font-weight: 900; margin: 0; font-size: 18px; }
.promo-text p { color: rgba(0,0,0,0.7); font-size: 12px; margin: 2px 0 0; font-weight: 600; }
.promo-btn { background: #000; color: #fff; border: none; padding: 8px 16px; border-radius: 12px; font-weight: 800; font-size: 12px; }

/* MODAL & BACK NAV */
.back-nav { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; color: #3b82f6; font-weight: 800; }
.premium-title { color: white; margin: 0; font-size: 22px; }

/* GLASS CARDS */
.glass-card { background: #111827; border: 1px solid #1f2937; border-radius: 24px; padding: 16px; margin-bottom: 12px; }
.level-badge { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 8px; text-transform: uppercase; }
.level-badge.beginner { background: rgba(16,185,129,0.1); color: #10b981; }
.level-badge.middle { background: rgba(59,130,246,0.1); color: #3b82f6; }

/* PREMIUM ITEMS */
.p-header { display: flex; justify-content: space-between; margin-bottom: 15px; }
.p-price { color: #fbbf24; font-weight: 900; background: rgba(251,191,36,0.1); padding: 5px 12px; border-radius: 10px; }
.p-title { color: white; font-weight: 800; margin: 0 0 8px; }
.p-desc { color: #94a3b8; font-size: 12px; line-height: 1.5; }
.p-stats { display: flex; gap: 15px; color: #64748b; font-size: 11px; font-weight: 700; margin: 15px 0; }
.buy-btn { width: 100%; background: #fff; color: #000; border: none; padding: 12px; border-radius: 15px; font-weight: 800; }

/* MODAL STYLING */
.course-modal { --height: 60%; --border-radius: 32px 32px 0 0; --background: #111827; }
.modal-content { padding: 25px; color: white; height: 100%; display: flex; flex-direction: column; }
.modal-header { text-align: center; position: relative; margin-bottom: 20px; }
.close-icon { position: absolute; right: 0; top: -10px; font-size: 30px; color: #4b5563; }
.modal-emoji { width: 70px; height: 70px; margin: 0 auto 15px; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 35px; }
.info-row { display: flex; gap: 10px; margin-bottom: 10px; }
.info-box { flex: 1; background: #1f2937; padding: 12px; border-radius: 15px; font-size: 12px; }
.info-box span { color: #94a3b8; display: block; margin-bottom: 4px; }
.course-description { color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 20px 0; }
.start-now-btn { background: #3b82f6; color: white; border: none; padding: 16px; border-radius: 18px; font-weight: 800; font-size: 16px; width: 100%; margin-top: auto; }

/* Qolgan stillar oldingi kod bilan bir xil... */
.header-section { display: flex; justify-content: space-between; margin-bottom: 24px; }
.page-title { color: white; font-size: 24px; font-weight: 900; }
.coin-badge { background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.2); padding: 6px 12px; border-radius: 100px; display: flex; gap: 6px; }
.coin-count { color: #fbbf24; font-weight: 800; }
.section-title { color: #94a3b8; font-size: 11px; font-weight: 800; letter-spacing: 1.2px; margin: 15px 0; }
.continue-card { background: linear-gradient(135deg, #111827 0%, #1e1b4b 100%) !important; border: 1px solid #312e81 !important; }
.course-info { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
.course-icon-wrap { width: 44px; height: 44px; background: rgba(59,130,246,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
.progress-bar { flex: 1; height: 8px; background: #1f2937; border-radius: 10px; overflow: hidden; margin: 10px 0; }
.progress-fill { height: 100%; background: #3b82f6; box-shadow: 0 0 12px rgba(59,130,246,0.5); }
.resume-btn { width: 100%; padding: 12px; border-radius: 14px; border: none; background: #3b82f6; color: white; font-weight: 800; }
.course-item { display: flex; align-items: center; justify-content: space-between; }
.course-main { display: flex; align-items: center; gap: 12px; }
.course-emoji { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
.c-title { color: white; font-size: 14px; font-weight: 800; margin: 0; }
.zk-plus { color: #fbbf24; font-weight: 900; }
</style>