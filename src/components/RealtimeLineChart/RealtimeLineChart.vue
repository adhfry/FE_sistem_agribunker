<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { type ChartData, type ChartOptions } from "chart.js/auto";
import { database, ref as dbRef, onValue } from "@/services/firebase";
import { useColorSchemeStore } from "@/stores/color-scheme";
import { useDarkModeStore } from "@/stores/dark-mode";
import Chart from "@/components/Base/Chart";
import { getColor } from "@/utils/colors";

// Props untuk menampilkan data spesifik (misalnya: "humidity", "temperature")
const props = defineProps({
  title: String, // Nama chart (contoh: "Humidity Rate Over Time")
  dataPath: String, // Path ke Firebase (contoh: "iot/humidity")
  color: String as any, // Warna garis chart
  unit: String, // Satuan data (contoh: "%", "°C", "V")
  height: Number, // Tinggi chart
});

// Ambil referensi warna dari tema
const colorScheme = computed(() => useColorSchemeStore().colorScheme);
const darkMode = computed(() => useDarkModeStore().darkMode);

// Gradient background untuk chart
const getBackground = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const gradient = ctx?.createLinearGradient(0, 0, 0, 90);
  gradient?.addColorStop(0, getColor(props.color, 0.4));
  gradient?.addColorStop(1, darkMode.value ? "#28344e00" : "#ffffff01");
  return gradient;
};

// State untuk menyimpan data grafik
const labels = ref<string[]>([]);
const chartData = ref<number[]>([]);
const dataRef = dbRef(database, props.dataPath); // Referensi ke Firebase

// Fungsi untuk update data realtime
const updateChart = () => {
  const now = new Date().toLocaleTimeString();

  onValue(dataRef, (snapshot) => {
    const value = snapshot.val();
    if (value !== null) {
      if (labels.value.length >= 10) {
        labels.value.shift();
        chartData.value.shift();
      }
      labels.value.push(now);
      chartData.value.push(parseFloat(value.toFixed(2)));
    }
  });
};

// Data Chart
const data = computed<ChartData>(() => ({
  labels: labels.value,
  datasets: [
    {
      data: chartData.value,
      borderWidth: 1.5,
      borderColor: getColor(props.color, 0.7),
      pointRadius: 0,
      tension: 0.3,
      backgroundColor: getBackground(),
      fill: true,
    },
  ],
}));

// Konfigurasi Chart Options
const options = computed<ChartOptions>(() => ({
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      ticks: { display: false },
      grid: { display: false },
      border: { display: false },
    },
    y: {
      ticks: { display: false },
      grid: { display: false },
      border: { display: false },
    },
  },
}));

// Lifecycle Hooks
let interval;
onMounted(() => {
  updateChart();
  interval = setInterval(updateChart, 30000); // Update setiap 30 detik
});
onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<template>
  <div>
    <div class="text-base text-slate-500">{{ title }}</div>
    <Chart type="line" :data="data" :options="options" :height="height" />
  </div>
</template>
