import { inject } from 'vue'
import { CommonFieldType } from './types'

export const SchemaFormContentKey = Symbol()

export function useVJSFContext() {
  const context:
    | {
        SchemaItem: CommonFieldType
      }
    | undefined = inject(SchemaFormContentKey)

  if (!context) {
    throw Error('SchemaForm needed')
  }
  return context
}
