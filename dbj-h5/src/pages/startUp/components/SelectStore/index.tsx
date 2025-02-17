import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton, AtModal } from 'taro-ui'
import { useTranslation } from 'react-i18next'
import './index.less'
import '../../../../app.less'
import "taro-ui/dist/style/components/modal.scss";
import Taro from '@tarojs/taro';
import { apiGetPay } from '../../../../api/index'


function Index(props): JSX.Element {
    const { i18n } = useTranslation()
    const { visible, equipmentCode, setVisible, onConfirm } = props
    const [list, setList] = useState<any>([])
    const [store, setStore] = useState<any>({})
    useEffect(() => {
        setList([
            { name: '1号仓' },
            { name: '2号仓' },
            { name: '3号仓' }
        ])
    }, [])
    const handleClick = (type) => {
        setStore(type)
    }

    const handleSure = () => {
        if (store && store.name) {
            onConfirm(store)
            setVisible(false)
        } else {
            Taro.showToast({
                title: i18n.t("selectPay.title"),
                icon: 'none',
                duration: 2000,
            });
        }
    }
    const handleClose = () => {
        setVisible(false)
    }
    return (
        <AtModal onClose={handleClose} isOpened={visible}>
            <View className='flexColumn flexAlignCenter selectStoreBox'>
                <View className='close' onClick={handleClose}></View>
                <View className='flexColumn  selectPay'>
                    <Text className="selectPayTitle">
                        {i18n.t("selectStore.title")}
                    </Text>
                    <View className="payContent">
                        <View className="payList">
                            {
                                list.map((item, index) => {
                                    return <View className="payItem" key={index} onClick={() => handleClick(item)} >
                                        <Text className="payItemText">
                                            {item.name}
                                        </Text>
                                        {
                                            store.name == item.name ? <View className="payListSelected"></View> : <View className="payListSelect"></View>
                                        }
                                    </View>
                                })
                            }
                        </View>
                    </View>
                </View>
                <AtButton onClick={handleSure} circle full size="small" style={{width:"100%"}} type='primary'> {i18n.t("selectStore.btn")}</AtButton>
            </View>
        </AtModal >
    )
}

export default Index;
