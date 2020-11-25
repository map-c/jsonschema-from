import { DefineComponent, defineComponent, PropType } from 'vue'

export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean',
}

type SchemaRef = { $ref: string }

export interface Schema {
  type?: SchemaTypes | string
  const?: any
  format?: string

  title?: string
  default?: any

  properties?: {
    [key: string]: Schema
  }
  items?: Schema | Schema[] | SchemaRef
  uniqueItems?: any
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef
  }
  oneOf?: Schema[]
  anyOf?: Schema[]
  allOf?: Schema[]
  // TODO: uiSchema
  // vjsf?: VueJsonSchemaConfig
  required?: string[]
  enum?: any[]
  enumNames?: any[]
  enumKeyValue?: any[]
  additionalProperties?: any
  additionalItems?: Schema

  minLength?: number
  maxLength?: number
  minimun?: number
  maximum?: number
  multipleOf?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
}

export const FiledPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  value: {
    required: true,
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  uiSchema: {
    type: Object as PropType<any>,
  },
  rootSchema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  errorSchema: {
    type: Object as PropType<any>,
    required: true,
  },
} as const

export const TypeHelperComponent = defineComponent({
  props: FiledPropsDefine,
})

export enum CommonWidgetNames {
  TextWidget = 'TextWidget',
  NumberWidget = 'NumberWidget',
}

export enum SelectionWidgeNames {
  SelectionWidget = 'SelectionWidget',
}

export type CommonWidtgetDefine = DefineComponent<
  typeof CommonWidgetPropsDefine,
  {},
  {}
>

export interface Theme {
  widgets: {
    [SelectionWidgeNames.SelectionWidget]: any
    [CommonWidgetNames.TextWidget]: CommonWidtgetDefine
    [CommonWidgetNames.NumberWidget]: any
  }
}

export type CommonFieldType = typeof TypeHelperComponent

export const CommonWidgetPropsDefine = {
  value: {},
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  error: {
    type: Array as PropType<string[]>,
  },
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  options: {
    type: Object as PropType<{ [key: string]: any }>,
  },
} as const
