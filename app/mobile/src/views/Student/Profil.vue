<template>
  <ion-page class="zukko-profile-page">
    <ion-content class="ion-padding-horizontal" :fullscreen="true">
      <div class="max-w-[450px] mx-auto min-h-screen pb-10">
        
        <div class="pt-12 mb-10 flex justify-between items-start px-4">
          <h1 class="text-2xl font-black text-white italic">Profile</h1>
          <div class="avatar-box-mini">
            <span class="text-white font-bold text-sm">A</span>
            <div class="status-online-mini"></div>
          </div>
        </div>

        <div class="space-y-4">
          
          <div @click="openPersonalInfo" class="menu-card-large">
            <div class="flex flex-col">
              <span class="text-[13px] font-black text-white uppercase tracking-wider">Personal Information</span>
              <span class="text-[10px] text-slate-500 font-bold mt-1">Click to view your profile details</span>
            </div>
            <span class="text-slate-600">❯</span>
          </div>

          <div class="section-container">
            <p class="section-label">Theme Mode</p>
            <div class="menu-card">
              <div class="flex items-center gap-3">
                <span class="text-blue-500">🌙</span>
                <span class="menu-text">Dark Mode</span>
              </div>
              <span class="text-slate-600">❯</span>
            </div>
          </div>

          <div class="section-container">
            <p class="section-label">Security</p>
            <div class="menu-card">
              <div class="flex items-center gap-3">
                <span class="text-green-500">🔐</span>
                <span class="menu-text">Change Password</span>
              </div>
              <span class="text-slate-600">❯</span>
            </div>
          </div>

          <div class="section-container">
            <p class="section-label">Language</p>
            <div class="dark-card overflow-hidden">
              <div class="lang-item active">
                <div class="flex items-center gap-3">
                  <span class="text-lg">🌐</span>
                  <span class="menu-text">English</span>
                </div>
                <div class="radio-checked"></div>
              </div>
              <div class="lang-item">
                <div class="flex items-center gap-3">
                  <span class="text-lg">🌐</span>
                  <span class="menu-text">Uzbek</span>
                </div>
              </div>
              <div class="lang-item last">
                <div class="flex items-center gap-3">
                  <span class="text-lg">🌐</span>
                  <span class="menu-text">Russian</span>
                </div>
              </div>
            </div>
          </div>

          <button @click="handleLogout" class="logout-btn-new">
            <span class="text-lg">➞</span> Logout
          </button>

        </div>
      </div>

      <ion-modal :is-open="showInfoModal" @didDismiss="showInfoModal = false" class="info-modal">
        <div class="modal-content">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-2xl font-black text-white italic">Personal Information</h2>
            <button @click="showInfoModal = false" class="text-slate-500 text-2xl">✕</button>
          </div>

          <div class="space-y-4">
            <div class="info-field">
              <label>Full Name</label>
              <div class="field-value">Alex Johnson</div>
            </div>
            <div class="info-field">
              <label>Student ID Number</label>
              <div class="field-value">ZK-2024-001234</div>
            </div>
            <div class="info-field">
              <label>School Name</label>
              <div class="field-value">Central High School</div>
            </div>
            <div class="info-field">
              <label>Class</label>
              <div class="field-value">10-B</div>
            </div>
            <div class="info-field">
              <label>Email</label>
              <div class="field-value text-blue-400 underline">alex.johnson@zukkopay.com</div>
            </div>
          </div>
          
          <button @click="showInfoModal = false" class="logout-btn-new mt-10">
            Close
          </button>
        </div>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonModal } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showInfoModal = ref(false);

const openPersonalInfo = () => {
  showInfoModal.value = true;
};

const handleLogout = () => {
  router.push('/login');
};
</script>

<style scoped>
.zukko-profile-page { --background: #0b0f1a !important; }
ion-content { --background: #0b0f1a !important; }

/* MINI AVATAR */
.avatar-box-mini {
  width: 45px; height: 45px; background: #5d5fef; border-radius: 15px;
  display: flex; align-items: center; justify-content: center; position: relative;
}
.status-online-mini {
  position: absolute; bottom: -2px; right: -2px; width: 12px; height: 12px;
  background: #4caf50; border: 3px solid #0b0f1a; border-radius: 50%;
}

/* CARDS & MENUS */
.menu-card-large {
  background: #151a2a; border: 1px solid #21283b; padding: 20px;
  border-radius: 20px; display: flex; align-items: center; justify-content: space-between;
  cursor: pointer;
}
.menu-card {
  background: #151a2a; border: 1px solid #21283b; padding: 16px 20px;
  border-radius: 20px; display: flex; align-items: center; justify-content: space-between;
}

.section-label {
  font-size: 11px; font-weight: 800; color: #475569;
  text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; margin-left: 10px;
}

.dark-card { background: #151a2a; border: 1px solid #21283b; border-radius: 20px; }

.lang-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid #21283b;
}
.lang-item.active { background: rgba(93, 95, 239, 0.1); }
.lang-item.last { border-bottom: none; }
.radio-checked { width: 8px; height: 8px; background: #5d5fef; border-radius: 50%; box-shadow: 0 0 10px #5d5fef; }

.menu-text { font-size: 14px; font-weight: 700; color: white; }

/* LOGOUT BUTTON */
.logout-btn-new {
  width: 100%; background: #2a1616; border: 1px solid #451a1a;
  padding: 16px; border-radius: 50px; color: #ff5c5c; font-weight: 800;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}

/* MODAL STYLES (2-rasm uchun) */
.info-modal { --background: #0b0f1a; --border-radius: 30px; }
.modal-content { background: #0b0f1a; padding: 30px; height: 100%; }

.info-field { margin-bottom: 20px; }
.info-field label { font-size: 10px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 1px; }
.field-value { font-size: 17px; font-weight: 800; color: white; margin-top: 4px; border-bottom: 1px solid #21283b; padding-bottom: 8px; }
</style>