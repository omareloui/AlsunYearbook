<script setup lang="ts">
defineComponent;
const props =
  defineProps<{ data: unknown[]; cardComponent: unknown; dataKey: string }>();

const groupedData = Object.entries(
  useGroupByDay(
    props.data,
    d => new Date((d as { createdAt: number }).createdAt)
  )
);
</script>

<template>
  <div class="preview-with-day">
    <div class="day" v-for="day in groupedData">
      <DateChip class="day__date">
        {{ day[0] }}
      </DateChip>

      <div class="day__element">
        <Component
          :is="cardComponent"
          v-for="data in day[1]"
          v-bind="{ [dataKey]: data }"
        >
        </Component>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.preview-with-day {
  @include grid($gap: 30px);
  @include pb(30px);

  .day {
    &__date {
      @include mb(10px);
    }

    &__element {
      @include grid($gap: 15px);
    }
  }
}
</style>
