<script setup lang="ts">
import { useRoute } from "vue-router"
import { GetSubAppUrl, WujieMount } from "./utils"

const props = defineProps<{
  getSubAppUrl: GetSubAppUrl
}>()

const route = useRoute()
const refChildPath = computed(() => route.params?.childPath || "")

const name = import.meta.env.VITE_PROJECT_NAME
let app: WujieMount

const refMicroAppMount = ref<HTMLElement | null>(null)
onMounted(() => {
  app = new WujieMount({
    name,
    props: {
      pageBaseRoute: `${import.meta.env.BASE_URL}/page`
    },
    getSubAppUrl: props.getSubAppUrl,
  })
  app.mount(unref(refMicroAppMount) as HTMLElement)
  watch(refChildPath, () => app.jump(window.location.href), { immediate: true })
})

onUnmounted(() => {
  app?.destroy()
})
</script>
<template>
  <div class="w-full h-full">
    <div ref="refMicroAppMount" class="w-full h-full"></div>
  </div>
</template>
