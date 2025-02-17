import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { AtModal } from 'taro-ui'
import { useTranslation } from 'react-i18next'
import './index.less'
import '../../../../app.less'
import "taro-ui/dist/style/components/modal.scss";
import Taro from '@tarojs/taro';
import { apiGetPay } from '../../../../api/index'


function Index(props): JSX.Element {
    const { i18n } = useTranslation()
    const { visible, payTypeList, equipmentCode, setVisible, onConfirm, currencySymbol, packageItem, setPayType, payType } = props
    const [orderNo, setOrderNo] = useState('')
    useEffect(() => {
        console.log("🚀 ~ file: index.tsx:12 ~ Index ~ payTypeList:", payTypeList)

    }, [])
    const handleClick = (type) => {
        setPayType(type)
    }

    const handleSure = () => {
        if (payType && payType.name) {
            getPay()
            onConfirm(payType)
        } else {
            Taro.showToast({
                title: i18n.t("selectPay.noSelectTip"),
                icon: 'none',
                duration: 2000,
            });
        }
    }

    const getPay = async () => {
        Taro.showToast({
            title: '',
            icon: 'loading',
            duration: 3000,
        });
        try {
            let packageItemTemp: any = [{
                number: 1,
                id: packageItem.id
                // id: '1143195688065613826'
            }]
            const url = window.location.href

            const req = {
                equipmentCode: equipmentCode,
                payChannelCode: payType.code,
                frontCallbackUrl: url,
                commodityList: packageItemTemp
            }
            const res = await apiGetPay(req);
            if (res) {
                setOrderNo(res.orderNo)
                window.top.location.href = res.secureUrl
            }
        } catch (error) {
            Taro.showToast({
                title: error,
                icon: 'none',
                duration: 2000,
            });
        }
    };
    const handleClose = () => {
        setVisible(false)
    }
    return (
        <AtModal onClose={handleClose} isOpened={visible}>
            <View className='flexColumn flexAlignCenter selectPayBox'>
                <View className='close' onClick={handleClose}></View>
                <View className='flexColumn  selectPay'>
                    <Text className="selectPayTitle">
                        {i18n.t("selectPay.payNum")}
                    </Text>
                    <Text className="payPrice">
                        {currencySymbol} {packageItem.price}
                    </Text>
                    <View className="payContent">
                        <Text className="payListTitle">
                            {i18n.t("selectPay.selectPayType")}
                        </Text>
                        <View className="payList">
                            {
                                payTypeList.map((item, index) => {
                                    return <View className="payItem" key={index} onClick={() => handleClick(item)} >
                                        {/* <View className="payItemIcon" style={{ background: `url(${icons[item.name]}) no-repeat`, backgroundSize: "100% auto", backgroundPosition: "center" }} ></View> */}
                                        <View className="payItemIcon" style={{ background: `url(${item.icon}) no-repeat`, backgroundSize: "100% auto", backgroundPosition: "center" }} ></View>
                                        <Text className="payItemText">
                                            {item.name}
                                        </Text>
                                        {
                                            payType.name == item.name ? <View className="payListSelected"></View> : <View className="payListSelect"></View>
                                        }
                                    </View>
                                })
                            }
                        </View>
                    </View>
                </View>
                <View className='sureBtn' onClick={handleSure}>{i18n.t("selectPay.surePay")}</View>
            </View>
        </AtModal >
    )
}

export default Index;
