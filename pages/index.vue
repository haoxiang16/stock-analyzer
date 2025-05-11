<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// Redirect to stock analysis page
const router = useRouter()
onMounted(() => {
  router.push('/stock')
})
</script> 