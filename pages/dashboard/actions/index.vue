<script setup lang="ts">
import { Action } from "~~/@types";

definePageMeta({ middleware: "has-to-be-assistant-to-admin" });

const actions = (await useCustomFetch("/api/actions")) as Action[];

const groupedActions = Object.entries(
  useGroupByDay(actions, action => new Date(action.createdAt))
);
</script>

<template>
  <Container>
    <h1 class="heading">Actions</h1>

    <div class="body">
      <div class="action-day" v-for="actionDay in groupedActions">
        <div class="action-day__date">{{ actionDay[0] }}</div>
        <div class="action-day__actions">
          <DashboardActionCard
            v-for="action in actionDay[1]"
            v-bind="{ action }"
          />
        </div>
      </div>
    </div>
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.heading {
  @include center-text;
  @include mb(20px);
}

.body {
  @include grid($gap: 30px);
  @include pb(30px);

  .action-day {
    &__date {
      @include w(fit-content);
      @include mb(10px);
      @include mx(auto);
      @include pa(5px 20px);
      @include clr-bg(primary);
      @include br-bl;
      @include fw-bold;
    }

    &__actions {
      @include grid($gap: 15px);
    }
  }
}
</style>
