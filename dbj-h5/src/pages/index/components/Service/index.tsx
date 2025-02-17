import { View, Text, Button } from '@tarojs/components'
import { useTranslation } from 'react-i18next'
import { AtModal, AtModalAction } from 'taro-ui'
import './index.less'

function Service(props): JSX.Element {
    const { visible, setVisible, telPhone } = props
    const { i18n } = useTranslation()



    const handleClick = (phoneNumber) => {
        const link = `tel:${phoneNumber}`;
        window.location.href = link;
    }
    const handleClose = () => {
        setVisible(false)
    }
    return (
        <AtModal onClose={handleClose} isOpened={visible} >
            <View className='serviceBox'>
                <View className='flexRow flexCenter service'>
                    <Text className='title'>{i18n.t("service.title")}：</Text>
                    <Text className='phone' onClick={() => handleClick(telPhone)}>
                        {telPhone}
                    </Text >
                </View>
                <AtModalAction> <Button onClick={handleClose}>{i18n.t("service.btn1")}</Button> <Button className='sureBtn' onClick={() => handleClick(telPhone)}>{i18n.t("service.btn2")}</Button> </AtModalAction>
            </View>
        </AtModal >
    );
}
export default Service;
