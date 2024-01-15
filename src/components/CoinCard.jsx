import React from 'react';
import {Link} from 'react-router-dom';
import {VStack ,Image,Text} from '@chakra-ui/react';

const CoinCard = ({id,name,img,price,currency='₹'})=>(
  
  <Link to={`/coin/${id}`}>

   <VStack 
   width={'52'} 
   shadow={'lg'}
   p={'8'}
   borderRadius={'lg'}
   transition={'all 0.3s'}
   cursor={'pointer'}
   css={{
    "&:hover":{
      transform:"scaleX(1.1)",
    } ,
   }}
   >
    <Image src={img} w={'10'} h={'10'} objectFit={'contain'} alt='exchanges'/>
    <Text noOfLines={'1'}>{name}</Text>
    <Text noOfLines={'1'}>{price?`${currency}${price}`:'NA'}</Text>
   </VStack>

  </Link>


)

export default CoinCard;