const host = 'http://linkdam.com';

export default {
  host,
  urls: {
    productInfo: '/product/info', // 产品信息
    login: '/user/login', // 登录
    register: '/user/register', // 注册
    registerVerifyCode: '/user/get_register_verify_code', // 获取注册验证码
    verify: '/user/verify', // 校验验证码
    defaultCountryCode: '/commons/verify_code/get_default_country_code', // 获取默认国家区号
    countryCodes: '/commons/verify_code/get_country_codes', // 获取国家区号
    addToCart: '/cart/add_to_cart', // 添加到购物车
    getCart: '/cart/get_user_cart', // 获取用户购物车
    addAddress: '/user/add_address', // 添加地址
    getAddress: '/user/get_addresses', // 获取地址
    deleteAddress: '/user/delete_address', // 删除地址
    getOrders: '/order/get_user_orders', // 获取用户订单
    createOrder: '/order/create', // 创建订单
    cancelOrder: '/order/cancel_order', // 取消订单
    deleteOrder: '/order/delete_order', // 删除订单
    payOrder: '/order/user_has_pay', // 用户支付订单
    getForgetVerifyCode: '/user/forget_pas_verify_code', // 获取忘记密码验证码
    changePassword: '/user/change_pas', // 修改密码
    removeProduct: '/cart/delete_cart_one_product', // 删除购物车中指定的商品
    clearCart: '/cart/delete_cart', // 清空购物车
    getPromoCode: '/user/query_user_promo_code', // 获取用户折扣码
    getUserPoints: '/user/points/get', // 获取用户积分
    getPointsDetail: '/user/points/list', // 获取用户积分明细
    applyExchange: '/user/points/extractApply', // 提交提现申请
    applyList: '/user/points/extractApplyList', // 获取提现申请列表
    getMediaList: '/article/list', // 获取发布中的媒体报道列表
    getMedia: '/article/get', // 获取媒体报道
    getRecommendMedia: '/article/list_recommend', // 获取推荐报道列表
  },
}
