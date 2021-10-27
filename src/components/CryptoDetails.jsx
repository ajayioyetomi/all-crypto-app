import React, {useState} from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router';
import millify from 'millify';
import {Col,Row,Typography,Select} from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailQuery } from '../services/cryptoApi';
const {Title,Text} = Typography;
const {Option} = Select;
// const replaceAllComma = (str) => {
//     let newStr = str.replaceAll(',','');
//     return newStr;
// }

const CryptoDetails =()=> {
    const [timePeriod,setTimePeriod] = useState('7d');
    const {coinId} = useParams();
    const {data,isFetching} = useGetCryptoDetailQuery(coinId);
   
    //console.log(data);
    //return 'Hello';
    if(isFetching){return "Loading..."}
    
    const cryptoDetails = data&&data.data&&data.data.coin;

    console.log(data,'crypto')

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails && cryptoDetails.price && millify(cryptoDetails && cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails &&cryptoDetails.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails &&cryptoDetails.volume && millify(cryptoDetails &&cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails &&cryptoDetails.marketCap && millify(cryptoDetails &&cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails &&cryptoDetails.allTimeHigh&&cryptoDetails.allTimeHigh.price && millify(cryptoDetails &&cryptoDetails.allTimeHigh&&cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails &&cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails &&cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails &&cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails &&cryptoDetails.totalSupply&&millify(cryptoDetails &&cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails &&cryptoDetails.circulatingSupply&&millify(cryptoDetails &&cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];

  
  
    

    return (
        <Col className="coin-detail-container">
            <Col className="coin-heading-container">
                <Title level={2} className="coin-name">
                    {cryptoDetails && cryptoDetails.name}({cryptoDetails && cryptoDetails.slug}) Price
                </Title>
                <p>
                    {cryptoDetails && cryptoDetails.name} live price in us dollars.
                    View value statistics, market cap and supply.
                </p>
            </Col>
            <Select 
                defaultValue="7d" 
                className="select-timeperiod"
                placeholder="Select Time Period"
                onChange={(value) => setTimePeriod(value)}
            >
                {time.map((date) => 
                    <Option key={date}>{date}</Option>
                )}
            </Select>
            <Col className="stats-container">
                <Col className="coin-value-statistics">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">
                            {cryptoDetails&& cryptoDetails.name} Value Statistics
                        </Title>
                        <p>
                            An overview showing the stats of {cryptoDetails && cryptoDetails.name}
                        </p>
                    </Col>
                    {stats&&stats.map(({icon,title,value})=>
                    (<Col className="coin-stats" key={title}>
                        <Col className="coin-stats-name">
                            <Text>{icon}</Text>
                            <Text>{title}</Text>
                        </Col>
                        <Text className="stats">
                            {value }
                        </Text>                    
                    </Col>))}
                </Col>
                <Col className="ohter-stats-info">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">
                            Other Statistics
                        </Title>
                        <p>
                            An overview showing the stats of all cryptocurrencies
                        </p>
                    </Col>
                    {genericStats&&genericStats.map(({icon,title,value})=>
                    (<Col className="coin-stats" key={title}>
                        <Col className="coin-stats-name">
                            <Text>{icon}</Text>
                            <Text>{title}</Text>
                        </Col>
                        <Text className="stats">
                            {value }
                        </Text>                    
                    </Col>))}
                </Col>

            </Col>
            <Col className="coin-desc-name">
                <Row className="coin-desc">
                    <Title level={3} className="coin-details-heading">
                        what is {cryptoDetails&&cryptoDetails.name}
                        {HTMLReactParser(cryptoDetails&&cryptoDetails.description)}
                    </Title>
                </Row>
            </Col>

        </Col>
    )
    
}

export default CryptoDetails
