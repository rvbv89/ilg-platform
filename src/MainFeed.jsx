import React from 'react';
import { Flex, Box, Text, Heading } from '@chakra-ui/react';

export const MainFeed = () => {
  return (
    <Box
      centerContent
      border="1px"
      borderColor='lightgrey'
      overflowY="scroll"
      maxHeight={{ base: '20em', lg: '30em' }}
      minHeight={{ base: '20em', lg: '30em' }}
      p={'10'}
      marginTop={{ base: '4', lg: '4' }}
      borderRadius={'4px'}
      backgroundColor={'white'}
    >
      <Heading>{}</Heading>
    </Box>
  );
};
