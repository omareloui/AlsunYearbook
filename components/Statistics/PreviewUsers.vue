<script setup lang="ts">
import type { UsersStatistics } from "types";

const { users } = defineProps<{ users: UsersStatistics }>();

const authoritiesCanvasRef = ref(null as null | HTMLCanvasElement);
const rolesCanvasRef = ref(null as null | HTMLCanvasElement);
const registrationsCanvasRef = ref(null as null | HTMLCanvasElement);

const isLoading = ref(true);
let charts: unknown[] = [];

onMounted(async () => {
  isLoading.value = false;

  const chartJs = await import("chart.js");
  const { Chart, registerables } = chartJs;

  Chart.register(...registerables);

  const authoritiesCanvas = authoritiesCanvasRef.value;
  const rolesCanvas = rolesCanvasRef.value;
  const registrationsCanvas = registrationsCanvasRef.value;

  if (!authoritiesCanvas || !rolesCanvas || !registrationsCanvas) return;

  const authoritiesContext = authoritiesCanvas.getContext("2d")!;
  const rolesContext = rolesCanvas.getContext("2d")!;
  const registrationsContext = registrationsCanvas.getContext("2d")!;

  const { ADMIN, ASSISTANT_ADMIN, ASSISTANT_TO_ADMIN, MODERATOR, USER } =
    users.authorityRoleCount;
  const { STUDENT, PROFESSOR, SPECIAL_MENTION, VISITOR } = users.rolesCount;

  const authoritiesChart = new Chart(authoritiesContext, {
    type: "doughnut",
    options: {
      cutout: "40%",
    },
    data: {
      labels: [
        "Admins",
        "Assistant Admins",
        "Assistants To Admin",
        "Moderators",
        "Users",
      ],
      datasets: [
        {
          data: [ADMIN, ASSISTANT_ADMIN, ASSISTANT_TO_ADMIN, MODERATOR, USER],
          backgroundColor: [
            "hsl(201, 100%, 67%)",
            "hsl(0, 100%, 70%)",
            "hsl(43, 100%, 67%)",
            "hsl(180, 48%, 52%)",
            "hsl(260, 100%, 70%)",
          ],
          borderRadius: 8,
          spacing: 4,
        },
      ],
    },
  });

  const rolesChart = new Chart(rolesContext, {
    type: "doughnut",
    options: {
      cutout: "40%",
    },
    data: {
      labels: ["Students", "Professors", "Special Mentions", "Visitors"],
      datasets: [
        {
          data: [STUDENT, PROFESSOR, SPECIAL_MENTION, VISITOR],
          backgroundColor: [
            "hsl(201, 100%, 67%)",
            "hsl(0, 100%, 70%)",
            "hsl(43, 100%, 67%)",
            "hsl(260, 100%, 70%)",
          ],
          borderRadius: 8,
          spacing: 4,
        },
      ],
    },
  });

  const registrationsChart = new Chart(registrationsContext, {
    type: "doughnut",
    options: { cutout: "40%" },
    data: {
      labels: ["Registered", "Not Registered"],
      datasets: [
        {
          data: [
            users.totalUsersCount - users.notRegisteredCount,
            users.notRegisteredCount,
          ],
          backgroundColor: ["hsl(201, 100%, 67%)", "hsl(0, 100%, 70%)"],
          borderRadius: 8,
          spacing: 4,
        },
      ],
    },
  });

  [authoritiesChart, rolesChart, registrationsChart].forEach(c =>
    charts.push(c)
  );
});

onBeforeUnmount(() => {
  (charts as { destroy: () => void }[]).forEach(c => c.destroy());
});
</script>

<template>
  <StatisticsSection title="Users" :count="users.totalUsersCount">
    <div class="canvases">
      <div class="canvas-container">
        <h3 class="canvas-container__title">Registrations</h3>

        <div class="canvas-container__body">
          <Transition name="fade">
            <div v-if="isLoading" class="canvas-container__skeleton-load"></div>
          </Transition>
          <canvas ref="registrationsCanvasRef"></canvas>
        </div>
      </div>
      <div class="canvas-container">
        <h3 class="canvas-container__title">Roles</h3>
        <div class="canvas-container__body">
          <Transition name="fade">
            <div v-if="isLoading" class="canvas-container__skeleton-load"></div>
          </Transition>
          <canvas ref="rolesCanvasRef"></canvas>
        </div>
      </div>
      <div class="canvas-container">
        <h3 class="canvas-container__title">Authorities</h3>
        <div class="canvas-container__body">
          <div
            class="canvas-container__skeleton-load"
            :class="{ 'canvas-container__skeleton-load--loaded': !isLoading }"
          ></div>
          <canvas ref="authoritiesCanvasRef"></canvas>
        </div>
      </div>
    </div>
  </StatisticsSection>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.canvases {
  @include flex($wrap: true, $gap: 40px);

  .canvas-container {
    @include mx(auto);
    @include w(100%);
    @include w(max 400px);
    @include pa(25px 15px);
    @include clr-bg(secondary);
    @include br-lg;

    &__title {
      @include center-text;
      @include mt(10px);
      @include mb(20px);
      @include clr-txt(fade);
      @include fs-lg;
    }

    &__body {
      @include pos-r;
      aspect-ratio: 1 / 1;
    }

    &__skeleton-load {
      @include center;

      opacity: 0.4;
      animation: skeleton-loading 0.5s linear infinite alternate;
      @include size(100%);
      @include br-md;
      @include tran(opacity);

      &--loaded {
        opacity: 0;
        animation: none;
      }
    }
  }
}
</style>
