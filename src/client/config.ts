import { h } from 'vue'
import { defineClientConfig } from '@vuepress/client'
import { Icon } from '@iconify/vue'

declare const __ICONIFY_COMPONENT_NAME__: string

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component(__ICONIFY_COMPONENT_NAME__, {
      props: {
        icon: {
          type: String,
          required: true,
        },

        color: {
          type: String,
        },

        width: {
          type: [Number, String],
        },

        height: {
          type: [Number, String],
        },

        inline: {
          type: Boolean,
          default: false,
        },

        rotate: {
          type: [Number, String],
        },

        horizontalFlip: {
          type: Boolean,
          default: false,
        },

        verticalFlip: {
          type: Boolean,
          default: false,
        },

        flip: {
          type: String,
        },

        horizontalAlign: {
          type: Boolean,
          default: false,
        },

        verticalAlign: {
          type: Boolean,
          default: false,
        },

        slice: {
          type: String,
          validator (slice: string) {
            return [`meet`, `slice`].includes(slice)
          },
        },

        align: {
          type: String,
        },

        onLoad: {
          type: Function,
          default: () => {},
        },
      },
      setup (props) {
        return () => h(Icon, {
          icon: props.icon,
          color: props.color,
          width: props.width,
          height: props.height,
          inline: props.inline,
          rotate: props.rotate,
          horizontalFlip: props.horizontalFlip,
          verticalFlip: props.verticalFlip,
          flip: props.flip,
          horizontalAlign: props.horizontalAlign,
          verticalAlign: props.verticalAlign,
          slice: props.slice,
          align: props.align,
          onLoad: props.onLoad,
        })
      },
    })
  },
})
