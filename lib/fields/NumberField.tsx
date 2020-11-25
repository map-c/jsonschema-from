import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'NumberField',
  props: {
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
  setup(props) {
    const handleChange = (v: any) => {
      const value = Number(v.target.value)
      if (isNaN(value)) {
        props.onChange(undefined)
      } else {
        props.onChange(value)
      }
    }

    return () => {
      const { value, ...reset } = props
      console.log('number is', value)
      return (
        <input type="number" value={value as number} onChange={handleChange} />
      )
    }
  },
})
