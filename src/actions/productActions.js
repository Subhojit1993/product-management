// introducing axios
import axios from 'axios';
// const bind
export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const SEARCH_PRODUCT_SUCCESS = 'SEARCH_PRODUCT_SUCCESS';
export const REMOVE_PRODUCT_SUCCESS = 'REMOVE_PRODUCT_SUCCESS';
export const FINISH_PRODUCTS_LOADING = 'FINISH_PRODUCTS_LOADING';
// product url set
const productUrl = `https://sd-db-1021.herokuapp.com/products`;

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const createProductSuccess = product => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: { product }
});

export const searchProductsSuccess = products => ({
  type: SEARCH_PRODUCT_SUCCESS,
  payload: { products }
});

export const removeProductsSuccess = productId => ({
  type: REMOVE_PRODUCT_SUCCESS,
  payload: { productId }
})

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});

export const finishLoading = finished => ({
  type: FINISH_PRODUCTS_LOADING,
  payload: { finished }
});

// fetch products action
export function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return fetch(productUrl)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchProductsSuccess(json));
        return json;
      })
      .catch(error => {
        dispatch(fetchProductsFailure(error))
      });
  };
}

// search products action
export function searchProducts(param) {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return fetch(`${productUrl}?q=${param}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(searchProductsSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchProductsFailure(error)));
  };
}

// post method
export function createProducts(dataAction) {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return axios.post(productUrl, dataAction.data).then(resp => {
        dispatch(createProductSuccess(resp.data));
    }).catch(error => {
        dispatch(fetchProductsFailure(error))
    });
  }
}

// put request for update
export function updateProducts(dataAction) {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return axios.put(`${productUrl}/${dataAction.setId}`, dataAction.product)
    .then(resp => {
      dispatch(finishLoading(false))
    }).catch(error => {
        dispatch(fetchProductsFailure(error))
    });
  }
}

// delete request for remove products
export function deleteProduct(setId) {
  return dispatch => {
    dispatch(fetchProductsBegin());
    axios.delete(`${productUrl}/${setId}/`)
    .then(resp => {
        dispatch(removeProductsSuccess(setId));
    }).catch(error => {
        dispatch(fetchProductsFailure(error))
    });
  }
}

// HTTP errors handling since fetch won't.
export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}