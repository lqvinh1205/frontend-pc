import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Card, Col, Row, DatePicker, Statistic, Typography, message, Spin } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from './slice';
import { DollarOutlined, DropboxOutlined, ShoppingOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../../../constants';

const Dashboard = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.dashboard?.loading);
  const report = useSelector((state) => state.dashboard?.data);

  const defaultDate = [
    dayjs(dayjs().subtract(7, 'days'), DATE_FORMAT),
    dayjs(dayjs(), DATE_FORMAT)
  ];
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Thống kê doanh thu'
      }
    }
  };
  const labels = report.totalRevenue?.map((item) => item._id);
  const data = {
    labels,
    datasets: [
      {
        label: 'Doanh thu',
        data: report.totalRevenue?.map((item) => item.sum),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  };
  const handleChangeDate = async (_, [startDate, endDate]) => {
    if (dayjs(endDate, DATE_FORMAT).diff(dayjs(startDate, DATE_FORMAT), 'day') > 30) {
      message.warning('Chỉ tìm kiếm tối đa 30 ngày');
    } else {
      await dispatch(
        getDashboard({
          startDate: dayjs(startDate, 'DD-MM-YYYY').format('MM-DD-YYYY'),
          endDate: dayjs(endDate, 'DD-MM-YYYY').format('MM-DD-YYYY')
        })
      );
    }
  };
  useEffect(() => {
    dispatch(
      getDashboard({
        startDate: dayjs(defaultDate[0], 'DD-MM-YYYY').format('MM-DD-YYYY'),
        endDate: dayjs(defaultDate[1], 'DD-MM-YYYY').format('MM-DD-YYYY')
      })
    );
  }, []);
  return (
    <>
      <Typography.Title level={3}>Báo cáo tổng hợp</Typography.Title>
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Doanh thu theo thống kê"
              value={report?.report?.total}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarOutlined />}
              suffix="VND"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Tổng doanh thu"
              value={report?.report?.totalSum}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarOutlined />}
              suffix="VND"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Số sản phẩm đang bán"
              value={report?.report?.totalProducts}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DropboxOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Số đơn hàng thành công"
              value={report?.report?.totalBills}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <div className="mt-8 flex items-center gap-2">
        <Typography.Title level={3} className="!mb-0">
          Thống kê doanh thu:
        </Typography.Title>
        <DatePicker.RangePicker
          defaultValue={defaultDate}
          onChange={handleChangeDate}
          format={DATE_FORMAT}
        />
        <span>(Tối đa 30 ngày)</span>
      </div>
      <Line options={options} data={data} />
      <Spin spinning={loading} fullscreen />
    </>
  );
};

export default Dashboard;
