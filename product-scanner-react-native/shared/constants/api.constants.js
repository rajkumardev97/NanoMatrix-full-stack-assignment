const API_BASE_URL_A = "http://192.168.0.109:5000";

export const API_CONSTANTS = {
  BASE: {
    URL: API_BASE_URL_A,
  },
  PRODUCT: {
    ALL: `${API_BASE_URL_A}/api/list`,
    ADD: `${API_BASE_URL_A}/api/add`,
    GET_BY_ID: `${API_BASE_URL_A}/api/info`,
    GET_BY_SKU_CODE: `${API_BASE_URL_A}/api/skuinfo`,
    UPDATE_BY_ID: `${API_BASE_URL_A}/api/update`,
    DELETE_BY_ID: `${API_BASE_URL_A}/api/remove`,
  },
};
