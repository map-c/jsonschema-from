import {
  computed,
  defineComponent,
  PropType,
  provide,
  ComputedRef,
  inject,
} from 'vue'
import { CommonWidgetNames, SelectionWidgeNames, Theme } from './types'
import { useVJSFContext } from './context'

const THEME_PROVIDER_KEY = Symbol()

const ThemeProvider = defineComponent({
  name: 'ThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      requred: true,
    },
  },
  setup(props, { slots }) {
    const context = computed(() => props.theme)

    provide(THEME_PROVIDER_KEY, context)

    return () => slots.default && slots.default()
  },
})

export default ThemeProvider

export function getWidget<T extends SelectionWidgeNames | CommonWidgetNames>(
  name: T,
  props: any,
) {
  const formContext = useVJSFContext()

  if (props) {
    // TODO: 处理 formContext
  }

  const context: ComputedRef<Theme> | undefined = inject(THEME_PROVIDER_KEY)
  if (!context) {
    throw new Error('theme required')
  }

  const widgetRef = computed(() => {
    return context.value.widgets[name]
  })

  return widgetRef
}
