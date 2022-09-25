<script setup lang="ts">
// use router
const router = useRouter()
const goBack = () => {
  // vue router를 활용해서 이전 페이지로 이동
  router.back()
}
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <div class="flex justify-end">
      <el-button round @click="goBack">
        뒤로가기
      </el-button>
    </div>
    <Suspense>
      <RouterView />
    </Suspense>
    <Footer />
    <div class="mt-5 mx-auto text-center opacity-75 dark:opacity-50 text-sm">
      [Sample Layout]
    </div>
  </main>
</template>
