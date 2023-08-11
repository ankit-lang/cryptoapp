import { Box, Image, Text } from "@chakra-ui/react";
import react from "react";
import img from "../assets/bitcoin.jpg"
import {motion} from "framer-motion"
const Home = () => {
  return (
    
    <Box w={'full'} bgColor={'blackAlpha.900'}
    h={'100vh'}
    >
   <motion.div 
   style={{
    height : "80vh",
    
   }}
   animate = {{
    translateY : '28px'
   }}
   transition={{
    duration :2,
    repeat : "infinity",
    repeatType : "reverse"
}}
   >
   <Image mt={[0,-10]} filter={'grayScale(1)'} w={'full'} h={'full'} objectFit={'contain'}
    src={img} />
   </motion.div>
    <Text bg={'blackAlpha.700'} fontWeight={'thick'} position={'relative'} mt={-100}  fontSize={'6xl'} textAlign={'center'} color={'whiteAlpha.700'}>

XCrypto

    </Text>
    </Box>
  );
};

export default Home;
