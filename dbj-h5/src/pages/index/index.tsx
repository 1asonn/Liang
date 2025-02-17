import { useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { useTranslation } from 'react-i18next'
import '../../app.less'
import { useState } from 'react'
import { apiGetCommodityPackage, apiGetPayChannel, apiGetPay, apiGetEquipment } from '../../api/index'
import SelectPay from './components/SelectPay/index';
import PayResult from './components/PayResult/index';
import SelectLang from './components/Lang/index';
import Service from './components/Service/index';
import './index.less'
import Taro, { useRouter } from '@tarojs/taro';
import GLOBAL from "../../utils/constant"


function Index(): JSX.Element {
  const { i18n } = useTranslation()
  const router = useRouter();
  const [dataList, setDataList] = useState<any>([]); // 套餐列表
  const [selectPayVisible, setSelectPayVisible] = useState(false);
  const [paySuccessVisible, setPaySuccessVisible] = useState(false);
  const [langSelectVisible, setLangSelectVisible] = useState(false);
  const [serviceVisible, setServiceVisible] = useState(false);
  const [payType, setPayType] = useState<any>({}) // 选中的支付类型
  const [langType, setLangType] = useState("zh") // 当前的语言类型
  const [currencySymbol, setCurrencySymbol] = useState("$") //单位
  const [packageItem, setPackageItem] = useState<any>({}) // 选中的套餐
  const [payObj, setPayObj] = useState({}) // 支付结果
  const [equipmentCode, setEquipmentCode] = useState('') // 设备号
  const [payTypeList, setPayList] = useState([])
  const [orderNo, setOrderNo] = useState('')
  const [telPhone,setTelPhone] = useState('')

  // 套餐图标
  const images = [
    require('./img/money1.png'),
    require('./img/money2.png'),
    require('./img/money3.png'),
    require('./img/money4.png'),
    require('./img/money5.png'),
    require('./img/money6.png'),
  ];

  // 选择支付方式弹窗切换
  const toggleSelectPayModal = (item) => {
    setPackageItem(item)
    if (payTypeList.length == 1) {
      getPay(item)
    } else {
      setSelectPayVisible(!selectPayVisible);
    }
  }
  const changeLang = (code) => {
    getCommodityPackage(code)
    getPayList(code)
  }
  // 根据设备编号获取设备信息
  const getEquipment = async (code) => {
    try {
      const req = {
        equipmentCode: code ? code : equipmentCode,
      }
      const res = await apiGetEquipment(req);
      if (res) {
        if (!res.online) {
          Taro.navigateTo({
            url: `/offline?equipment=${code ? code : equipmentCode}`  // 跳转到设备离线的页面
          });
        }
        if (!res.binding) {
          Taro.navigateTo({
            url: `/startUp?equipmentCode=${code ? code : equipmentCode}`  // 跳转到设备离线的页面
          });
        }
        // 设置默认语言
        i18n.changeLanguage(res.language)
        setLangType(res.language)
        setTelPhone(res.telephone)
        GLOBAL.xAcceptLanguage = res.language
        GLOBAL.xTimezone = res.timezone
        console.log("🚀 ~ file: index.tsx:48 ~ getEquipment ~ res:", res)
      } else {
        setLangType(i18n.language)
      }
      getCommodityPackage(code)
      getPayList(code)
    } catch (error) {

      console.log("🚀 ~ file: index.tsx:150 ~ getEquipment ~ error:", error)
    }
  };
  // 请求支付
  const getPay = async (packageItem) => {
    Taro.showToast({
      title: '',
      icon: 'loading',
      duration: 3000,
    });
    try {
      let packageItemTemp: any = [{
        number: 1,
        id: packageItem.id
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
        window.location.href = res.secureUrl
      }
    } catch (error) {
      Taro.showToast({
        title: error,
        icon: 'none',
        duration: 2000,
      });
    }
  };

  // 确认选择支付方式
  const confirmModalSelectPay = async item => {
    setPayType(item)
    setSelectPayVisible(false);
  };

  // 服务端获取套餐列表接口调用
  const getCommodityPackage = async (code) => {
    try {
      const req = {
        equipmentCode: code ? code : equipmentCode,
        packageType: "2"
      }
      const res = await apiGetCommodityPackage(req);
      if (res) {
        setCurrencySymbol(res.currencySymbol)
        setDataList(res.consumptionPackage || [])
      }
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:76 ~ getCommodityPackage ~ error:", error)
    }
  };
  // 获取支付方式列表
  const getPayList = async (code) => {
    try {
      const req = {
        equipmentCode: code ? code : equipmentCode,
      }
      const res = await apiGetPayChannel(req);
      if (res) {
        setPayList(res || [])
        setPayType(res[0])
      }
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:52 ~ getPayList ~ error:", error)
    }
  };

  useEffect(() => {

    const { tradeToken, outTradeNo, status, equipment, orderNo } = router.params;
    setEquipmentCode(equipment ? equipment : equipmentCode)

    getEquipment(equipment)
    if (outTradeNo) {
      setPayObj({
        status: status ? status : '',
        tradeToken: tradeToken,
        outTradeNo: outTradeNo,
        orderNo
      })
      setPaySuccessVisible(true)
    }


    return () => { };
  }, [])
  return (
    <View className='indexBox'>
      <View className='topBgBox'>
        <View className='topBg'>
        </View>
      </View>
      <View className='flexColumn equipment'>
        <View className='flexRow equipmentCode'>
          <Text className='left'>{i18n.t("index.selectEquipment")}：</Text>
          <Text className='right'>{equipmentCode}</Text>
        </View>
        <Text className='equipmentTip'>{i18n.t("index.selectEquipmentTips")}</Text>
      </View>
      <View className="content">
        <View className='flexColumn titleBox' >
          <Text className="titlebold">{i18n.t("index.contentTitle")}</Text>
          <Text className="titleTip">{i18n.t("index.contentTitleTip")}</Text>
          <View className="flexRow indexLang">
            <View className="flexAlignCenter langBox">
              <Text>{i18n.t(`index.${langType}`)}</Text>
              <Text className="indexLangLine"></Text>
              <Text onClick={() => setLangSelectVisible(true)}>{i18n.t(`index.change`)}</Text>
            </View>
          </View>
        </View>
        <View className="flexRow contentList">
          {
            dataList.map((item, index) => {
              return <View className="flexColumn flexAlignCenter goldItem" key={index} onClick={() => toggleSelectPayModal(item)}>
                <View className="money" style={{ backgroundImage: `url(${images[index > 6 ? 6 : index]})` }}></View>
                <View className="flexRow ">
                  <Text className="goldNumber">
                    {item.priceValue}{i18n.t("index.unit")}
                  </Text>
                </View>
                <View className="flexCenter btnBg">
                  <Text className="price">{currencySymbol}{item.price}</Text>
                </View>
              </View>
            })
          }
        </View>
        <View className="flexColumn indexRule">
          <Text className="ruleTitle">{i18n.t("index.ruleTitle")}</Text>
          <Text className="ruleContent">{i18n.t("index.ruleContent1")}</Text>
          <Text className="ruleContent">{i18n.t("index.ruleContent2")}</Text>
        </View>
      </View>
      <View onClick={() => setServiceVisible(true)} className='indexService'></View>
      {
        selectPayVisible && <SelectPay
          payTypeList={payTypeList}
          setPayList={setPayList}
          packageItem={packageItem}
          equipmentCode={equipmentCode}
          currencySymbol={currencySymbol}
          payType={payType}
          setPayType={setPayType}
          visible={selectPayVisible}
          setVisible={setSelectPayVisible}
          onConfirm={confirmModalSelectPay}></SelectPay>
      }
      {
        paySuccessVisible && <PayResult
          visible={paySuccessVisible}
          payResult={payObj}
          equipmentCode={equipmentCode}
          currencySymbol={currencySymbol}
          setPayResult={setPayObj}
          setVisible={setPaySuccessVisible}></PayResult>
      }
      {
        serviceVisible && <Service
        telPhone={telPhone}
          visible={serviceVisible}
          setVisible={setServiceVisible}
        ></Service>
      }
      <SelectLang
        langType={langType}
        setLangType={setLangType}
        visible={langSelectVisible}
        changeLang={changeLang}
        equipmentCode={equipmentCode}
        setVisible={setLangSelectVisible}></SelectLang>
    </View>
  )
}

export default Index;
