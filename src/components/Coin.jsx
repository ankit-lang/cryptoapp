import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../index";
import {
  Button,
  Center,
  Container,
  HStack,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import Coincard from "./Coincard";

const Coin = () => {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const [loading, setLoading] = useState(true);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const fetchCoins = async () => {
    try {
      const { data } = await axios.get(
        `${server}/coins/markets?vs_currency=${currency}`
      );
      setCoins(data);
      // console.log(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  // console.log(data);
  // console.log(exchanges);

  useEffect(() => {
    fetchCoins();
  }, [page, currency]);
  if (error) {
    return <ErrorComponent message={"Erro white fetching coin"} />;
  }

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };
  // pagination
  const btns = new Array(132).fill(1);

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
        {/* "₹" : currency === "eur" ? "€" : "$" */}
          <RadioGroup value={currency} onChange={setCurrency} p={8}>
            <HStack spacing={4} >
              <Radio value={'inr'}>₹ INR</Radio>
              <Radio value={'usd'}>$ USD</Radio>
              <Radio value={'eur'}>€ EUR</Radio>
           
            </HStack>
          </RadioGroup>
          <HStack flexWrap={"wrap"} justifyContent={'space-evenly'}>
            {coins?.map((i) => (
              <>
                <Coincard
                  id={i.id}
                  price={i.current_price}
                  img={i.image}
                  symbol={i.symbol}
                  currencySymbol={currencySymbol}
                  url={i.url}
                  name={i.name}
                />
              </>
            ))}
          </HStack>
          <HStack w={'full'} overflowX={'auto'} p={8} >
            {btns.map((items, index) => (
              <Button
              key = {index}
                color={"white"}
                bgColor={"blackAlpha.900"}
                onClick={() => changePage(index+1)}
              >
                {index+1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coin;
