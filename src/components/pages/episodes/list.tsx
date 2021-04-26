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

  const url = 'https://rickandmortyapi.com/api/episode'
  const base = 'http://localhost:5000/'
  const data: any = [];

  useEffect(() => {
        (async () => {
            const data1 = await axios.get(base+'episodes')
            setAllData(data1.data)
        })()
    }, [])


  allData.map((episode: any) => {
    data.push(episode)
    return data;
  });

  const fetchElementData = () => {
      (async () => {
          const data1 = await axios.get(base+'episodes')
          setAllData(data1.data)
      })()
  }

  const handleClick = () => {
    history.push('/create/episodes')
  }

  const editElement = (record : any) =>{
     history.push('/edit/'+record.id+'/episodes')
  }


  const clickToRsyncElements = () => {
    fetchSynData(url)
  }

  const postElementData = (element : any) => {
    axios.post(base+'episodes', element).then(res => {
      setLoading(false);
      message.success('Episodios sincronizados correctamente!');
    })
  }

  const fetchSynData = (url : any) => {
    setLoading(true);

    axios.get(url).then(res => {
      for(let e = 0; e < res.data.results.length; e++){
          let item = res.data.results[e];
          let element = {}

          element = {
            air_date: item.air_date,
            episode: item.episode,
            name: item.name
          }
        
          postElementData(element)

          if((e + 1) == (res.data.results.length)){
            if(res.data.info.next != null){
              fetchSynData(res.data.info.next)
            }
          }
      }
    });
  }

  function deleteElement(record : any){

    axios.delete(base+'episodes/'+record.id).then(res => {
      fetchElementData()
    }).catch(err => {
      console.log(err);
    });
    return record 
  }

  return (
    <div>
        <Row gutter={[40, 0]}>
          <Col span={18}>
            <Title level={2}>Episodios</Title>
          </Col>
          
          <Col span={6}> 
            <Button onClick={handleClick} block><PlusOutlined /> Episodio</Button>
          </Col>
        </Row>
        <Row gutter={[40, 0]}>
          <Col span={24}>
            <Table dataSource={data}>
              <Column title="Episodio" dataIndex="episode"/>
              <Column title="Nombre" dataIndex="name"/>
              <Column title="Fecha de Transmisión" dataIndex="air_date"/>

              <Column
                title="Action"
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