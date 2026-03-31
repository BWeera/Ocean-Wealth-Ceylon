import { groq } from 'next-sanity'

export const productsQuery = groq`*[_type == "product"] {
  _id,
  name,
  "slug": slug.current,
  category,
  image,
  description,
  "subproducts": *[_type == "subproduct" && mainProduct._ref == ^._id] {
    _id,
    name,
    image,
    description
  }
}`

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  category,
  image,
  description
}`
