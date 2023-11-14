import { defineComponent, h } from 'vue'
import { Icon as IconifyVueIcon } from '@iconify/vue'
import type { PropType, StyleValue } from 'vue'
import type { IconifyIcon, IconifyIconOnLoad, IconifyRenderMode } from '@iconify/vue'

export const Icon = defineComponent({
  props: {
    icon: {
      type: [String, Object] as PropType<string | IconifyIcon>,
      required: true,
    },

    width: {
      type: [String, Number],
    },

    height: {
      type: [String, Number],
    },

    mode: {
      type: String as PropType<IconifyRenderMode>,
    },

    style: {
      type: [String, Object, Array] as PropType<StyleValue>,
    },

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

    onLoad: {
      type: Function as PropType<IconifyIconOnLoad>,
      default: () => {},
    },
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
        onLoad: props.onLoad,
      })
  },
})
