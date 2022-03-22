  import { 
    ALL_PRODUCTS_REQUEST, 
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    CLEAR_ERRORS

} from "../constants/productConstant";
  
  export const productsReducers = (state = {products: [] }, action) =>{
    switch(action.type)
    {
      case ALL_PRODUCTS_REQUEST:
        return {
          loading: true,
          products: []
           
        }
      
        case ALL_PRODUCTS_SUCCESS:
          return {
            loading: false,
            products: action.payload.products,
            productsCount: action.payload.productsCount,
            resPerPage: action.payload.resPerPage,
            filteredProductCount: action.payload.filteredProductCount
              
          }

          case ALL_PRODUCTS_FAIL:
            return{
              loading: false,
              error: action.payload
            }

          case CLEAR_ERRORS:
            return{
              ...state,
              error: null
            } 


      default:
        return state; 
    }

  }

  export const productDetailsReducer = (state = {product: {} }, action) =>{

    switch(action.type)
    {
      case PRODUCT_DETAILS_REQUEST:
        return {
          ...state,
          loading: true


        }

        case PRODUCT_DETAILS_SUCCESS: 
          return {
            loading: false, //because product is fetch from backend
            product: action.payload // we will pass the product in payload
  
  
          }

          case PRODUCT_DETAILS_FAIL:
            return{
              ...state,
              error: action.payload
            }

            case CLEAR_ERRORS:
              return{
                ...state,
                error: null
              } 
  
  

      default:
        return state;

    }

  }