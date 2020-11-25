import { defineComponent } from 'vue'
import { useVJSFContext } from '../context'
import { FiledPropsDefine } from '../types'
import { isObject } from '../utils'

export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup(props) {
    const context = useVJSFContext()

    const handleChange = (key: string, v: any) => {
      debugger
      const value: any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }

      props.onChange(value)
    }

    return () => {
      const { schema, rootSchema, value } = props

      const { SchemaItem } = context

      const properties = schema.properties || {}

      const currentValue: any = isObject(value) ? value : {}

      return Object.keys(properties).map((k: string, index: number) => {
        return (
          <SchemaItem
            key={index}
            schema={properties[k]}
            value={currentValue[k]}
            errorSchema={{}}
            rootSchema={schema}
            onChange={(v: any) => handleChange(k, v)}
          />
        )
      })
    }
  },
})
