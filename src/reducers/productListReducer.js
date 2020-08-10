import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  CREATE_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_SUCCESS
} from '../actions/productActions';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function productReducer(state = initialState, action) {
  switch(action.type) {
    case CREATE_PRODUCT_SUCCESS:
      // create products action payload store
      // mark the spinner as false as we got `items`
      let items = state.items;
      items.push(action.payload);
      return {
        ...state,
        loading: false,
        items,
        error: null
      };
      
    case FETCH_PRODUCTS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something later on as usecase
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PRODUCTS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.products,
        error: null
      };

    case REMOVE_PRODUCT_SUCCESS:
      // set loading "false".
      // update the products item store
      let updatedItems = state.items.filter(item => {
        return item.id !== action.payload.productId
      });
      return {
        ...state,
        items: updatedItems,
        loading: false,
        error: null
      };

    case SEARCH_PRODUCT_SUCCESS:
      // set loading "false".
      // searched products item store
      return {
        ...state,
        loading: false,
        items: action.payload.products,
        error: null
      }

    case FETCH_PRODUCTS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, hence, set `items` empty.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      // default case in a reducer
      return state;
  }
}