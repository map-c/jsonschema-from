import FormItem from './FormItem'
import TextWidget from './TextWidget'

export default {
  widgets: {
    TextWidget,
    NumberWidget: TextWidget,
    SelectionWidget: {} as any,
  },
}
