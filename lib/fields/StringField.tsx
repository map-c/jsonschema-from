import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'StringFiled',
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
      const value = v.target.value
      if (value) {
        props.onChange(value)
      }
    }

    return () => {
      const { value, ...rest } = props
      console.log('input value', value)
      return <input value={value as string} {...rest} onChange={handleChange} />
    }
  },
})
