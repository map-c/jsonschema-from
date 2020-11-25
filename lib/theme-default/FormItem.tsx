import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine, CommonWidtgetDefine } from '../types'

const FormItem = defineComponent({
  name: 'FormItem',
  props: CommonWidgetPropsDefine,
  setup(props, { slots }) {
    return () => {
      const { schema, error } = props
      return (
        <div>
          <label>{schema.title}</label>
          {slots.default && slots.default()}
          <ul>
            {error?.map((item) => {
              ;<li>{item}</li>
            })}
          </ul>
        </div>
      )
    }
  },
})

export function widthFormItem(Widget: any): CommonWidtgetDefine {
  return defineComponent({
    name: `Wrapped${Widget.name}`,
    props: CommonWidgetPropsDefine,
    setup(props, { attrs }) {
      return () => {
        return (
          <FormItem {...props}>
            <Widget {...props} {...attrs} />
          </FormItem>
        )
      }
    },
  })
}

export default FormItem
