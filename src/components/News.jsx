import React from 'react';
import {Select,Typography,Row,Col,Avatar,Card} from 'antd';
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewApi';

const{Text,Title} = Typography;
const {Option} = Select;
const demoImage = 'http://coinrevolution.com.wp-content/uploads/2020/06/crytonews.jpg';
const alt = 'image';
function News({simplified}) {
    const {data:cryptoNews, isFetching} = useGetCryptoNewsQuery({newCategory:'Cryptocurrency',count:simplified?6:20})
    // console.log(cryptoNews)
    if(isFetching){
        return "Loading..."
    }
    return (
        <Row gutter={[24,24]}>
            {cryptoNews.value.map((news,i) =>(
               <Col xs={24} sm={12} lg={8} key={i}>
                   <Card hoverable className="news-card">
                       <a href={news.url} target="_blank"
                          rel="noopener noreferrer"
                       >
                           <div className="news-image-container">
                                <Title className="news-title"
                                level={4}>
                                    {news.name}
                                </Title>
                                <img src={(news && news.image && news.image.thumbnail && news.image.thumbnail.contentUrl) || demoImage} 
                                alt={alt}/>
                           </div>
                           <p>
                               {news.description > 100 ?`${news.description.substring(0,100)}...`: news.description}
                           </p>
                           <div className="provider-container">
                                <div>
                                    <Avatar src={(news.provider[0] && news.provider[0].thumbnail && news.provider[0].thumbnail.contentUrl) || demoImage} alt={alt}/>
                                    <Text className="provider-name">
                                        {news.provider[0] && news.provider[0].name}
                                    </Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                           </div>

                       </a>

                   </Card>
               </Col> 
            ))
            
            }
        </Row>
    )
}

export default News
