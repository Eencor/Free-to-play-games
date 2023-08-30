import { Button } from "antd";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons"


export default function BackButton() {
    return(
        <Link to={'/'} style={{position: "relative", left: '10%', top: "50px"}} ><Button shape="circle" size="large" style={{position: 'sticky', top: 50}}><LeftOutlined /></Button></Link> 
    )
}