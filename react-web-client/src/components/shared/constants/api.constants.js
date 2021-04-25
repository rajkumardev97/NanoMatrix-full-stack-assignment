const API_BASE_URL_A = process.env.REACT_APP_API_BASE_URL_A;

export const API_CONSTANTS = {
  PRODUCT: {
    ALL: `${API_BASE_URL_A}/api/list`,
    ADD: `${API_BASE_URL_A}/api/add`,
    GET_BY_ID: `${API_BASE_URL_A}/api/info`,
    GET_BY_SKU_CODE: `${API_BASE_URL_A}/api/skuinfo`,
    UPDATE_BY_ID: `${API_BASE_URL_A}/api/update`,
    DELETE_BY_ID: `${API_BASE_URL_A}/api/remove`,
  },
};
