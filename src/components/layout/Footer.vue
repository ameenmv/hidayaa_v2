<template>
  <footer class="relative bg-white dark:bg-[#0b1120] border-t border-gray-100 dark:border-white/5 pt-20 pb-10 overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 pattern-islamic opacity-5"></div>
    
    <div class="container-fluid max-w-7xl mx-auto px-4 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-right">
        
        <!-- About -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center gap-4 justify-center md:justify-start mb-6">
            <div class="relative w-12 h-12 flex items-center justify-center">
              <div class="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-yellow-500 rounded-xl rotate-3 shadow-lg"></div>
              <div class="absolute inset-0 bg-white dark:bg-gray-900 rounded-xl border border-white/10 flex items-center justify-center backdrop-blur-sm">
                 <span class="text-2xl font-bold font-arabic text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-emerald-800 dark:from-emerald-400 dark:to-emerald-600">هـ</span>
              </div>
            </div>
            <div>
              <span class="text-3xl font-bold text-gray-900 dark:text-white font-arabic block">هداية</span>
              <span class="text-[10px] tracking-[0.3em] uppercase text-emerald-600 dark:text-emerald-400 font-bold">The Guidance</span>
            </div>
          </div>
          <p class="text-gray-500 dark:text-gray-400 mb-8 leading-loose max-w-md mx-auto md:mx-0 font-light text-lg">
            منصة إسلامية شاملة تهدف لتيسير تلاوة واستماع القرآن الكريم، مع توفير تجربة مستخدم عصرية وسلسة تراعي قدسية المحتوى.
          </p>
          
          <div class="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/10 dark:to-emerald-900/5 border border-emerald-100 dark:border-emerald-500/10 inline-block w-full shadow-sm">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                🤲
              </div>
              <div class="text-right">
                <p class="text-xs text-emerald-600/80 dark:text-emerald-400/80 font-bold uppercase tracking-wider mb-1">
                  صدقة جارية عن روح
                </p>
                <p class="text-xl font-bold text-emerald-800 dark:text-emerald-200 font-arabic">
                  محمد فؤاد محمد
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Links -->
        <div>
          <h3 class="font-bold text-gray-900 dark:text-white mb-8 text-lg font-arabic relative inline-block">
            روابط سريعة
            <span class="absolute -bottom-2 right-0 w-1/2 h-0.5 bg-emerald-500 rounded-full"></span>
          </h3>
          <ul class="space-y-4">
            <li><router-link to="/" class="text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-emerald-500 transition-colors"></span> الرئيسية</router-link></li>
            <li><router-link to="/quran" class="text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-emerald-500 transition-colors"></span> المصحف الشريف</router-link></li>
            <li><router-link to="/audio" class="text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-emerald-500 transition-colors"></span> الإذاعة والقراء</router-link></li>
            <li><router-link to="/azkar" class="text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-emerald-500 transition-colors"></span> الأذكار</router-link></li>
          </ul>
        </div>

        <!-- Contact/Social -->
        <div>
          <h3 class="font-bold text-gray-900 dark:text-white mb-8 text-lg font-arabic relative inline-block">
            تواصل معنا
            <span class="absolute -bottom-2 right-0 w-1/2 h-0.5 bg-emerald-500 rounded-full"></span>
          </h3>
          <div class="flex gap-4 justify-center md:justify-start mb-8">
            <a href="#" class="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 hover:-translate-y-1 transition-all shadow-sm">
              📧
            </a>
            <a href="#" class="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 hover:-translate-y-1 transition-all shadow-sm">
              📱
            </a>
            <a href="#" class="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 hover:-translate-y-1 transition-all shadow-sm">
              💬
            </a>
          </div>
          
          <!-- Newsletter (Optional) -->
          <div class="bg-gray-50 dark:bg-gray-800 p-1 rounded-xl flex">
            <input type="email" placeholder="البريد الإلكتروني" class="flex-1 bg-transparent px-4 py-2 text-sm outline-none text-gray-700 dark:text-gray-200" />
            <button class="bg-emerald-500 text-white rounded-lg px-4 py-2 text-xs font-bold hover:bg-emerald-600 transition-colors">اشتراك</button>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p class="mb-4 md:mb-0">© {{ new Date().getFullYear() }} <span class="font-bold text-emerald-600 dark:text-emerald-400">هداية</span>. جميع الحقوق محفوظة.</p>
        <div class="flex items-center gap-6">
           <a href="#" class="hover:text-emerald-500 transition-colors">سياسة الخصوصية</a>
           <a href="#" class="hover:text-emerald-500 transition-colors">شروط الاستخدام</a>
           <span class="flex items-center gap-1 text-xs opacity-70 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
             <span>نسألكم الدعاء</span> <span class="text-red-400">❤</span>
           </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
