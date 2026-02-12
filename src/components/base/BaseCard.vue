<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h3 class="text-lg font-semibold text-[rgb(var(--color-text-primary))]">
          {{ title }}
        </h3>
      </slot>
    </div>

    <div class="card-body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'bordered', 'elevated', 'glass'].includes(value)
  },
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value)
  },
  hoverable: {
    type: Boolean,
    default: false
  }
})

const cardClasses = computed(() => {
  const base = 'card rounded-2xl transition-all duration-300 relative overflow-hidden'
  
  const variants = {
    default: 'bg-[rgb(var(--color-bg-secondary))]',
    bordered: 'bg-[rgb(var(--color-bg-secondary))] border border-[rgb(var(--color-border))]',
    elevated: 'bg-[rgb(var(--color-bg-secondary))] shadow-lg shadow-black/5 dark:shadow-black/20',
    glass: 'glass'
  }
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const hover = props.hoverable ? 'hover:shadow-xl hover:-translate-y-1 hover:border-[rgb(var(--color-primary-500))]/30 cursor-pointer' : ''
  
  return [base, variants[props.variant], paddings[props.padding], hover].join(' ')
})
</script>

<style scoped>
.card-header {
  @apply pb-3 border-b border-[rgb(var(--color-bg-tertiary))];
}

.card-body {
  @apply py-3;
}

.card-footer {
  @apply pt-3 border-t border-[rgb(var(--color-bg-tertiary))];
}
</style>
