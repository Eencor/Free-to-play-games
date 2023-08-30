import { Alert } from "antd";
import Layout from "antd/es/layout/layout"
import { Header} from "antd/es/layout/layout"
import { Link } from "react-router-dom";

export default function ErrorPage() {

    return(
        <Layout style={{height: 'max(100%, 100vh)'}}>
        <Header className="header">
          <Link to={'/'}>
            <span className="header-span">Free to play games</span>
          </Link>
        </Header>
        <Alert style={{width: '80%' , marginBottom: 30, alignSelf: 'center'}} 
            type="error" 
            showIcon = {true} 
            message = 'Ошибка'
            description = 'Произошла ошибка, попробуйте повторить позже'
        />
      </Layout>
    )
}