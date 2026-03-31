import { SchemaTypeDefinition } from 'sanity'
import { product } from './schemas/product'
import { subproduct } from './schemas/subproduct'
import { news } from './schemas/news'
import { event } from './schemas/event'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, subproduct, news, event],
}
