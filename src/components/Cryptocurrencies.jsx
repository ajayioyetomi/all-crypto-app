import React, {useState} from 'react';
import millify from 'millify';
import {Link} from 'react-router-dom';
import {Card,Row,Col,Input} from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies =({simplified}) => {
    const count = simplified?30:30;
    // let isCount;
    // if(count == 10){
    //     isCount = true;
    // }
    // else{
    //     isCount = false;
    // }
    const {data:cryptoList,isFetching} = useGetCryptosQuery(count);//isCount?useGetCryptosQuery(count):useGetCryptos2Query();
    const [cryptos,setCryptos] = useState(cryptoList?cryptoList.data.coins:null);
    const alt = 'alt';
   
    if(isFetching) return 'Loading...';
    console.log(cryptos,count);
    return (
        <React.Fragment>
            <Row gutter={[32,32]} className="crypto-card-container">
                {cryptos.map((currency) =>
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card 
                                title={`${currency.rank} .${currency.name}`}
                                extra={<img className="crypto-image" src={currency.iconUrl} alt={alt}/>}
                                hoverable
                                >
                                    <p>Price: {millify(currency.price)}</p>
                                    <p>Market Cap:{millify(currency.marketCap)}</p>
                                    <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        
                        </Link>
                    </Col>
                )}
            </Row>
        </React.Fragment>
    )
}

export default Cryptocurrencies
