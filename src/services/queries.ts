import { gql } from '@apollo/client'

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories{
      id
      name
      cars{
        id
        name
        price
        model
        description
        image{
          url
        }
        colorTop {
          hex
        }
        colorBottom{
          hex
        }
      }
    }
  }
`

export const GET_CARS = gql`
  query GetCarModels($id: ID!) {
    category(where: {id: $id}) {
      cars{
        id
        name
        price
        model
        description
        image{
          url
        }
        colorTop {
          hex
        }
        colorBottom{
          hex
        }
        categories {
          id
          name        
        }
      }      
    }
  }
`
