import { Spin } from "antd";

export default function LoadingPage() {
    return(
        <Spin size = "large" tip = "Загрузка..." style={{marginTop: '20%'}}><div style={{fontSize: 30}}/></Spin>
    )
}