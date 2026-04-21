<template>
  <ion-page class="zukko-wallet-page">
    <ion-content class="ion-padding-horizontal" :fullscreen="true">
      <div class="max-w-[450px] mx-auto min-h-screen pb-24">
        
        <div class="pt-8 mb-6">
          <div class="flex items-center gap-3">
            <div class="avatar-circle">
              <span class="text-white font-bold">A</span>
              <div class="status-indicator"></div>
            </div>
            <h2 class="text-xl font-black text-white italic tracking-tight">Alex</h2>
          </div>
        </div>

        <div class="qr-payment-card-compact mb-8" @click="showQRModal = true">
          <div class="flex items-center gap-3">
            <div class="qr-icon-box-small">
              <div class="qr-mini-dots"></div>
            </div>
            <div>
              <h3 class="text-white font-bold text-[13px] leading-none">Payment QR Code</h3>
              <p class="text-slate-500 text-[9px] font-bold mt-1">Tap to show QR for payment</p>
            </div>
          </div>
          <span class="text-slate-600 text-xs">❯</span>
        </div>

        <div class="section-label mb-3">NFT PASS</div>
        <div class="nft-card-container mb-10">
          <div class="nft-pass-card">
            <div class="card-glow"></div>
            <div class="flex justify-between items-start relative z-10">
              <div>
                <p class="text-[8px] font-black text-white/40 uppercase tracking-[2px]">Digital Identity</p>
                <h4 class="text-white font-black italic tracking-tighter">ZUKKOPAY</h4>
              </div>
              <div class="flex gap-2 opacity-50">
                <span>📶</span> <span>🛡️</span>
              </div>
            </div>
            <div class="chip-gold my-6 relative z-10"></div>
            <div class="card-number mb-6 relative z-10">4592 **** **** 7821</div>
            <div class="flex justify-between items-end relative z-10">
              <div>
                <p class="text-[8px] font-bold text-white/40 uppercase">Student</p>
                <p class="text-xs font-black text-white tracking-widest">ALEX JOHNSON</p>
              </div>
              <div class="text-right">
                <p class="text-[8px] font-bold text-white/40 uppercase">Valid Thru</p>
                <p class="text-xs font-black text-white">06/27</p>
              </div>
            </div>
          </div>
        </div>

        <div class="section-label mb-4 uppercase">Transaction History</div>
        <div class="space-y-3">
          <div v-for="(tx, i) in transactions" :key="i" 
               @click="openDetails(tx)"
               class="tx-dark-card flex items-center justify-between active:scale-95 transition-all cursor-pointer">
            <div class="flex items-center gap-4">
              <div class="tx-icon-circle" :class="tx.type">
                <span v-if="tx.type === 'plus'">↙</span>
                <span v-else-if="tx.type === 'minus'">↘</span>
              </div>
              <div>
                <p class="text-sm font-bold text-white tracking-tight">{{ tx.title }}</p>
                <p class="text-[10px] text-slate-500 font-medium">{{ tx.date }}</p>
              </div>
            </div>
            <div class="text-right">
              <p :class="tx.type === 'plus' ? 'text-green-400' : 'text-red-400'" 
                 class="text-sm font-black">
                {{ tx.type === 'plus' ? '+' : '-' }}{{ tx.amount }} UZS
              </p>
            </div>
          </div>
        </div>

        <ion-modal :is-open="isModalOpen" @didDismiss="isModalOpen = false" class="tx-detail-modal">
          <div class="modal-content" v-if="selectedTx">
            <div class="handle"></div>
            <div class="text-center mb-8">
              <div class="detail-icon mx-auto mb-4" :class="selectedTx.type">
                {{ selectedTx.type === 'plus' ? '↙' : '↘' }}
              </div>
              <h2 class="text-white text-2xl font-black italic">{{ selectedTx.amount }} UZS</h2>
              <p class="text-slate-500 font-bold text-[10px] uppercase mt-1 tracking-widest">Muvaffaqiyatli o'tkazma</p>
            </div>

            <div class="space-y-6">
              <div class="detail-row">
                <span class="label">Kimdan / Kimga</span>
                <p class="value">{{ selectedTx.title }}</p>
              </div>
              <div class="detail-row">
                <span class="label">Sana va Vaqt</span>
                <p class="value">{{ selectedTx.fullDate }}</p>
              </div>
              <div class="detail-row comment-box">
                <span class="label">Komentariya</span>
                <p class="value italic text-slate-300 text-sm mt-1">{{ selectedTx.comment }}</p>
              </div>
            </div>
            
            <button class="close-detail-btn" @click="isModalOpen = false">Yopish</button>
          </div>
        </ion-modal>

        <ion-modal :is-open="showQRModal" @didDismiss="showQRModal = false" class="qr-modal-ui">
          <div class="modal-blur-bg" @click="showQRModal = false"></div>
          <div class="qr-modal-content">
            <button class="close-x" @click="showQRModal = false">✕</button>
            <p class="text-orange-400 text-[10px] font-black uppercase tracking-widest mb-2">To'lov Uchun</p>
            <h2 class="text-white text-2xl font-black italic mb-8">QR-KOD</h2>
            <div class="qr-white-frame relative">
              <div class="qr-image-mock">
                 <div class="qr-square top-left"></div>
                 <div class="qr-square top-right"></div>
                 <div class="qr-square bottom-left"></div>
                 <div class="qr-inner-dots"></div>
              </div>
              <div class="qr-id-badge">ID: 8842</div>
            </div>
            <div class="mt-8 text-center">
              <p class="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Active Balance</p>
              <h1 class="text-3xl font-black text-white italic">450,000 <span class="text-orange-400 text-sm not-italic uppercase">uzs</span></h1>
            </div>
          </div>
        </ion-modal>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonModal } from '@ionic/vue';
