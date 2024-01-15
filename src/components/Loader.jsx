import { Box, HStack, Spinner, VStack } from '@chakra-ui/react';
import React from 'react'

const Loader = () => {
  return  <VStack h={'90vh'} justifyContent={'center'}> 

     <HStack justifyContent={'center'}>

         <Box transform={'scale(3)'}>

         <Spinner size={'xl'}/>
             
         </Box>
     </HStack>

  </VStack> 
  
}

export default Loader;