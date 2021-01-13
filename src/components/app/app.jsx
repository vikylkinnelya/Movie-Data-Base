import {
  Layout,
  Input,
  Row,
  Col,
  Card,
  Tag,
  Spin,
  Alert,
  Modal,
  Typography,
} from 'antd';
import 'antd/dist/antd.css'



const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;
const { Meta } = Card;
const TextTitle = Typography.Title;


const SearchBox = () => {

  return (
    <Row marginTop='150px'>
      <Col span={12} offset={5} >
        <Search style={{ marginTop: 12 }}
          placeholder="enter movie, series, episode name"
          size="large"
          
          onSearch={value => console.log(value)}
        />
      </Col>
    </Row>

  )
}

function App() {

  /*  const [data, setData] = useState(null); //будет хранить обьект ответа
   const [error, setError] = useState(null); //будет обновляться только при ошибке
   const [loading, setLoading] = useState(false); //показывает спиннер
   const [q, setQuery] = useState('batman'); //хранит искомые параметры запроса 
 
   const [activateModal, setActivateModal] = useState(false); //помогает закрыть модал компонент
   const [detail, setShowDetail] = useState(false); //собирает данные
   const [detailRequest, setDetailRequest] = useState(false); //отображение загрузчика
 
  */

  return (
    <div className='App'>
      <Layout className='Layout'>
        <Sider className='sider' style={{ background: '#f0f'}}> slider </Sider>
        <Layout className='layout'>
          <Header style={{ background: '#f0fu1'}}>
            <SearchBox/>


            

            



        </Header>
          <Content>
            content
        </Content>
          <Footer>
            footer
        </Footer>
        </Layout>

      </Layout>
    </div>
  )

}

export default App;