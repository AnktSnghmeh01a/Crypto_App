import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Server} from "../index";
import Loader from './Loader';
import CoinCard from './CoinCard';
import { Button, Container, HStack, Radio, RadioGroup} from '@chakra-ui/react';
import ErrorComponent from './ErrorComponent';

const Coins = () => {
    
   const [coins,setCoins] = useState([]);
   const [loading,setLoading] = useState(true);
   const [error,setError] = useState(false);
   const [page,setPage] = useState(1);
   const [currency,setCurrency] = useState('inr');

   const currencySymbol = currency === 'inr' ? '₹':currency==='eur'?'€':'$';

   const changePage = (page) =>{
    setPage(page);
    setLoading(true);
   };

   const btns = new Array(132).fill(1);
   
   useEffect(()=>{
    const fetchCoin =  async()=>{

      try {
        const {data} = await axios.get(`${Server}/coins/markets?vs_currency=${currency}&page=${page}`);
        console.log(data);  
        setCoins(data);
        setLoading(false);
      } 
      catch (error) {
         setError(true);
         setLoading(false);
      }
  
    }
    fetchCoin();
   },[currency,page]);
   if(error) return <ErrorComponent message={'Error while fetching coins'}/> 
   return <Container maxW={'container.xl'}>
    {loading?<Loader/>:<>
    
        
    <RadioGroup value={currency} onChange={setCurrency} p={'8'} >
      
        <HStack spacing={'4'}>
        
          <Radio value={'inr'}>INR</Radio>
          <Radio value={'usd'}>USD</Radio>
          <Radio value={'eur'}>EUR</Radio>
        
        </HStack>  
      
    </RadioGroup>   

      <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
  
       {coins.map((i)=>(
          <CoinCard
           name= {i.name}
           img = {i.image}
           key = {i.id}
           id = {i.id} 
           price = {i.current_price}
           currency= {currencySymbol}
           />        
          ))}

      </HStack>
     

     <HStack w={'full'} overflowX={'auto'} p={'8'}>

        {btns.map((item,index)=>(
              <Button bgColor={'blackAlpha.900'} color={'white'} onClick={() => changePage(index+1)} >{index+1}</Button>
        ))}

     </HStack>
    
    </>
    }

   </Container> 
   
}

export default Coins;