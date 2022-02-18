import { ArrowLeftOutlined } from "@ant-design/icons/lib/icons";
import { Button, Card, Col, Layout, Row } from "antd";
const { Content } = Layout;

function CardLayout({ cardTitle, actions, children, back, onBack }) {
  const defaultBack = ()=>{window.history.back()}
  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <Row justify="center">
          <Col span={20}>
            <Card title={<>{back && <Button shape="circle" onClick={onBack || defaultBack } icon={<ArrowLeftOutlined />}/>} {cardTitle}</>} actions={actions} >
              {children}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default CardLayout;
