import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../index";
import ErrorComponent from "./ErrorComponent";
import Chart from "./Chart";

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [error, setError] = useState(false);

  const [currency, setCurrency] = useState("inr");
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const params = useParams();

   const btns = ['24h','7d','14d','30d','60d','200d','365d','max']
  const switchChartStats = (key) =>{
    switch(key){
      case "24h" :
        setDays('24h');
        setLoading(true);
        break;
      case "7d" :
        setDays('7d');
        setLoading(true);
        break;
      case "14d" :
        setDays('14d');
        setLoading(true);
        break;
      case "30d" :
        setDays('30d');
        setLoading(true);
        break;
      case "60d" :
        setDays('60d');
        setLoading(true);
        break;
      case "200d" :
        setDays('200d');
        setLoading(true);
        break;
      case "365d" :
        setDays('365d');
        setLoading(true);
        break;
      case "max" :
        setDays('max');
        setLoading(true);
        break;
      default : 
      setDays('24h');
      setLoading(true);
      break
    }
  }


  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        //chat api
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id,days,currency]);
  if (error) {
    return <ErrorComponent message={"Erro white fetching coin detail"} />;
  }

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box borderWidth={1} w={"full"}>
            <Chart arr={chartArray} currency={currencySymbol} />
          </Box>
          <HStack p={4} overflowX={'auto'}>
          {
            btns.map((i)=>(
              <Button key={i} onClick={()=> switchChartStats(i)}>{i}</Button>
            ))
          }
          </HStack>

          <HStack flexWrap={'wrap'} ></HStack>
          <RadioGroup value={currency} onChange={setCurrency} p={8}>
            <HStack spacing={4}>
              <Radio value={"inr"}>₹ INR</Radio>
              <Radio value={"usd"}>$ USD</Radio>
              <Radio value={"eur"}>€ EUR</Radio>
            </HStack>
          </RadioGroup>
          <VStack spacing={4} p={15} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>
              Last Updated On{Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image w={"16"} src={coin.image.large} h={"16"} />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            {/* {console.log(`${currencySymbol}${coin.market_data.low_24h[currency]}`)} */}
            <Badge fontSize={"xl"} color="white" bg={"blackAlpha.900"}>
              {`#${coin.market_cap_rank}`}
            </Badge>
            <CustumBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />
            <Box w={"full"} p={4}>
              <Item value={coin.market_data.max_supply} title={"Max Supply"} />
              <Item
                value={coin.market_data.circulating_supply}
                title={"Circulating Supply"}
              />
              <Item
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
                title={"Market Cap"}
              />
              <Item
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
                title={"All Time Low"}
              />
              <Item
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
                title={"All Time High"}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const CustumBar = ({ high, low }) => {
  return (
    <VStack w={"full"}>
      <Progress value={50} colorScheme="teal" w={"full"} />
      <HStack w={"full"} justifyContent={"space-between"}>
        <Badge children={low} colorScheme="red" />
        <Text fontSize={"sm"}> 24H Range</Text>
        <Badge children={high} colorScheme="green" />
      </HStack>
    </VStack>
  );
};

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={4}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text fontFamily={"Bebas Neue"}>{value}</Text>
  </HStack>
);

export default CoinDetails;
