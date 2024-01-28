import {
  Button,
  HStack,
  Radio,
  RadioGroup,
  Box,
  Container,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Server } from "../index";
import Loader from "./Loader";
import Chart from "./Chart";
import ErrorComponent from "./ErrorComponent";
import { useParams } from "react-router-dom";
const CoinDetails = () => {
  const params = useParams();
  const [coins, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days,setDays] = useState('24h');
  const [chartArray,setChartArray] = useState([]);
  const currencySymbol = currency === 'inr' ? '₹':currency==='eur'?'€':'$';

  const btns = ['24h','7d','14d','30d','60d','200d','1y','max'];

  const switchChartStarts=(key)=>{

   switch (key){
      
     case '24h':
      setDays('24h');
      setLoading(true);
      break;

   
      case '7d':
        setDays('2d');
        setLoading(true);
        break;

        case '14d':
          setDays('14d');
          setLoading(true);
          break;
  
          case '30d':
            setDays('30d');
            setLoading(true);
            break;
    
          case '60d':
              setDays('60d');
              setLoading(true);
              break;
       
          case '200d':
                setDays('200d');
                setLoading(true);
                break;
     
           case '1y':
                  setDays('1y');
                  setLoading(true);
                  break;
                 
            case 'max':
                    setDays('max');
                    setLoading(true);
                    break;
            
     default:
      setDays('24h');
      setLoading(true);
      break;
   }



  }
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${Server}/coins/${params.id}`);

        const {data:Chartdata} = await axios.get(`${Server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setChartArray(Chartdata.prices);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id,currency,days]);
  if (error) return <ErrorComponent message={"Error while fetching coins"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={"full"} borderWidth={1}>
            <Chart currency={currencySymbol} days={days} arr={chartArray}/>
          </Box>


            {/* Buttons */}
            <HStack p={'4'} wrap={'wrap'}>
                
              {
                btns.map((i)=>(
                  <Button key={i} onClick={()=>switchChartStarts(i)}>{i}</Button>
                ))
              }

            </HStack>


          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} padding={"16"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
              Last Updated on{" "}
              {Date(coins.market_data.last_updated).split("G")[0]}
            </Text>

            <Image
              src={coins.image.large}
              width={"16"}
              height={"16"}
              objectFit={"cover"}
            />

            <Stat>
              <StatLabel>{coins.name}</StatLabel>

              <StatNumber>
                {currencySymbol}
                {coins.market_data.current_price[currency]}
              </StatNumber>

              <StatHelpText>
                <StatArrow
                  type={
                    coins.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coins.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.900"} color={"white"}>
              {`#${coins.market_cap_rank}`}
            </Badge>

            <CustomBar 
            high={`${currencySymbol}${coins.market_data.high_24h[currency]}`} 
            low={`${currencySymbol}${coins.market_data.low_24h[currency]}`} 
         />

           <Box w={'full'} p={'4'}>
            
            <Item title={'Max Supply'} value={coins.market_data.max_supply}/>
            <Item title={'Circulating Supply'} value={coins.market_data.circulating_supply}/>

            <Item title={'Marketing Cap'} 
            value={`${currencySymbol}${coins.market_data.market_cap[currency]}`}/>

            <Item title={'All Time Low'} 
            value={`${currencySymbol}${coins.market_data.atl[currency]}`}/>           
             <Item title={'All Time High'} 
            value={`${currencySymbol}${coins.market_data.ath[currency]}`}/>   
           </Box> 

          </VStack>
        </>
      )}
    </Container>
  );
};


const Item =({title,value})=>(

<HStack justifyContent={'space-between'} w={'full'} my={'full'}>
  <Text letterSpacing={'widest'} fontFamily={'fantasy'}>{title}</Text>
  <Text>{value}</Text>
</HStack>

);

const CustomBar = ({ high, low }) => 
(
    <VStack w={"full"}>
    <Progress value={"50"} colorScheme="teal" w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme="red" />
      <Text fontSize={"sm"}>24h Range</Text>
      <Badge children={high} colorScheme="green" />
    </HStack>
  </VStack>
  )

export default CoinDetails;
