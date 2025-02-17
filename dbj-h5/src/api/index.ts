import request from "./request";
//文档地址https://app.apifox.com/project/3178133

//获取商品套餐
export const apiGetCommodityPackage = (data) => {
    return request("/gw/customer/commodityPackage", "GET", data);
};

//获取可用支付方式
export const apiGetPayChannel = (data) => {
    return request("/gw/customer/payChannel", "GET", data);
};

//获取支付结果
export const apiGetPayResult = (data) => {
    return request("/gw/customer/payResult", "GET", data);
};


// 调起支付
export const apiGetPay = (data) => {
    return request("/gw/customer/pay", "POST", data);
};


// 业务设备详情查询
export const apiGetEquipment = (data) => {
    return request("/gw/customer/biz-equipment/code", "GET", data);
};

// 设备测试启动
export const apiPostStartUp = (data) => {
    return request("/gw/customer/biz-equipment/startup/testStartup", "POST", data);
};