import { ref } from 'vue';

const showQRModal = ref(false);
const isModalOpen = ref(false);
const selectedTx = ref<any>(null);

const transactions = ref([
  { 
    title: 'Money from Parent', 
    amount: '50,000', 
    type: 'plus', 
    date: 'Today, 2:30 PM',
    fullDate: '21 Aprel 2026, 14:30:12',
    comment: 'Haftalik cho\'ntak puli. O\'qishlaringga omad!'
  },
  { 
    title: 'School Canteen', 
    amount: '15,000', 
    type: 'minus', 
    date: 'Today, 11:15 AM',
    fullDate: '21 Aprel 2026, 11:15:45',
    comment: 'Tushlik uchun to\'lov.'
  },
  { 
    title: 'School Store', 
    amount: '12,000', 
    type: 'minus', 
    date: 'Yesterday, 12:40 PM',
    fullDate: '20 Aprel 2026, 12:40:05',
    comment: 'Kantselyariya mollari xarid qilindi.'
  },
  { 
    title: 'Transfer to Friend', 
    amount: '5,000', 
    type: 'minus', 
    date: 'Yesterday, 10:20 AM',
    fullDate: '20 Aprel 2026, 10:20:30',
    comment: 'Qarz qaytarildi.'
  }
]);

const openDetails = (tx: any) => {
  selectedTx.value = tx;
  isModalOpen.value = true;
};
</script>

