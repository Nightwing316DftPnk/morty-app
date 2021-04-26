import React, {useState} from 'react';
import {Row, Col, Typography, Input, Form, Button, 
Radio, Switch, Slider, Select, message} from 'antd';
import axios from 'axios';
import {useHistory} from 'react-router';

const {Title} = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const FormCharacter = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  let base = 'http://localhost:5000/'

  const handleSubmit = (values: any) => {
    setLoading(true);

    axios.post(base+'characters', 
      values
    )
    .then(res => {
      setLoading(false);
      message.success('Personaje dado de alta correctamente!');
      history.push('/characters');
    })
    .catch(error => {
      setLoading(false);
      message.error(error);
    })
  }

  return (
    <div>
        <Row gutter={[40, 0]}>
          <Col span={23}>
            <Title style={{textAlign: 'center'}} level={2}>
                Alta de Personaje   
            </Title>
          </Col>
        </Row>
        <Row gutter={[40, 0]}>
        <Col span={18}>
          <Form {...layout} onFinish={handleSubmit}>
            <Form.Item name="name" label="Nombre"
            rules={[
              {
                required: true,
                message: 'El nombre es obligatorio',
              }
            ]}
            >
              <Input placeholder="Porfavor escribe el nombre" />
            </Form.Item>

            <Form.Item name="gender" label="Gender" 
              rules={[
                {
                  required: true,
                  message: 'Porfavor selecciona tu genero',
                }
              ]}
            >
              <Radio.Group>
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
                <Radio value="Others">Others</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="status" label="Estatus" 
            rules={[
              {
                required: true,
                message: 'El estatus es obligatorio'
              }
            ]}
            >
              <Select placeholder="Porfavor selecciona un estatus">
                <Select.Option value="Alive">Alive</Select.Option>
                <Select.Option value="Unknown">Unknown</Select.Option>
                <Select.Option value="Dead">Dead</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="species" label="Specie" 
            rules={[
              {
                required: true,
                message: 'La especie es obligatoria'
              }
            ]}
            >
              <Select placeholder="Porfavor selecciona un especie">
                <Select.Option value="human">Human</Select.Option>
                <Select.Option value="alien">Alien</Select.Option>
              </Select>
            </Form.Item>

            <div style={{textAlign: "right"}}>
            <Button type="primary" loading={loading} htmlType="submit">
              Save
            </Button>{' '}
            <Button type="default" htmlType="button" onClick={() => history.push('/characters/list')}>
              Back
            </Button>
              </div>
          </Form>
          </Col>
        </Row>
    </div>
  );
}

export default FormCharacter;