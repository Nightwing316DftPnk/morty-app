import React, {useState} from 'react';
import {Row, Col, Typography, Input, Form, Button, 
Radio, Switch, Slider, Select, message, DatePicker} from 'antd';
import axios from 'axios';
import {useHistory} from 'react-router';

const {Title} = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const FormEpisode = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  let date_send : any = '';
  let base = 'http://localhost:5000/'

  const handleSubmit = (values: any) => {
    setLoading(true);
    axios.post(base+'episodes', 
      values
    )
    .then(res => {
      setLoading(false);
      message.success('Episodio dado de alta correctamente!');
      history.push('/episodes');
    })
    .catch(error => {
      setLoading(false);
      message.error(error);
    })
  }

  function onChange(date : any, dateString : any) {
    date_send = dateString;
  }


  return (
    <div>
        <Row gutter={[40, 0]}>
          <Col span={23}>
            <Title style={{textAlign: 'center'}} level={2}>
              Alta de Episodio
            </Title>
          </Col>
        </Row>
        <Row gutter={[40, 0]}>
        <Col span={18}>
          <Form {...layout} onFinish={handleSubmit}>
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
          </Col>
        </Row>
    </div>
  );
}

export default FormEpisode;