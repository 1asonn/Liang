
import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { useTranslation } from 'react-i18next'
import config from '../../../../locales/config.json'
import GLOBAL from "../../../../utils/constant"
import { AtModal } from 'taro-ui'
import './index.less'

function SelectLang(props): JSX.Element {
    const { equipmentCode, langType, setLangType, changeLang, visible, setVisible } = props
    const { i18n } = useTranslation()
    const [langList, setLangList] = useState<string[]>([]);
    const list = [
        {
            name: '中文',
            code: 'zh-CH'
        },
        {
            name: 'แบบไทย',
            code: 'th-TH'
        },
        {
            name: 'Indonesia',
            code: 'in-ID'
        },
        {
            name: 'English',
            code: 'en-US'
        }
    ]

    useEffect(() => {
        setLangType(i18n.language)
        getlang()
    }, [])

    const getlang = async () => {
        let langListTemp: string[] = []
        for (let key in config) {
            if (config.hasOwnProperty(key)) {
                langListTemp.push(config[key as keyof typeof config])
            }
        }
        setLangList(langListTemp)
    }
    const handleChange = (type) => {
        i18n.changeLanguage(type)
        setLangType(type)
        GLOBAL.xAcceptLanguage = type
        changeLang(equipmentCode)
    }
    const handleSure = () => {
        setVisible(false)
    }
    return (
        <AtModal onClose={handleSure} isOpened={visible} >
            <View className='flexColumn flexAlignCenter selectLangBox'>
                <View className='close' onClick={handleSure}></View>

                <View className="selectLang">
                    {
                        list && list.length ? list.map((item, index) => {
                            return <View className="flexCenter payItem" key={index} onClick={() => handleChange(item.code)}>
                                <Text className="payItemText">
                                    {item.name}
                                    {/* {i18n.t(item ? `index.${item}` : 'index.zh')} */}
                                </Text>
                                {
                                    langType == item.code ? <View className="payListSelected" ></View> : <Text className="payListSelect"></Text>
                                }
                            </View>
                        }) : ''
                    }

                </View>
                {/* <View onClick={handleSure} className="sureBtn">{i18n.t("paySuccess.close")}</View> */}
            </View>
        </AtModal >
    );
}
export default SelectLang;
