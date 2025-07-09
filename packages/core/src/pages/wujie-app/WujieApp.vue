<script setup lang="tsx">
import WujieMount from "../../components/wujie-mount"

function getSubAppUrl(route: string) {
  return `${location.origin}${import.meta.env.BASE_URL}/${import.meta.env.VITE_MICRO_APP_SERVER}${route}`
}
</script>
<template>
  <div class="h-screen">
    <WujieMount :getSubAppUrl />
  </div>
</template>