import React from 'react'
import {Line} from 'react-chartjs-2';
import {Row,Col,Typography} from 'antd';

const {Title} = Typography;


const LineChart = ({coinHistory,currentPrice,coinName}) => {

    const coinPrice = [];
    const coinTimestamp = [];
    const coinLength = coinHistory && coinHistory.data && coinHistory.data.history && coinHistory.data.history.length;

    for(let i = 0;i < coinLength;i+=1){
        coinPrice.push(coinHistory.data.history[i].price);
        coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleString());
    }
    console.log(coinHistory,coinPrice,coinTimestamp,"line");
    console.log(currentPrice,coinName,'name')
    const data={
        labels:coinTimestamp,
        dataSets: [
            {
                label:'Price in USD',
                data:coinPrice,
                fill:false,
                bacgroundColor: '#0071bd',
                borderColor:'#0071bd'     
            }
        ]
    }

    const options = {
        scales:{
            yAxes:[
                {
                    ticks:{
                        beginAtZero: true
                    },
                },
            ],
        },
    }

    console.log(data,options,"data")

    return (
        <React.Fragment>
            <Row className="chart-header">
                <Title level={2} className="chart-title">
                    {coinName} Price Chart
                </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">
                        {coinHistory&& coinHistory.data && coinHistory.data.change}%
                    </Title>
                    <Title level={5} className="current-price">
                        Current {coinName} Price: $ {currentPrice}
                    </Title>
                </Col>
            </Row>
            <Line data={data} options={options}/>
        </React.Fragment>
    )
}

export default LineChart

