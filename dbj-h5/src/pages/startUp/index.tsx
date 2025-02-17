
import { View } from '@tarojs/components'
import './index.less'
import { useEffect, useState } from 'react'
import { apiGetEquipment, apiPostStartUp } from '../../api/index'
import Taro, { useRouter } from '@tarojs/taro';
import { AtButton, AtInput, AtList, AtListItem } from 'taro-ui'
// import SelectStore from './components/SelectStore/index';

function StartUp(): JSX.Element {
    const router = useRouter();
    const [number, setNumber] = useState<any>();
    const [detail, setDetail] = useState<any>({});
    const [equipment, setEquipment] = useState<any>();
    const [startupParamList, setStartupParamList] = useState<any>([]);
    // const [selectVisible, setSelectVisible] = useState(false);
    // const [selectStore, setSelectStore] = useState<any>({});
    const [optionValue, setOptionValue] = useState<any>('');

    useEffect(() => {
        const { equipmentCode } = router.params;
        setEquipment(equipmentCode)
        getEquipment(equipmentCode)
        return () => { };
    }, [])


    // 根据设备编号获取设备信息
    const getEquipment = async (code) => {
        Taro.showToast({
            title: '',
            icon: 'loading'
        });
        try {
            const req = {
                equipmentCode: code,
                startupParamInfo: true
            }
            const res = await apiGetEquipment(req);
            Taro.hideToast()
            if (res) {
                setDetail(res)
                setStartupParamList(res.startupParamList)
            }
        } catch (error) {
        }
    };

    const handleStartUp = (time = number) => {
        _apiStartUp(time)
    }
    // 远程启动
    const _apiStartUp = async (time) => {
        Taro.showToast({
            title: '',
            icon: 'loading'
        });
        try {
            let arr: Array<any> = []
            let optionTag = false
            let optionName = ''
            let hasEmptyValue = false
            startupParamList.map((item) => {
                if (item.paramType == "option") {
                    optionTag = true
                    optionName = item.desc
                    arr.push({
                        code: item.code,
                        paramValue: optionValue
                    })
                } else {
                    const paramValue = !item.visible || item.disabled ? item.defaultValue : time;
                    arr.push({
                        code: item.code,
                        paramValue: paramValue
                    })
                    if (!paramValue && paramValue != 0) {
                        hasEmptyValue = true;
                    }
                }
            })
            const req = {
                code: equipment,
                startupParamList: arr,
                storeIdList: [optionValue]
            }
            if (hasEmptyValue) {
                return Taro.showToast({
                    title: '请输入启动参数值',
                    icon: 'error'
                })

            }
            if (optionTag && !optionValue) {
                Taro.showToast({
                    title: '请选择' + optionName,
                    icon: 'error'
                });
                return
            }
            const res = await apiPostStartUp(req);
            if (res) {
                Taro.showToast({
                    title: "启动成功",
                    icon: 'none',
                    duration: 2000,
                });
            }
        } catch (error) {
        }
    };

    const handleChange = (value) => {
        setNumber(value)
    }

    // const confirmModalSelectPay = (store) => {
    //     setSelectStore(store)
    // }
    // 选择仓道/套餐
    const handleChangeOption = (value) => {
        setOptionValue(value)
    }
    return (
        <View className="startUpBox">
            <View className="flexRow device">
                <View className='label'>设备：</View><View className='value'>{detail.equipmentTypeName}_{detail.code}</View>
            </View>
            <View className='packages'>
                <AtList >
                    <AtListItem title='启动套餐' />
                    {
                        startupParamList.map((item, index) => {
                            return item.paramType == "option" ? <View key={item.code} className='flexRow btnList'>
                                <AtListItem hasBorder={false} title={item.desc} note='' />
                                {
                                    item.paramType == "option" && <View className='flexRow btnList'>
                                        {
                                            item.optionList?.map((option, optionIndex) => {
                                                return <AtButton key={option.value} className='btn' type={option.value == optionValue ? 'primary' : 'secondary'} size='normal' onClick={() => handleChangeOption(option.value)}>
                                                    {option.desc}
                                                </AtButton>
                                            })
                                        }
                                    </View>
                                }
                            </View> : <>
                                {
                                    item.visible && <AtInput
                                        key={item.code}
                                        border={false}
                                        name='value'
                                        className='storehouse'
                                        title={item.desc}
                                        type='text'
                                        placeholder='请输入'
                                        value={number ? number : (item.defaultValue || undefined)}
                                        disabled={item.disabled}
                                        onChange={handleChange}
                                    />
                                }
                            </>
                        })
                    }
                </AtList>
                <AtButton className='btn' type='primary' size='normal' onClick={() => handleStartUp()}>启动测试</AtButton>

            </View>
            {/* <AtModal isOpened={isOpened}>
                <View className='flexCenter inputBox'>
                    <AtInput
                        className='flexCenter packagesInput'
                        name='value2'
                        type='number'
                        title={startupParamList[0]?.desc}
                        placeholder='请输入数字'
                        value={number}
                        onChange={handleChange}
                        border={false}
                    />
                </View>
                <AtModalAction> <Button onClick={handleCancel}>取消</Button> <Button onClick={handleSure}>确定</Button> </AtModalAction>
            </AtModal> */}
            {/* {
                selectVisible && <SelectStore
                    visible={selectVisible}
                    setVisible={setSelectVisible}
                    onConfirm={confirmModalSelectPay}></SelectStore>
            } */}
        </View>
    );
}

export default StartUp;
