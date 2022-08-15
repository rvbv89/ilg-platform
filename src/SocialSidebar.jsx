import React from 'react';
import {
  Flex,
  Box,
  Text,
  Heading,
  Container,
  Divider,
  VStack,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux/es/exports';

export const SocialSidebar = () => {
  let user = useSelector(state => state.users.currentUser);
  let username = useSelector(state => state.users.currentUsername);
  let isLoggedIn = useSelector(state => state.users.isLoggedIn);

  return (
    <Box
      centerContent
      borderColor="lightgrey"
      maxHeight={{ base: '20em', lg: '30em' }}
      minHeight={{ base: '20em', lg: '30em' }}
      marginTop={{ base: '4', lg: '4' }}
      borderRadius={'4px'}
      backgroundColor={'white'}
      paddingX="10"
    >
      <Heading fontFamily="body" size="md" padding="4" color="lightslategray">
        Social
      </Heading>
      <Container>
        {isLoggedIn === true && (
          <>
            <h1 style={{ color: 'slategray', marginBottom: '.5em' }}>You</h1>
            <Box borderRadius="5px" backgroundColor="#EDF2F7" padding="4">
              <span style={{ fontWeight: 'bold' }}>{username}</span>
            </Box>
            <Divider variant="solid" />
            <h1 style={{ color: 'slategray', marginTop: '.5em' }}>Others</h1>
            <VStack></VStack>
          </>
        )}
      </Container>
    </Box>
  );
};