<style scoped>
.zukko-wallet-page { --background: #0b0f1a !important; }
ion-content { --background: #0b0f1a !important; }

/* HEADER */
.avatar-circle { width: 42px; height: 42px; border-radius: 12px; background: #5d5fef; display: flex; align-items: center; justify-content: center; position: relative; }
.status-indicator { position: absolute; bottom: -2px; right: -2px; width: 10px; height: 10px; background: #4caf50; border: 2px solid #0b0f1a; border-radius: 50%; }

/* COMPACT QR BUTTON */
.qr-payment-card-compact { 
  background: #151a2a; border: 1px solid #2d3446; border-radius: 16px; 
  padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; 
}
.qr-icon-box-small { 
  width: 36px; height: 36px; background: #2a2216; border-radius: 10px; 
  display: flex; align-items: center; justify-content: center; border: 1px solid #4a3a1e; 
}
.qr-mini-dots { width: 16px; height: 16px; background-image: radial-gradient(#f59e0b 2px, transparent 2px); background-size: 5px 5px; }

/* NFT PASS */
.section-label { font-size: 11px; font-weight: 900; color: #475569; letter-spacing: 1px; }
.nft-pass-card { height: 210px; background: linear-gradient(135deg, #1e40af 0%, #7e22ce 100%); border-radius: 28px; padding: 24px; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
.card-glow { position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); }
.chip-gold { width: 42px; height: 32px; background: linear-gradient(135deg, #fcd34d 0%, #d97706 100%); border-radius: 6px; }
.card-number { color: white; font-family: 'Courier New', monospace; font-size: 18px; letter-spacing: 3px; font-weight: bold; }

/* TRANSACTION LIST */
.tx-dark-card { background: #151a2a; border: 1px solid #21283b; border-radius: 22px; padding: 15px; margin-bottom: 8px; }
.tx-icon-circle { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; }
.tx-icon-circle.plus { background: #064e3b; color: #10b981; }
.tx-icon-circle.minus { background: #1e293b; color: #64748b; }

/* DETAIL MODAL */
.tx-detail-modal { --height: 60%; --border-radius: 40px 40px 0 0; --background: #151a2a; }
.modal-content { padding: 24px; color: white; }
.handle { width: 40px; height: 4px; background: #2d3446; border-radius: 10px; margin: 0 auto 24px; }
.detail-icon { width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.detail-icon.plus { background: #064e3b; color: #10b981; }
.detail-icon.minus { background: #1e293b; color: #64748b; }
.detail-row { border-bottom: 1px solid #21283b; padding-bottom: 12px; }
.detail-row.comment-box { background: #1a2235; padding: 12px; border-radius: 16px; border: none; }
.label { font-size: 9px; font-weight: 900; color: #475569; text-transform: uppercase; letter-spacing: 1px; }
.value { font-weight: 800; font-size: 15px; margin-top: 4px; }
.close-detail-btn { width: 100%; padding: 16px; background: #1e293b; border-radius: 16px; color: white; font-weight: 900; margin-top: 30px; border: none; }

/* QR MODAL */
.qr-modal-ui { --background: transparent; }
.modal-blur-bg { position: fixed; inset: 0; background: rgba(11, 15, 26, 0.9); backdrop-filter: blur(10px); }
.qr-modal-content { position: relative; background: #151a2a; width: 320px; margin: 15vh auto; border-radius: 35px; border: 1px solid #2d3446; padding: 40px 20px; display: flex; flex-direction: column; align-items: center; }
.close-x { position: absolute; top: 20px; right: 20px; color: #475569; background: none; border: none; font-size: 20px; }
.qr-white-frame { background: white; padding: 25px; border-radius: 30px; width: 180px; height: 180px; }
.qr-image-mock { width: 100%; height: 100%; position: relative; border: 4px solid #000; }
.qr-square { position: absolute; width: 30px; height: 30px; border: 6px solid #000; }
.top-left { top:0; left:0; } .top-right { top:0; right:0; } .bottom-left { bottom:0; left:0; }
.qr-inner-dots { position: absolute; inset: 40px; background-image: radial-gradient(#000 2.5px, transparent 2.5px); background-size: 8px 8px; }
.qr-id-badge { position: absolute; top: -10px; right: -15px; background: #3b82f6; color: white; font-size: 10px; font-weight: 900; padding: 5px 12px; border-radius: 10px; border: 3px solid #151a2a; }
</style>