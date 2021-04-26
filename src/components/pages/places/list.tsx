import React, {useEffect, useState} from 'react';
import {Table, Row, Col, Button, Typography, Tag,  Space, message} from 'antd';
import {useHistory} from 'react-router';
import axios from 'axios';

import {UserOutlined,PlusOutlined,SyncOutlined} from '@ant-design/icons';

const {Title} = Typography;
const { Column } = Table;

const List = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]);

  const url = 'https://rickandmortyapi.com/api/location'
  const base = 'http://localhost:5000/'
  const data: any = [];

  useEffect(() => {
      (async () => {
          const data1 = await axios.get(base+'places')
          setAllData(data1.data)
      })()
  }, [])


  const fetchElementData = () => {
      (async () => {
          const data1 = await axios.get(base+'places')
          setAllData(data1.data)
      })()
  }


  allData.map((location: any) => {
    data.push(location)
    return data;
  });

  const handleClick = () => {
    history.push('/create/places')
  }

  const editElement = (record : any) =>{
     history.push('/edit/'+record.id+'/places')
  }

  const clickToRsyncElements = () => {
    fetchSynData(url)
  }

  const postElementData = (element : any) => {
    axios.post(base+'places', element).then(res => {
      setLoading(false);
      message.success('Ubicacion sincronizados correctamente!');
    })
  }

  const fetchSynData = (url : any) => {
    setLoading(true);

    axios.get(url).then(res => {
      for(let e = 0; e < res.data.results.length; e++){
          let item = res.data.results[e];
          let element = {}

          element = {
            name: item.name,
            type: item.type,
            dimension: item.dimension
          }
        
          postElementData(element)

          if((e + 1) == (res.data.results.length)){
            if(res.data.info.next != null){
              fetchSynData(res.data.info.next)
            }
          }
      }
    });

    fetchElementData()
  }

  function deleteElement(record : any){

    axios.delete(base+'places/'+record.id).then(res => {
      fetchElementData()
    }).catch(err => {
      console.log(err);
    });
    return record 
  }


  /*
  <Col span={6}> 
    <Button  onClick={clickToRsyncElements} loading={loading} block><SyncOutlined /> Sync Elements</Button>
  </Col>
  */
  
  return (
    <div>
        <Row gutter={[40, 0]}>
          <Col span={18}>
            <Title level={2}>Ubicaciones</Title>
          </Col>
          <Col span={6}> 
            <Button key="6" onClick={handleClick} block><PlusOutlined /> Place</Button>
          </Col>
        </Row>
        <Row gutter={[40, 0]}>
          <Col span={24}>
            <Table dataSource={data}>
              <Column title="Nombre" dataIndex="name" key="name" />
              <Column title="Tipo de Ubicacion" dataIndex="type" key="type" />
              <Column title="Dimension" dataIndex="dimension" key="dimension" />

              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <Space size="middle">
                    <a onClick={ () => editElement(record) }>Edit</a>
                    <a onClick={ () => deleteElement(record) }>Delete</a>
                  </Space>
                )}
              />
            </Table>
          </Col>
        </Row>
    </div>
  );
}

export default List;