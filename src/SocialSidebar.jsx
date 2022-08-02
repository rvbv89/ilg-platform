import React from 'react';
import { Flex, Box, Text, Heading, Container } from '@chakra-ui/react';
import { useSelector } from 'react-redux/es/exports';

export const SocialSidebar = () => {
  let user = useSelector(state => state.users.currentUser);
  let username = useSelector(state => state.users.currentUsername)
  let isLoggedIn = useSelector(state => state.users.isLoggedIn);

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
      paddingX="10"
    >
      <Heading fontFamily="body" size="md" padding="4" color="lightslategray">
        Social
      </Heading>
      <Container>
        {isLoggedIn===true && (
          <>
          <span style={{color: "slategray"}}>You</span>
            <Box borderRadius="5px" backgroundColor="#EDF2F7" padding="4">
              <span
              style={{fontWeight:"bold"}}
              >{username}</span>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};
