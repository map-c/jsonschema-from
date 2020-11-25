import { defineComponent } from 'vue'
import { FiledPropsDefine, Schema } from '../types'
import { useVJSFContext } from '../context'

export default defineComponent({
  name: 'ArrayField',
  props: FiledPropsDefine,
  setup(props) {
    const context = useVJSFContext()

    const handleChange = (v: any, index: number) => {
      const value = Array.isArray(props.value) ? props.value : []
      value[index] = v
      props.onChange(value)
    }

    return () => {
      const SchemaItem = context.SchemaItem
      const { schema, value, rootSchema } = props

      const items = schema.items

      const isMulitType = Array.isArray(items)

      const isSelect = items && (items as any).enum

      if (isMulitType) {
        const schemaArr: Schema[] = schema.items as Schema[]
        const currentValue = Array.isArray(value) ? value : []
        return schemaArr.map((item: Schema, index: number) => (
          <SchemaItem
            schema={item}
            value={currentValue[index]}
            rootSchema={rootSchema}
            errorSchema={{}}
            onChange={(v) => handleChange(v, index)}
          />
        ))
      } else if (!isSelect) {
        const v = Array.isArray(value) ? value : []
        return v.map((item: Schema, index: number) => {
          return (
            <SchemaItem
              key={index}
              schema={props.schema.items as Schema}
              rootSchema={rootSchema}
              errorSchema={{}}
              value={item}
              onChange={(item) => handleChange(item, index)}
            />
          )
        })
      }

      return <div>Array fields</div>
    }
  },
})
