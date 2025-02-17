
import { useEffect, useState } from 'react'
import { View, Text, } from '@tarojs/components'
import { useTranslation } from 'react-i18next'
import { AtModal } from 'taro-ui'
import './index.less'
import { apiGetPayResult } from '../../../../api/index'
import Taro, { useRouter } from '@tarojs/taro';

function SelectPay(props): JSX.Element {
    const { visible, setVisible, payResult, currencySymbol } = props
    const { i18n } = useTranslation()
    const [resultObj, setResultObj] = useState<any>({})
    const router = useRouter();


    const handleSure = () => {
        setVisible(false)
        const { equipment,type } = router.params;
        const url = window.location.href.split('?')[0]
        // 修改路径不刷新页面
        window.history.replaceState(null, "首页", `${url}?equipment=${equipment}&type=${type}`);
    }
    useEffect(() => {
        // getPayList()
        if (payResult && payResult.orderNo) {
            getPayStatus()
        }
    }, [])
    const getPayStatus = async () => {
        try {
            const req = {
                orderNo: payResult.orderNo
            }
            const res = await apiGetPayResult(req);
            //支付订单状态：PENDING-未支付 PAID-已支付 已失败-已失败 CLOSED-已关单
            if (res) {
                setResultObj(res)
            }
        } catch (error) {
            Taro.showToast({
                title: error,
                icon: 'none',
                duration: 2000,
            });
            console.log("🚀 ~ file: index.tsx:37 ~ getPayStatus ~ error:", error)
        }
    };

    return (
        <AtModal isOpened={visible} onClose={ handleSure }>
            <View className="flexColumn paySuccessBox">
            <View className='close' onClick={handleSure}></View>

                <View className="paySuccessIcon"></View>
                <Text className="paySuccess">
                    {/* 支付订单状态：PENDING-未支付 PAID-已支付 FAILED-已失败 CLOSED-已关单 */}
                    {
                        resultObj.status == 'PAID' ? i18n.t("paySuccess.paySuccess") : null
                    }
                    {
                        resultObj.status == 'FAILED' ? i18n.t("paySuccess.payFail") : null
                    }
                    {
                        resultObj.status == 'PENDING' ? i18n.t("paySuccess.payPending") : null
                    }
                </Text>
                <Text className="payPrice">
                    {/* ￥5.00 */}
                    {currencySymbol} {resultObj.paymentAmount}
                </Text>
                <View className='flexCenter flexColumn selectPayTipBox'>
                    <Text className="selectPayTip">
                        {i18n.t("paySuccess.paySuccessTip1")}
                    </Text>
                    <Text className="selectPayTip">
                        {i18n.t("paySuccess.paySuccessTip2")}
                    </Text>
                </View>
                <View onClick={handleSure} className="sureBtn">{i18n.t("paySuccess.close")}</View>
            </View>
        </AtModal >
    );
}

export default SelectPay;
