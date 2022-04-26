import { Layout, Menu } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';

const { Header } = Layout;
function Nav() {
  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(1).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
        />
      </Header>
    </Layout>
  );
}

// /* eslint-disable react/react-in-jsx-scope */
// import { Layout, Menu } from 'antd';

// const { Header } = Layout;

// function Nav() {
//   return (
//     <Layout>
//       <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
//         <div className="logo" />
//         <Menu
//           theme="dark"
//           mode="horizontal"
//           defaultSelectedKeys={['2']}
//           items={[{
//             key: String(1),
//             label: `nav ${1}`,
//           },
//           ]}
//         />
//       </Header>
//       {/* <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
//         <Breadcrumb style={{ margin: '16px 0' }}>
//           <Breadcrumb.Item>Home</Breadcrumb.Item>
//           <Breadcrumb.Item>List</Breadcrumb.Item>
//           <Breadcrumb.Item>App</Breadcrumb.Item>
//         </Breadcrumb>
//         <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
//           Content
//         </div>
//       </Content>
//       <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
//     </Layout>
//   );
// }

export default Nav;
