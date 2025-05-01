<template>
  <dialog :id="computedModalId" class="modal">
    <div class="modal-box max-w-4xl bg-slate-900 rounded-xl shadow-xl border border-slate-700">
      <!-- 標題區域 -->
      <div class="flex items-center px-8 py-6 bg-slate-800 border-b border-slate-700 rounded-t-xl">
        <div class="flex items-center">
          <div class="w-1 h-8 bg-emerald-500 rounded-full mr-4 shadow-sm"></div>
          <h3 class="text-2xl font-bold text-white">
            {{ title }}
          </h3>
        </div>
        <button class="btn btn-sm btn-circle absolute right-4 top-4 bg-slate-700 hover:bg-slate-600 border-0 text-white" @click="hide">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 內容區域 -->
      <div class="min-h-[calc(90vh-8rem)]">
        <div v-if="loading" class="loading-container">
          <span class="loading loading-spinner loading-lg text-emerald-400"></span>
          <p class="loading-text text-slate-300">AI 正在分析資料中，請稍候...</p>
        </div>
        <div v-else class="markdown-body" v-html="renderedContent"></div>
      </div>
    </div>
    
    <form method="dialog" class="modal-backdrop bg-black/40 backdrop-blur-sm">
      <button>關閉</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// 配置 marked
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // 支援換行
});

// 定義 props
const props = withDefaults(defineProps<{
  title: string;
  content: string;
  loading?: boolean;
  modalId?: string;
}>(), {
  loading: false,
  modalId: '',
});

// 模態框 ID
const internalModalId = ref('');
const computedModalId = computed(() => props.modalId || internalModalId.value);

// 在客戶端隨機生成 ID
onMounted(() => {
  if (!props.modalId) {
    internalModalId.value = `modal_${Math.random().toString(36).substring(2, 11)}`;
  }
});

// 渲染 Markdown 內容
const renderedContent = computed(() => {
  try {
    const html = marked.parse(props.content || '') as string;
    // 使用 DOMPurify 清理 HTML
    return DOMPurify.sanitize(html);
  } catch (error) {
    console.error('Markdown rendering error:', error);
    return '<p class="text-red-500">內容渲染錯誤，請稍後再試</p>';
  }
});

// 顯示/隱藏模態框
const show = () => {
  const modal = document.getElementById(computedModalId.value) as HTMLDialogElement;
  if (modal) {
    modal.showModal();
  }
};

const hide = () => {
  const modal = document.getElementById(computedModalId.value) as HTMLDialogElement;
  if (modal) {
    modal.close();
  }
};

// 暴露方法
defineExpose({
  show,
  hide,
  id: computedModalId,
});
</script>

<style scoped>
.markdown-body {
  @apply px-8 py-6 text-lg leading-relaxed text-slate-300;
}

.markdown-body :deep(h1) {
  @apply text-3xl font-bold mb-6 pb-4 border-b border-slate-700 text-white;
}

.markdown-body :deep(h2) {
  @apply text-2xl font-bold mt-8 mb-4 text-white;
}

.markdown-body :deep(h3) {
  @apply text-xl font-bold mt-6 mb-3 text-white;
}

.markdown-body :deep(p) {
  @apply mb-4 text-lg leading-relaxed;
}

.markdown-body :deep(ul) {
  @apply mb-6 pl-6 space-y-2;
}

.markdown-body :deep(li) {
  @apply relative pl-2;
  @apply before:absolute before:left-[-1.5rem] before:top-[0.7rem] before:w-2.5 before:h-2.5;
  @apply before:bg-emerald-500;
  @apply before:rounded-full before:shadow-sm;
}

.markdown-body :deep(strong) {
  @apply font-semibold text-white bg-slate-800 px-1.5 py-0.5 rounded;
}

.markdown-body :deep(table) {
  @apply w-full my-6 border-collapse bg-slate-800 rounded-lg overflow-hidden shadow-sm;
}

.markdown-body :deep(th) {
  @apply bg-slate-700 text-left py-4 px-6 font-semibold text-slate-200 border-b border-slate-600;
}

.markdown-body :deep(td) {
  @apply py-4 px-6 border-b border-slate-700 text-slate-300;
}

.markdown-body :deep(tr:last-child td) {
  @apply border-b-0;
}

.markdown-body :deep(blockquote) {
  @apply my-6 pl-6 border-l-4 border-emerald-500 bg-slate-800/50 py-4 pr-4 rounded-r-lg;
  @apply text-slate-300 italic;
}

.markdown-body :deep(code) {
  @apply bg-slate-800 px-2 py-0.5 rounded text-emerald-300 font-mono text-sm;
}

.markdown-body :deep(pre) {
  @apply bg-slate-800 rounded-lg p-4 mb-6 overflow-x-auto;
}

.markdown-body :deep(pre code) {
  @apply bg-transparent text-slate-300 p-0 text-sm leading-relaxed;
}

/* Loading 狀態樣式 */
.loading-container {
  @apply flex flex-col items-center justify-center py-12 px-8;
}

.loading-text {
  @apply mt-4 text-lg font-medium;
}

/* 滾動條樣式 */
.markdown-body {
  scrollbar-width: thin;
  scrollbar-color: #475569 #1e293b;
}

.markdown-body::-webkit-scrollbar {
  @apply w-2;
}

.markdown-body::-webkit-scrollbar-track {
  @apply bg-slate-800 rounded-full;
}

.markdown-body::-webkit-scrollbar-thumb {
  @apply bg-slate-600 rounded-full hover:bg-slate-500 transition-colors;
}

/* 數據高亮 */
.markdown-body :deep(.highlight-data) {
  @apply bg-slate-800 text-emerald-300 px-2 py-0.5 rounded font-medium;
}
</style> 