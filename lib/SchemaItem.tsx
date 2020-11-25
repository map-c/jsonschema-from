import { computed, defineComponent } from 'vue'
import { FiledPropsDefine, SchemaTypes } from './types'
import StringField from './fields/StringField'
import NumberField from './fields/NumberField'
import ObjectField from './fields/ObjectField'
import ArrayField from './fields/ArrayField'
import { resolveSchema } from './utils'
import component from '*.vue'

export default defineComponent({
  name: 'SchemaItem',
  props: FiledPropsDefine,
  setup(props) {
    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props
      return resolveSchema(schema, rootSchema, value as any)
    })

    return () => {
      const { schema } = props

      const retrievedSchema = retrievedSchemaRef.value

      const type = schema.type as any
      let Component: any

      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField
          break
        }
        case SchemaTypes.OBJECT: {
          Component = ObjectField
          break
        }
        case SchemaTypes.ARRAY: {
          Component = ArrayField
          break
        }
        default: {
          console.warn(`不支持 ${type} 字段`)
        }
      }

      return <Component {...props} schema={retrievedSchema} />
    }
  },
})
