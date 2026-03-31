export const subproduct = {
  name: 'subproduct',
  title: 'Sub Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'mainProduct',
      title: 'Main Product',
      type: 'reference',
      to: [{ type: 'product' }], // Links this to a main product
      description: 'Select the main product this sub-product belongs to',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}
