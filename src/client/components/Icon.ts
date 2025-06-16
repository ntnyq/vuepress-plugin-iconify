import { Icon as IconifyVueIcon } from '@iconify/vue'
import { defineComponent, h } from 'vue'
import type { IconifyIcon, IconifyRenderMode } from '@iconify/vue'
import type { PropType, StyleValue } from 'vue'

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
    return () =>
      h(IconifyVueIcon, {
        icon: props.icon,
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
  },
})
