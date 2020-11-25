import { computed, defineComponent, PropType } from 'vue'
import { getWidget } from '../theme'
import { CommonWidgetNames, FiledPropsDefine } from '../types'

export default defineComponent({
  name: 'StringFiled',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (v: any) => {
      console.log('core value is', v)
      const value = v
      if (value) {
        props.onChange(value)
      }
    }

    const TextWidgetRef = computed(() => {
      const widgetRef = getWidget(CommonWidgetNames.TextWidget, props)
      return widgetRef.value
    })

    return () => {
      const { value, onChange, ...rest } = props
      console.log('string filed value is', value)
      const TextWidget = TextWidgetRef.value

      return (
        <TextWidget
          value={value}
          options={{}}
          {...rest}
          error={[]}
          onChange={handleChange}
        />
      )
    }
  },
})
