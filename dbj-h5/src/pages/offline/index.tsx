
import { View, Text, } from '@tarojs/components'
import { useTranslation } from 'react-i18next'
import './index.less'
import { useEffect, useState } from 'react'
import { apiGetEquipment } from '../../api/index'
import Taro, { useRouter } from '@tarojs/taro';

function Offline(): JSX.Element {
    const { i18n } = useTranslation()
    const router = useRouter();
    const [ifBind, setIfBind] = useState(true) //是否绑定
    const [ifOnline, setIfOnline] = useState(true) // 是否在线

    // 根据设备编号获取设备信息
    const getEquipment = async (code) => {
        try {
            const req = {
                equipmentCode: code,
            }
            const res = await apiGetEquipment(req);
            if (res) {
                if (res.online && res.binding) {
                    Taro.navigateTo({
                        url: `/index?equipment=${code}`  // 跳转到设备离线的页面
                    });
                }
                // 设置默认语言
                i18n.changeLanguage(res.language)
                setIfBind(res.binding)
                setIfOnline(res.online)
            }
        } catch (error) {
            console.log("🚀 ~ file: index.tsx:150 ~ getEquipment ~ error:", error)
        }
    };

    useEffect(() => {
        const { equipment } = router.params;
        getEquipment(equipment)
        return () => { };
    }, [])

    return (
        <View className="flexColumn offlineBox">
            <View className="icon"></View>
            {
                !ifOnline && ifBind ? <>
                    <View className='title'>{i18n.t("online.title")}</View>
                    <View className='flexCenter flexColumn offlineTips'>
                        <Text className="selectPayTip">
                            {i18n.t("online.tips1")}
                        </Text>
                        <Text className="selectPayTip">
                            {i18n.t("online.tips2")}
                        </Text>
                    </View></> : null
            }
            {
                !ifBind ? <>
                    <View className='title'>{i18n.t("online.noDevice")}</View></> : null
            }
        </View>
    );
}

export default Offline;
