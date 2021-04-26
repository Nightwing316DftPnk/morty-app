import React, {useEffect, useState} from 'react';
import {Row, Col, Typography, Input, Form, Button, 
Radio, Switch, Slider, Select, message} from 'antd';
import axios from 'axios';
import {useHistory} from 'react-router';

const {Title} = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const EditFormPlace = () => {
  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState({
    name:'',
    type: '',
    dimension: ''
  });

  const [fields, setFields] = useState([
    {
      name: ['name'],
      value: ''
    },
    {
      name: ['type'],
      value: '',
    },
    {
      name: ['dimension'],
      value: '',
    }
  ]);


  const history = useHistory();
  let id = window.location.pathname.split('/')[2]
  let base = 'http://localhost:5000/'

  useEffect(() => {
      (async () => {
          const pl = await axios.get(base+'places/'+id)

          setFields([
            {
              name: ['name'],
              value: pl.data.name
            },
            {
              name: ['type'],
              value: pl.data.type
            },
            {
              name: ['dimension'],
              value: pl.data.dimension
            }
          ])
      })()
  }, [])

  const handleSubmit = (values: any) => {
    setLoading(true);
    axios.put(base+'places/'+id, 
      values
    )
    .then(res => {
      setLoading(false);
      message.success('Ubicacion modificada correctamente!');
      history.push('/places');
    })
    .catch(error => {
      setLoading(false);
      message.error(error);
    })
  }


  const PlaceForm = ({ onChange, fields }: any) => (
    <Form
      name="place"
      {...layout} 
      onFinish={handleSubmit}
      fields={fields}
    >
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

        <Form.Item name="type" label="Tipo de Ubicación" 
        rules={[
          {
            required: true,
            message: 'Tipo de Ubicación es obligatorio'
          }
        ]}
        >
          <Select  placeholder="Porfavor selecciona tu Tipo de Ubicación">
            <Select.Option value="Planet">Planet</Select.Option>
            <Select.Option value="Cluster">Cluster</Select.Option>
            <Select.Option value="Space Station">Space Station</Select.Option>
            <Select.Option value="Microverse">Microverse</Select.Option>
            <Select.Option value="TV">TV</Select.Option>
            <Select.Option value="Resort">Resort</Select.Option>
            <Select.Option value="Fantasy Town">Fantasy Town</Select.Option>
            <Select.Option value="Dream">Dream</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="dimension" label="Dimension" 
        rules={[
          {
            required: true,
            message: 'Porfavor selecciona una dimensión'
          }
        ]}
        >
        <Select placeholder="Porfavor selecciona una dimensión">
            <Select.Option value="unknown">Unknown</Select.Option>
            <Select.Option value="Cronenberg Dimension">Cronenberg Dimension</Select.Option>
            <Select.Option value="Fantasy Dimension">Fantasy Dimension</Select.Option>
            <Select.Option value="Dimension 5-126">Dimension 5-126</Select.Option>
            <Select.Option value="Dimension C-137">Dimension C-137</Select.Option>
            <Select.Option value="Replacement Dimension">Replacement Dimension</Select.Option>
            <Select.Option value="Post-Apocalyptic Dimension">Post-Apocalyptic Dimension</Select.Option>
          </Select>
        </Form.Item>

        <div style={{textAlign: "right"}}>
          <Button type="primary" loading={loading} htmlType="submit">
            Save
          </Button>{' '}
          <Button type="default" htmlType="button" onClick={() => history.push('/places/list')}>
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
              Edición de Ubicacion
            </Title>
          </Col>
        </Row>
        <Row gutter={[40, 0]}>
          <Col span={18}>
            <PlaceForm
              fields={fields}
            />
          </Col>
        </Row>
    </div>
  );
}

export default EditFormPlace;