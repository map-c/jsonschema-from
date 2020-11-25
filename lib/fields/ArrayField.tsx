import { defineComponent, PropType } from 'vue'
import { FiledPropsDefine, Schema } from '../types'
import { useVJSFContext } from '../context'

const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    index: {
      type: Number as PropType<number>,
      required: true,
    },
    handleAdd: {
      type: Function as PropType<(v: number) => void>,
      required: true,
    },
    handleup: {
      type: Function as PropType<(v: number) => void>,
      required: true,
    },
    handleDown: {
      type: Function as PropType<(v: number) => void>,
      required: true,
    },
    handleDelete: {
      type: Function as PropType<(v: number) => void>,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () => {
      return (
        <div>
          <div>
            <button onClick={() => props.handleAdd(props.index)}>新增</button>
            <button onClick={() => props.handleup(props.index)}>上移</button>
            <button onClick={() => props.handleDown(props.index)}>下移</button>
            <button onClick={() => props.handleDelete(props.index)}>
              删除
            </button>
          </div>
          <div>{slots.default && slots.default()}</div>
        </div>
      )
    }
  },
})

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

    const handleAdd = (index: number) => {
      const value = props.value
      const arr = Array.isArray(value) ? value : []
      arr.splice(index + 1, 0, undefined)
      props.onChange(arr)
    }
    const handleDelete = (index: number) => {
      const value = props.value
      const arr = Array.isArray(value) ? value : []
      arr.splice(index, 1)
      props.onChange(arr)
    }
    const handleup = (index: number) => {
      if (index === 0) return
      const value = props.value
      const arr = Array.isArray(value) ? value : []
      const item = arr.splice(index, 1)
      arr.splice(index - 1, 0, item[0])
      props.onChange(arr)
    }
    const handleDown = (index: number) => {
      const value = props.value
      const arr = Array.isArray(value) ? value : []
      if (index === arr.length - 1) return
      const item = arr.splice(index, 1)
      arr.splice(index + 1, 0, item[0])
      props.onChange(arr)
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
            <ArrayItemWrapper
              index={index}
              handleAdd={handleAdd}
              handleDelete={handleDelete}
              handleup={handleup}
              handleDown={handleDown}
            >
              <SchemaItem
                key={index}
                schema={props.schema.items as Schema}
                rootSchema={rootSchema}
                errorSchema={{}}
                value={item}
                onChange={(item) => handleChange(item, index)}
              />
            </ArrayItemWrapper>
          )
        })
      }

      return <div>Array fields</div>
    }
  },
})
