import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine, CommonWidtgetDefine } from '../types'
import { widthFormItem } from './FormItem'

const TextWidget: CommonWidtgetDefine = defineComponent({
  name: 'Text',
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value
      console.log('1 input value', value)
      e.target.value = value
      props.onChange(value)
    }

    return () => {
      const { value } = props
      console.log('text value is', value)
      return <input type="text" value={value as any} onInput={handleChange} />
    }
  },
})

export default widthFormItem(TextWidget)
