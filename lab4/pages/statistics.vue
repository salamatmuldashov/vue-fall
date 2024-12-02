<template>
  <Header @chooseTopic="chooseTopic" />
  <div class="statistics-page">
    <div class="statistic-page-title">
      <NuxtLink :to="backRoute" class="back">
        <button type="button" class="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path
              style="fill: #232326"
              d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"
              data-name="Left"
            />
          </svg>
        </button>
      </NuxtLink>

      <div class="statistics-title">Statistic</div>
    </div>
    <div>{{ data }}</div>
    <div class="statistic-page-body">
      <DatePicker
        v-model="dateRange"
        range
        input-class="input-date"
        :format="formatDateRange"
      />
      <canvas id="dataChart" class="dataChart"></canvas>
      <div class="hint">x-axis: Date</div>
      <div class="hint">y-axis: Total of views of your profile(0-9)</div>
    </div>
  </div>
</template>

<script setup>
const backRoute = "/profile";
const { chooseTopic } = useTopic();
const currentUser = useState("currentUser");
import { Chart, registerables } from "chart.js";
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { da } from "date-fns/locale";

Chart.register(...registerables);

const dateRange = ref(null);
const data = ref({});
const chartInstance = ref(null);

const getCurrentUserData = () => {
  return currentUser ? currentUser.value.posts : [];
};

const formatDateRange = (range) => {
  if (!range || range.length !== 2) return "";

  const [start, end] = range;

  return `${formattedDate(start)} - ${formattedDate(end)}`;
};

const formattedDate = (date) => {
  if (!date) return "";
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en", { month: "long" });

  return `${day} ${month}`;
};

const groupPostsByDate = (filteredPosts) => {
  const groupedData = {};

  filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));


  filteredPosts.forEach((post) => {
    const formatted = formattedDate(post.date);
    if (!groupedData[formatted]) {
      groupedData[formatted] = 0;
    }
    groupedData[formatted]++;
  });
  data.value = groupedData;
};
const filterPostsByDateRange = (range) => {
  const [startDate, endDate] = range;
  if (!startDate || !endDate) return [];

  const posts = getCurrentUserData();
  return posts.filter((post) => {
    const postDate = new Date(post.date);
    return (
      normalizeDate(postDate) >= startDate && normalizeDate(postDate) <= endDate
    );
  });
};

const initChart = (labels, chartData) => {
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  const ctx = document.getElementById("dataChart").getContext("2d");

  chartInstance.value = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          data: chartData,
          backgroundColor: "#11FFE7",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 9,
          ticks: {
            callback: function (value) {
              if (value === 1 || value === 3 || value === 6 || value === 9) {
                return value;
              }
              return "";
            },
          },
        },
      },
    },
  });
};

onMounted(() => {
  initChart(
    [formattedDate(dateRange.value)],
    data.value[formattedDate(dateRange.value)]
  );
});

const normalizeDate = (date) => {
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);
  return normalizedDate;
};

watch(dateRange, (newRange) => {
  if (newRange && newRange.length === 2) {
    newRange[0] = normalizeDate(newRange[0]);
    newRange[1] = normalizeDate(newRange[1]);

    const filteredPosts = filterPostsByDateRange(newRange);
    groupPostsByDate(filteredPosts);

    const labels = Object.keys(data.value);
    const chartData = Object.values(data.value);

    initChart(labels, chartData);
  }
});
</script>

<style scoped>
.statistics-page {
  background: linear-gradient(180deg, #76c5e7 0%, #fbf3f3 100%);

  padding-top: 3.5rem;
  padding-left: 2rem;
  padding-right: 2rem;

  min-height: 1200px;
}

.statistic-page-title {
  display: flex;
  justify-content: space-between;
  padding-left: 2rem;
  padding-right: 6rem;
}

.statistics-title {
  font-family: "Inknut Antiqua";
  font-size: 64px;
  color: #ffffff;
}

.back-button {
  background: #03acf5;
  width: 170px;
  border-radius: 50%;
  height: 100px;
  border: none;
  font-size: 20px;
  display: flex;
  align-items: center;
}
.back-button:hover {
  cursor: pointer;
  opacity: 0.7;
}

.statistic-page-body {
  margin: 2rem 8rem;
  position: relative;
  background: rgba(203, 231, 240, 0.9);
  padding: 1rem;
}

.dataChart {
  margin-top: 2rem;
}

input[type="date"]::-webkit-datetime-edit {
  color: transparent;
}
.input-date {
  position: absolute;
  top: 2%;
  right: 5%;
}
</style>
