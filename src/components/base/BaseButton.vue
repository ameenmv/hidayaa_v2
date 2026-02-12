<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    v-ripple
    @click="handleClick"
  >
    <span v-if="loading" class="btn-spinner"></span>
    <slot v-else />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  const base = 'btn inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-[rgb(var(--color-primary-500))] text-white hover:bg-[rgb(var(--color-primary-600))] focus:ring-[rgb(var(--color-primary-500))]',
    secondary: 'bg-[rgb(var(--color-secondary-500))] text-white hover:bg-[rgb(var(--color-secondary-600))] focus:ring-[rgb(var(--color-secondary-500))]',
    outline: 'border-2 border-[rgb(var(--color-primary-500))] text-[rgb(var(--color-primary-500))] hover:bg-[rgb(var(--color-primary-50))] focus:ring-[rgb(var(--color-primary-500))]',
    ghost: 'text-[rgb(var(--color-primary-500))] hover:bg-[rgb(var(--color-primary-50))] focus:ring-[rgb(var(--color-primary-500))]',
    danger: 'bg-[rgb(var(--color-error))] text-white hover:bg-red-600 focus:ring-red-500'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  const width = props.fullWidth ? 'w-full' : ''
  const disabled = props.disabled || props.loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  
  return [base, variants[props.variant], sizes[props.size], width, disabled].join(' ')
})

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.btn {
  position: relative;
  overflow: hidden;
}

.btn-spinner {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Ripple effect styles */
:deep(.ripple-effect) {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: scale(0);
  animation: ripple-animation 0.6s ease-out;
  pointer-events: none;
}

@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
