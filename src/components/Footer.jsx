import { Avatar, Box, Center, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import profile from "../assets/profile.jpg"
const Footer = () => {
  return (
    <Box
    minH={46}
    px={14}
    py={[16,8]} bgColor={'blackAlpha.900'} color={'whiteAlpha.600'}>
       <HStack direction={['column','row']}
       h={'full'}
       alignItems={'Center'}
       >
       <VStack w={'full'} alignItems={['center','flex-start']}>
       <Text fontWeight={'bold'}>About Us</Text>
       <Text fontWeight={'bold'} letterSpacing={'widest'} textAlign={['center','left']} fontSize={'sm'}>We are the best crypto trading app in India,
       we provide our guidance  at affordable price</Text>
        
       </VStack>
       <VStack>
        <Avatar boxSize={28} mt={['4','0']}
        src={profile}
        />
        <Text > Our founder</Text>
       </VStack>

       </HStack> 

    </Box>
  )
}

export default Footer
