export const BASE_PATH = {
  USER: "/user",
  ADMIN: "/admin",
  VENDOR: "/vendor",
};

export const ROUTES = {

// User Routes

  USER_HOME: '/',  
  USER_STAY: `${BASE_PATH.USER}/stay`,
  USER_ACCOUNT: `${BASE_PATH.USER}/account`,
  USER_VEHICLE: `${BASE_PATH.USER}/vehicle`,
  USER_STORE: `${BASE_PATH.USER}/store`,
  USER_VISHESH_POOJA: `${BASE_PATH.USER}/vishesh-pooja`,
  USER_LOGIN: `${BASE_PATH.USER}/login`,
  USER_POOJA_DETAIL_VIEW: (id) => `${BASE_PATH.USER}/vishesh-pooja/${id}`,
  USER_PRODUCT_DETAIL_VIEW: (id) => `${BASE_PATH.USER}/store/${id}`,
  USER_STAY_DETAIL_VIEW: (id) => `${BASE_PATH.USER}/stay/${id}`,

// Admin Routes

  ADMIN_DASHBOARD: `${BASE_PATH.ADMIN}/dashboard`,
  ADMIN_USERS: `${BASE_PATH.ADMIN}/users`,

// Vendor Routes

  VENDOR_DASHBOARD: `${BASE_PATH.VENDOR}/dashboard`,
  VENDOR_PRODUCTS: `${BASE_PATH.VENDOR}/products`,
};