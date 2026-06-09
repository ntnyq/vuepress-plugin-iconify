import { getIcon, Icon as IconifyVueIcon } from '@iconify/vue'
import { defineComponent, h } from 'vue'
import type { IconifyIcon, IconifyRenderMode } from '@iconify/vue'
import type { PropType, StyleValue } from 'vue'
import type { IconifyMode } from '../../shared/types.js'

declare const __ICONIFY_MODE__: IconifyMode

export const Icon = defineComponent({
  props: {
    icon: {
      type: [String, Object] as PropType<string | IconifyIcon>,
      required: true,
    },

    width: [String, Number],
    height: [String, Number],

    mode: String as PropType<IconifyRenderMode>,
    style: [String, Object, Array] as PropType<StyleValue>,

    color: String,
    flip: String,
    vFlip: Boolean,
    hFlip: Boolean,
    // alias of vFlip
    verticalFlip: Boolean,
    // alias of hFlip
    horizontalFlip: Boolean,

    inline: Boolean,
    rotate: Number,
    ariaHidden: Boolean,
  },

  setup(props) {
    const resolveIcon = (): string | IconifyIcon | null => {
      if (__ICONIFY_MODE__ !== 'offline') {
        return props.icon
      }

      if (typeof props.icon !== 'string') {
        return props.icon
      }

      return getIcon(props.icon) || null
    }

    return () => {
      const resolvedIcon = resolveIcon()
      if (!resolvedIcon) {
        return null
      }

      return h(IconifyVueIcon, {
        icon: resolvedIcon,
        width: props.width,
        height: props.height,
        mode: props.mode,
        color: props.color,
        style: props.style,
        flip: props.flip,
        vFlip: props.verticalFlip || props.vFlip,
        hFlip: props.horizontalFlip || props.hFlip,
        inline: props.inline,
        rotate: props.rotate,
        ariaHidden: props.ariaHidden,
      })
    }
  },
})
