import { StyleSheet } from 'react-native';
import { elpx } from './utils'

const globalStyles = StyleSheet.create({
    greyTips: {
        fontSize: elpx(28),
        fontFamily: "PingFangSC - Regular, PingFang SC",
        fontWeight: "400",
        color: "#999999",
    },
    blackBold: {
        fontSize: elpx(36),
        fontWeight: "bold",
        color: "#000000",
        fontFamily: "PingFangSC-Semibold, PingFang SC"
    },
    flexRow: {
        display: "flex",
        flexDirection: "row"
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column"
    },
    flexCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    flexBetween: {
        display: "flex",
        justifyContent: "space-between",
    },
    flexAlignCenter: {
        display: "flex",
        alignItems: "center"
    },
    flexJustifyCenter: {
        display: "flex",
        justifyContent: "center",
    },
});

export default globalStyles;