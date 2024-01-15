import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Server} from "../index";
import Loader from './Loader';
import { Container, HStack, VStack ,Image, Heading,Text} from '@chakra-ui/react';
import ErrorComponent from './ErrorComponent';
const Exchanges = () => {
    
   const [exchanges,setExchanges] = useState([]);
   const [loading,setLoading] = useState(true);
   const [error,setError] = useState(false);

   useEffect(()=>{
    const fetchExchange =  async()=>{

      try {
        const {data} = await axios.get(`${Server}/exchanges?per_page=250`);
        setExchanges(data);

        setLoading(false);
      } catch (error) {
         setError(true);
         setLoading(false);
      }
 
    }
    fetchExchange();
   },[]);
   if(error) return <ErrorComponent message={'Error while fetching exchanges'}/> 
   return <Container maxW={'container.xl'}>
    {loading?<Loader/>:<>
    
      <HStack wrap={'wrap'}>
  
       {exchanges.map((i)=>(
          <ExchangeCard 
           name= {i.name}
           img = {i.image}
           key = {i.id}
           rank= {i.trust_score_rank}
           url = {i.url} 
          />        
          ))}

      </HStack>
     
    
    </>}

   </Container> 
   
}

const ExchangeCard = ({name,img,rank,url})=>(
  
  <a href={url} target='blank'>

   <VStack 
   width={'52'} 
   shadow={'lg'}
   p={'8'}
   borderRadius={'lg'}
   transition={'all 0.3s'}
   css={{
    "&:hover":{
      transform:"scaleX(1.1)",
    } ,
   }}
   >
    <Image src={img} w={'10'} h={'10'} objectFit={'contain'} alt='exchanges'/>
    <Heading size={'md'} noOfLines={'1'}>{rank}</Heading>
    <Text noOfLines={'1'}>{name}</Text>
   </VStack>

  </a>


)
export default Exchanges