<script setup lang="ts">
import { ref, onMounted } from "vue";
import { database, ref as dbRef, onValue, set } from "@/services/firebase";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import BunkerImg from "@/assets/images/bunker/bunker1.jpg";

// State untuk menyimpan data dari Firebase
const temperature = ref<string>("-- °C");
const humidity = ref<string>("-- %");
const airQuality = ref<string>("-- AQI");
const boxVolume = ref<string>("-- L");
const voltage = ref<string>("-- V");
const windowState = ref<boolean>(false);
const fanState = ref<boolean>(false);

// Fungsi untuk mendapatkan data dari Firebase
const fetchFirebaseData = () => {
  onValue(dbRef(database, "iot/temperature"), (snapshot) => {
    temperature.value =
      snapshot.val() !== null
        ? `${parseFloat(snapshot.val()).toFixed(2)} °C`
        : "-- °C";
  });

  onValue(dbRef(database, "iot/humidity"), (snapshot) => {
    humidity.value =
      snapshot.val() !== null
        ? `${parseFloat(snapshot.val()).toFixed(2)} %`
        : "-- %";
  });

  onValue(dbRef(database, "iot/airQuality"), (snapshot) => {
    airQuality.value =
      snapshot.val() !== null
        ? `${parseFloat(snapshot.val()).toFixed(2)} AQI`
        : "-- AQI";
  });

  onValue(dbRef(database, "iot/boxVolume"), (snapshot) => {
    boxVolume.value =
      snapshot.val() !== null
        ? `${parseFloat(snapshot.val()).toFixed(2)} L`
        : "-- L";
  });

  onValue(dbRef(database, "iot/voltage"), (snapshot) => {
    voltage.value =
      snapshot.val() !== null
        ? `${parseFloat(snapshot.val()).toFixed(2)} V`
        : "-- V";
  });

  onValue(dbRef(database, "iot/windowState"), (snapshot) => {
    windowState.value = snapshot.val() === 1;
  });

  onValue(dbRef(database, "iot/kipasState"), (snapshot) => {
    fanState.value = snapshot.val() === 1;
  });
};

// Fungsi untuk mengubah status Window & Fan di Firebase
const toggleWindow = () => {
  set(dbRef(database, "iot/windowState"), windowState.value ? 0 : 1);
};

const toggleFan = () => {
  set(dbRef(database, "iot/kipasState"), fanState.value ? 0 : 1);
};

// Ambil data saat komponen dimuat
onMounted(() => {
  fetchFirebaseData();
});
</script>

<template>
  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12 2xl:col-span-9">
      <div>
        <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
          <div class="text-base font-medium group-[.mode--light]:text-white">
            Bunker Performance Insights
          </div>
        </div>
        <div class="mt-3.5">
          <div class="flex flex-col gap-3 p-3 xl:flex-row box box--stacked">
            <div>
              <div
                class="z-10 gap-5 xl:gap-14 flex flex-col lg:flex-row xl:flex-col items-center xl:items-start xl:w-[300px] overflow-hidden flex-1 px-10 rounded-[0.6rem] bg-gradient-to-b from-theme-2/90 to-theme-1/[0.85] py-12 xl:py-9 relative before:content-[''] before:w-full before:h-[130%] before:bg-gradient-to-b before:from-black/[0.08] before:to-transparent before:absolute before:left-0 before:top-0 before:-rotate-[38deg] before:hidden before:xl:block before:-ml-[35%]"
              >
                <div>
                  <div
                    class="flex items-center justify-center border rounded-full border-white/10 bg-white/10"
                  >
                    <img
                      :src="BunkerImg"
                      alt="Bunker Image"
                      class="rounded-md saturate-150"
                    />
                  </div>
                </div>
                <div>
                  <div class="text-base text-center text-white lg:text-left">
                    <strong>AgriBunker</strong>
                  </div>
                  <div
                    class="flex items-center justify-center mt-2 gap-3 lg:justify-start"
                  >
                    <div class="text-lg font-medium text-white">Model :</div>
                    <div class="text-xl font-medium text-white">AB241203</div>
                  </div>
                  <div
                    class="mt-3 leading-normal text-center xl:text-left text-white/70"
                  >
                    Status :
                    <span class="py-1 px-2 bg-green-600 rounded-full text-white"
                      >Active</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-col w-full p-5 sm:py-7 sm:px-8 border rounded-[0.6rem] border-slate-300/80 border-dashed"
            >
              <div
                class="flex flex-col flex-1 mt-2 gap-y-5 sm:mt-4 sm:mb-4 lg:mt-2 xl:mb-0 md:flex-row"
              >
                <div class="grid gap-5 md:-mt-2 md:-mb-4 xl:gap-0">
                  <!-- Informasi Bunker -->
                  <div
                    class="flex flex-col w-full p-5 sm:py-7 sm:px-8 border rounded-[0.6rem] border-slate-300/80 border-dashed"
                  >
                    <div class="text-lg font-medium text-center text-slate-700">
                      Bunker Status
                    </div>

                    <div class="grid grid-cols-2 gap-5 mt-5">
                      <div
                        class="flex flex-col items-center p-4 bg-white border rounded-lg shadow-sm"
                      >
                        <Lucide
                          icon="Thermometer"
                          class="w-6 h-6 text-primary"
                        />
                        <p class="text-lg font-semibold">{{ temperature }}</p>
                        <span class="text-sm text-slate-500">Temperature</span>
                      </div>
                      <div
                        class="flex flex-col items-center p-4 bg-white border rounded-lg shadow-sm"
                      >
                        <Lucide icon="Droplet" class="w-6 h-6 text-primary" />
                        <p class="text-lg font-semibold">{{ humidity }}</p>
                        <span class="text-sm text-slate-500">Humidity</span>
                      </div>
                      <div
                        class="flex flex-col items-center p-4 bg-white border rounded-lg shadow-sm"
                      >
                        <Lucide icon="Wind" class="w-6 h-6 text-primary" />
                        <p class="text-lg font-semibold">{{ airQuality }}</p>
                        <span class="text-sm text-slate-500">Air Quality</span>
                      </div>
                      <div
                        class="flex flex-col items-center p-4 bg-white border rounded-lg shadow-sm"
                      >
                        <Lucide icon="Package" class="w-6 h-6 text-primary" />
                        <p class="text-lg font-semibold">{{ boxVolume }}</p>
                        <span class="text-sm text-slate-500">Volume</span>
                      </div>
                      <div
                        class="flex flex-col items-center p-4 bg-white border rounded-lg shadow-sm"
                      >
                        <Lucide icon="Battery" class="w-6 h-6 text-primary" />
                        <p class="text-lg font-semibold">{{ voltage }}</p>
                        <span class="text-sm text-slate-500">Voltage</span>
                      </div>
                    </div>

                    <!-- Toggle Window & Fan -->
                    <div
                      class="flex flex-col items-center gap-4 mt-5 text-white"
                    >
                      <Button
                        @click="toggleWindow"
                        :class="windowState ? 'bg-green-500' : 'bg-red-500'"
                      >
                        {{ windowState ? "Close Window" : "Open Window" }}
                      </Button>
                      <Button
                        @click="toggleFan"
                        :class="fanState ? 'bg-green-500' : 'bg-red-500'"
                      >
                        {{ fanState ? "Turn Off Fan" : "Turn On Fan" }}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
