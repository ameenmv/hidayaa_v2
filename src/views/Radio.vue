<template>
   <div class="min-h-screen pt-24 pb-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto max-w-6xl text-center">
         <h1 class="text-4xl font-bold font-arabic text-emerald-900 dark:text-emerald-50 mb-8">الإذاعة</h1>
         <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 border border-gray-100 dark:border-gray-700">
            <div class="text-6xl mb-6">📻</div>
            <p class="text-xl text-gray-600 dark:text-gray-300 font-arabic mb-8">
               إذاعات القرآن الكريم قيد التطوير. ستتمكن قريباً من الاستماع لمحطاتك المفضلة مباشرة.
            </p>
            <router-link to="/"
               class="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold font-arabic">
               <span>←</span>
               العودة للرئيسية
            </router-link>
         </div>
      </div>
   </div>
</template>
