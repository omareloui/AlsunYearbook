<script setup lang="ts">
withDefaults(defineProps<{ color?: string }>(), {
  color: "var(--clr-text-main)",
});
</script>

<template>
  <svg viewBox="0 0 32 32">
    <path
      :fill="color"
      d="M17.6,15.1h12.8c0.6,0,1.1-0.5,1.1-1.1C31.6,6.3,25.3,0,17.6,0c-0.6,0-1.1,0.5-1.1,1.1v12.8
		C16.5,14.6,17,15.1,17.6,15.1z M18.7,2.3c5.6,0.5,10,5,10.5,10.5H18.7C18.7,12.8,18.7,2.3,18.7,2.3z"
    />
    <path
      :fill="color"
      d="M24.1,27.1c0,0.3-0.1,0.6-0.3,0.8c-2.6,2.6-6.1,4.1-9.9,4.1C6.3,32,0,25.7,0,18.1S6.3,4.1,13.9,4.1
		c0.6,0,1.1,0.5,1.1,1.1v12.4l8.7,8.7C24,26.5,24.1,26.8,24.1,27.1z"
    />
    <path
      :fill="color"
      d="M32,17.3c0,3.7-1.4,7.2-4.1,9.9c-0.2,0.2-0.5,0.3-0.8,0.3c-0.3,0-0.5-0.1-0.8-0.3l0,0c0,0,0,0,0,0l-9.1-9.1
		c-0.3-0.3-0.4-0.8-0.2-1.2c0.2-0.4,0.6-0.7,1-0.7h12.8C31.5,16.2,32,16.7,32,17.3z"
    />
  </svg>
</template>
