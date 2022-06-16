import React from 'react';
import { Flex, Box, Text, Heading, theme } from '@chakra-ui/react';

export const PostSidebar = () => {
  return (
    <Box
      centerContent
      
      border="1px"
      borderColor="lightgrey"
      maxHeight={{ base: '20em', lg: '30em' }}
      minHeight={{ base: '20em', lg: '30em' }}
      marginTop={{ base: '4', lg: '4' }}
      borderRadius={'4px'}
      backgroundColor={'white'}
    >
      <Heading fontFamily='body' size="md" padding="4" color="lightslategray">
        Feeds
      </Heading>
    </Box>
  );
};
