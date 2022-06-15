import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';

export const PostSidebar = () => {
  return (
    <Box
      centerContent
      border="1px"
      borderColor='lightgrey'
      maxHeight={{ base: '20em', lg: '30em' }}
      minHeight={{ base: '20em', lg: '30em' }}
     
      marginTop={{ base: '4', lg: '4' }}
      borderRadius={'2px'}
      backgroundColor={'white'}
    ></Box>
  );
};
