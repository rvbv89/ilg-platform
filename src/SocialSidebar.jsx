import React, { useState } from 'react';
import {
  Flex,
  Box,
  Text,
  Heading,
  Container,
  Divider,
  VStack,
  Button,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux/es/exports';

export const SocialSidebar = () => {
  let user = useSelector(state => state.users.currentUser);
  let otherUsers = useSelector(state => state.users.allOtherUsers);
  let username = useSelector(state => state.users.currentUsername);
  let isLoggedIn = useSelector(state => state.users.isLoggedIn);

  return (
    <Container
      // display={["none", "none", "flex", "flex"]}
      centerContent
      borderColor="lightgrey"
      maxHeight={{ base: '20em', lg: '30em' }}
      minHeight={{ base: '20em', lg: '30em' }}
      marginTop={{ base: '4', lg: '4' }}
      borderRadius={'4px'}
      backgroundColor={'white'}
      fontSize={['.85em', '1em', '1em', '1.25em']}
    >
      <Heading fontFamily="body" size="md" padding="4" color="lightslategray">
        Social
      </Heading>
      <Container centerContent>
        {isLoggedIn === true && (
          <>
            <h1 style={{ color: 'slategray', marginBottom: '.5em' }}>You</h1>
            <VStack>
              <Button
                fontSize={['.85em', '1em', '1em', '1em']}
                padding={['2', '4', '4', '4']}
                size="lg"
              >
                {username}
              </Button>
            </VStack>

            <Divider marginY="1.5" variant="solid" />
            <h1 style={{ color: 'slategray', marginTop: '.5em' }}>Others</h1>
            <VStack>
              {otherUsers &&
                otherUsers.map(user => {
                  return (
                    <Button
                      fontSize={['.85em', '1em', '1em', '1em']}
                      padding={['2', '4', '4', '4']}
                      size="lg"
                    >
                      {user.username}
                    </Button>
                  );
                })}
            </VStack>
          </>
        )}
      </Container>
    </Container>
  );
};
