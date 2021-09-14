import { PageHeaderWrapper } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import { Tabs } from "antd";
import React, { useRef } from 'react';
import styles from './index.less';
import { getLogList } from "./service";

const { TabPane } = Tabs;

const callback = (key) => {
  console.log(key);
}

const Log = () => {

  const actionRef = useRef();

  const columns = [
    {
      title: '日志内容',
      dataIndex: 'logContent',
      hideInSearch: true,
    },
    {
      title: '操作人名称',
      dataIndex: 'username',
      filters: false,
      hideInSearch: true,
      // valueEnum: {
      //   1: <Tag color="blue">目录</Tag>,
      //   2: <Tag color="green">子菜单</Tag>,
      // },
    },
    {
      title: 'IP',
      hideInSearch: true,
      dataIndex: 'ip',
    },
    {
      title: '耗时(毫秒)',
      hideInSearch: true,
      dataIndex: 'costTime',
    },
    {
      title: '操作类型',
      dataIndex: 'operateType',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
  ];


  return (
    <PageHeaderWrapper className={styles.main}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="登录日志" key="1">
          <ProTable search={false} actionRef={actionRef} rowKey={(row) => row.id}
            columns={columns}
            request={(params, sorter, filter) => getLogList({ ...params, sorter, filter })}
            rowSelection={{}}
          />
        </TabPane>
        <TabPane tab="操作日志" key="2">
          <ProTable search={false} actionRef={actionRef} />
        </TabPane>
      </Tabs>
    </PageHeaderWrapper>
  );

};

export default Log;