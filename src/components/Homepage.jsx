import React from 'react';
import millify  from 'millify';
import {Typography,Row,Col,Statistic} from 'antd';
import {Link} from 'react-router-dom'; 
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies } from '../components';
import {News} from '../components';

const {Title} = Typography;

const replaceAllComma = (str) => {
    let newStr = str.replaceAll(',','');
    return newStr;
}

const Homepage = () => {
    const {data,isFetching} = useGetCryptosQuery(30);
    //const globalStats = data?data.data.stats: null;
    const globalStats = data && data.data && data.data.stats;
    console.log(data);

           
    if(isFetching) return 'Loading...';
    return (
        <React.Fragment>
            <Title level={2} className="heading">Global Crypto Stats</Title>
            <Row>
                <Col span={12}>
                    <Statistic title="Total Cryptocurrencies" value={globalStats.total}/>
                </Col>
                <Col span={12}>
                    <Statistic title="Total Exchanges"  value={millify(Number(globalStats.totalExchanges))} /> 
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
            <div className="home-heading-container">
                <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title>
                <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
            </div>
            <Cryptocurrencies simplified/>
            <div className="home-heading-container">
                <Title level={2} className="home-title">Latest Crypto News</Title>
                <Title level={3} className="show-more"><Link to="/news">Show More</Link></Title>
            </div>
            <News simplified />
            
        </React.Fragment>
    )
}

export default Homepage
