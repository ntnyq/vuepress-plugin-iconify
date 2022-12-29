import type { PropType, StyleValue } from 'vue'
import { defineComponent, h } from 'vue'
import type { IconifyIcon, IconifyRenderMode } from '@iconify/vue'
import { Icon } from '@iconify/vue'

export const IconComponent = defineComponent({
  props: {
    icon: {
      type: [String, Object] as PropType<String | IconifyIcon>,
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
    // alias
    verticalFlip: Boolean,
    horizontalFlip: Boolean,

    inline: Boolean,
    rotate: [String, Number],
    onLoad: {
      type: Function,
      default: () => {},
    },
  },

  setup (props) {
    return () => h(Icon, {
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
