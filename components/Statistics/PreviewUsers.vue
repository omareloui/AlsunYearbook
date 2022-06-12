<script setup lang="ts">
import type { UsersStatistics } from "types";

const { users } = defineProps<{ users: UsersStatistics }>();

onMounted(async () => {
  const chartJs = await import("chart.js");
  const { Chart, registerables } = chartJs;

  Chart.register(...registerables);

  const ctx1 = (document.querySelector(
    "#canvas1"
  ) as HTMLCanvasElement)!.getContext("2d")!;
  const ctx2 = (document.querySelector(
    "#canvas2"
  ) as HTMLCanvasElement)!.getContext("2d")!;
  const ctx3 = (document.querySelector(
    "#canvas3"
  ) as HTMLCanvasElement)!.getContext("2d")!;

  const { ADMIN, ASSISTANT_ADMIN, ASSISTANT_TO_ADMIN, MODERATOR, USER } =
    users.authorityRoleCount;
  const { STUDENT, PROFESSOR, SPECIAL_MENTION, VISITOR } = users.rolesCount;

  new Chart(ctx1, {
    type: "doughnut",
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
          label: "Authority Roles",
          data: [ADMIN, ASSISTANT_ADMIN, ASSISTANT_TO_ADMIN, MODERATOR, USER],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });

  new Chart(ctx2, {
    type: "doughnut",
    data: {
      labels: ["Students", "Professors", "Special Mentions", "Visitors"],
      datasets: [
        {
          label: "Roles",
          data: [STUDENT, PROFESSOR, SPECIAL_MENTION, VISITOR],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });

  new Chart(ctx3, {
    type: "doughnut",
    data: {
      labels: ["Registered", "Not Registered"],
      datasets: [
        {
          label: "Registrations",
          data: [
            users.totalUsersCount - users.notRegisteredCount,
            users.notRegisteredCount,
          ],
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
  });
});
</script>

<template>
  <StatisticsSection title="Users" :count="users.totalUsersCount">
    <div class="canvases">
      <div class="canvas-container">
        <canvas id="canvas1"></canvas>
      </div>
      <div class="canvas-container">
        <canvas id="canvas2"></canvas>
      </div>
      <div class="canvas-container">
        <canvas id="canvas3"></canvas>
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
  }
}
</style>
