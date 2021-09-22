import React from 'react';
import millify  from 'millify';
import {Typography,Row,Col,Statistic} from 'antd';
//import {Link} from 'react-router-dom'; 
import { useGetCryptosQuery } from '../services/cryptoApi';

const {Title} = Typography;

const replaceAllComma = (str) => {
    let newStr = str.replaceAll(',','');
    return newStr;
}

const Homepage = () => {
    const {data,isFetching} = useGetCryptosQuery();
    const globalStats = data?data.data.stats: null ;
  
           
    if(isFetching) return 'Loading...';
    return (
        <React.Fragment>
            <Title level={2} className="heading">Global Crypto Stats</Title>
            <Row>
                <Col span={12}>
                    <Statistic title="Total Cryptocurrencies" value={globalStats.total}/>
                </Col>
                <Col span={12}>
                    { <Statistic title="Total Exchanges"  value={millify(Number(globalStats.totalExchanges))} /> }
                </Col>
                <Col span={12}>
                    <Statistic title="Total Market Cap" value={millify(replaceAllComma(`${globalStats.totalMarketCap}`))} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total 24Hour Volume" value={millify(replaceAllComma(`${globalStats.total24hVolume}`))} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Markets"  value={millify(replaceAllComma(`${globalStats.totalMarkets}`))} />
                </Col>
            </Row>
            
        </React.Fragment>
    )
}

export default Homepage
