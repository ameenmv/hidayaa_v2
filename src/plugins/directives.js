// Custom Vue Directives

// v-ripple: Material ripple effect
export const ripple = {
  mounted(el, binding) {
    el.style.position = 'relative'
    el.style.overflow = 'hidden'

    el.addEventListener('click', function(e) {
      const ripple = document.createElement('span')
      const rect = el.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + 'px'
      ripple.style.left = x + 'px'
      ripple.style.top = y + 'px'
      ripple.classList.add('ripple-effect')

      el.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  }
}

// v-lazy: Lazy load images
export const lazy = {
  mounted(el, binding) {
    const loadImage = () => {
      el.src = binding.value
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage()
          observer.unobserve(el)
        }
      })
    })

    observer.observe(el)
  }
}

// v-click-outside: Detect clicks outside element
export const clickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = function(event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}

// v-scroll-reveal: Reveal on scroll
export const scrollReveal = {
  mounted(el, binding) {
    const options = binding.value || {}
    
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          
          if (options.once !== false) {
            observer.unobserve(el)
          }
        } else if (options.once === false) {
          el.style.opacity = '0'
          el.style.transform = 'translateY(20px)'
        }
      })
    }, {
      threshold: options.threshold || 0.1
    })

    observer.observe(el)
  }
}

// v-tooltip: Simple tooltip
export const tooltip = {
  mounted(el, binding) {
    const tooltipText = binding.value
    
    el.addEventListener('mouseenter', () => {
      const tooltip = document.createElement('div')
      tooltip.textContent = tooltipText
      tooltip.className = 'custom-tooltip'
      tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 0.5rem 0.75rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        white-space: nowrap;
        z-index: 9999;
        pointer-events: none;
      `
      
      document.body.appendChild(tooltip)
      
      const rect = el.getBoundingClientRect()
      tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px'
      tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px'
      
      el._tooltip = tooltip
    })
    
    el.addEventListener('mouseleave', () => {
      if (el._tooltip) {
        el._tooltip.remove()
        delete el._tooltip
      }
    })
  },
  unmounted(el) {
    if (el._tooltip) {
      el._tooltip.remove()
    }
  }
}

export default {
  ripple,
  lazy,
  clickOutside,
  scrollReveal,
  tooltip
}
