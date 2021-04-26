import React, {useEffect, useState} from 'react';
import {Row, Col, Typography, Input, Form, Button, 
Radio, Switch, Slider, Select, message, DatePicker} from 'antd';
import axios from 'axios';
import {useHistory} from 'react-router';
import moment from 'moment'

const {Title} = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const EditFormEpisode = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  let base = 'http://localhost:5000/'
  let id = window.location.pathname.split('/')[2]

  const [fields, setFields] = useState([
    {
      name: ['name'],
      value: ''
    },
    {
      name: ['air_date'],
      value: '',
    },
    {
      name: ['episode'],
      value: '',
    }
  ]);

  useEffect(() => {
      (async () => {
          const ep = await axios.get(base+'episodes/'+id)

          setFields([
            {
              name: ['name'],
              value: ep.data.name
            },
            {
              name: ['air_date'],
              value: moment(ep.data.air_date)
            },
            {
              name: ['episode'],
              value: ep.data.episode
            }
          ])
      })()
  }, [])


  const handleSubmit = (values: any) => {
    setLoading(true);
    axios.put(base+'episodes/'+id, 
      values
    )
    .then(res => {
      setLoading(false);
      message.success('Episodio modificado correctamente!');
      history.push('/episodes');
    })
    .catch(error => {
      setLoading(false);
      message.error(error);
    })
  }

  const EpisodeForm = ({ onChange, fields }: any) => (
    <Form
      name="episode"
      {...layout} 
      onFinish={handleSubmit}
      fields={fields}
    >
      <Form.Item name="episode" label="Episode"
        rules={[
          {
            required: true,
            message: 'Porfavor coloca el número de episodio, con temporada',
          }
        ]}
        >
        <Input placeholder="Porfavor coloca el numero de episodio, con la temporada" />
      </Form.Item>
      <Form.Item name="name" label="Nombre del Episodio" 
      rules={[
        {
          required: true,
          message: 'Porfavor coloca el nombre del episodio'
        }
      ]}
      >
        <Input placeholder="Porfavor coloca el nombre del episodio" />
      </Form.Item>

      <Form.Item name="air_date" label="Fecha de Transmisión">
        <DatePicker onChange={onChange} />
      </Form.Item>
      

      <div style={{textAlign: "right"}}>
        <Button type="primary" loading={loading} htmlType="submit">
          Save
        </Button>{' '}
        <Button type="default" htmlType="button" onClick={() => history.push('/episodes/list')}>
          Back
        </Button>
      </div>
    </Form>
  );

  return (
    <div>
        <Row gutter={[40, 0]}>
          <Col span={23}>
            <Title style={{textAlign: 'center'}} level={2}>
              Edición de Episodio
            </Title>
          </Col>
        </Row>
        <Row gutter={[40, 0]}>
          <Col span={18}>
            <EpisodeForm
              fields={fields}
            />
          </Col>
        </Row>
    </div>
  );
}

export default EditFormEpisode;