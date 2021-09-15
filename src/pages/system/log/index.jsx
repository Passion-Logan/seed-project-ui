import { PageHeaderWrapper } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import { Tabs, Tag } from "antd";
import React, { useRef } from 'react';
import styles from './index.less';
import { getLoginLogList, getLogList } from "./service";

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
      hideInSearch: false,
    },
    {
      title: '操作人ID',
      dataIndex: 'userId',
      hideInSearch: true,
    },
    {
      title: '操作人昵称',
      dataIndex: 'username',
      hideInSearch: false,
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
      hideInSearch: false,
      filter: true,
      valueEnum: {
        1: <Tag color="blue">查询</Tag>,
        2: <Tag color="green">添加</Tag>,
        3: <Tag color="orange">修改</Tag>,
        4: <Tag color="magenta">删除</Tag>,
        5: <Tag color="geekblue">导入</Tag>,
        6: <Tag color="green">导出</Tag>,
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: false,
      valueType: 'dateRange',
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
  ];

  const loginColumns = [
    {
      title: '登录账号',
      dataIndex: 'loginName',
      hideInSearch: false,
    },
    {
      title: '登录地址',
      hideInSearch: true,
      dataIndex: 'loginLocation',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      hideInSearch: true,
    },
    {
      title: '操作浏览器',
      dataIndex: 'browser',
      hideInSearch: true,
    },
    {
      title: '操作系统',
      hideInSearch: true,
      dataIndex: 'os',
    },
    {
      title: '登录时间',
      dataIndex: 'loginTime',
      hideInSearch: false,
      valueType: 'dateRange',
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
  ];

  return (
    <PageHeaderWrapper className={styles.main}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="登录日志" key="1">
          <ProTable actionRef={actionRef} rowKey={(row) => row.id}
            columns={loginColumns}
            pagination={{
              pageSize: 10,
              pageSizeOptions: [10, 20, 50, 100],
            }}
            request={async (params, sorter, filter) => getLoginLogList({ ...params, sorter, filter })}
            rowSelection={false}
          />
        </TabPane>
        <TabPane tab="操作日志" key="2">
          <ProTable actionRef={actionRef} rowKey={(row) => row.id}
            columns={columns}
            pagination={{
              pageSize: 10,
              pageSizeOptions: [10, 20, 50, 100],
            }}
            request={(params, sorter, filter) => getLogList({ ...params, sorter, filter })}
            rowSelection={false}
          />
        </TabPane>
      </Tabs>
    </PageHeaderWrapper>
  );

};

export default Log;