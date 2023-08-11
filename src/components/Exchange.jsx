import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import {
  Container,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

const Exchange = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchExchanges = async () => {
    try {
      const { data } = await axios.get(`${server}/exchanges`);

      setExchanges(data);
      //   console.log(data);
      console.log(exchanges);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchExchanges();
  }, []);

  if (error) {
    return <ErrorComponent message={"error in exchage page"} />;
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack flexWrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges?.map((i) => (
              <>
                <ExportCard
                  key={i.id}
                  img={i.image}
                  rank={i.trust_score_rank}
                  url={i.url}
                  name={i.name}
                />
              </>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};
const ExportCard = ({ name, img, rank, url }) => {
  return (
    <a href={url} target="blank">
      <VStack
        w={52}
        shadow={"lg"}
        p={8}
        borderRadius={"lg"}
        transition={"all 0.3s "}
        m={4}
        css={{
          "&:hover": "scale(1.5)",
        }}
      >
        <Image
          src={img}
          w={10}
          h={10}
          objectFit={"contain"}
          alt={"exchange"}
        ></Image>
        <Heading size={"md"} noOfLines={1}>
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchange;
