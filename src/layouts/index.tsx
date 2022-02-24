import React from 'react';
import { IRouteComponentProps, Access, useAccess, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Result, Button } from 'antd';

const Layout: React.FC<IRouteComponentProps> = ({ children, ...props }) => {

    const { location: {pathname} } = props;
    const access = useAccess();
    const menuAccess: string[] = JSON.parse(localStorage.getItem('menuAccess') || '') || [];

    return (
      <PageContainer {...props}>
       <Access
          accessible={access.canViewPage(pathname, menuAccess)}
          fallback={
            <Result
              title="您没有当前页面权限，请联系管理员添加权限"
              extra={
                <Button type="primary" onClick={() => history.push('/')}>
                  回到首页
                </Button>
              }
            />
          }
        >
          {children}
        </Access>
      </PageContainer>
    )
};
  
export default Layout;
