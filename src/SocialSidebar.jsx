import React, { useState } from 'react';
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
import { useEffect } from 'react';

export const SocialSidebar = () => {
  let user = useSelector(state => state.users.currentUser);
  let otherUsers = useSelector(state => state.users.allOtherUsers);
  let username = useSelector(state => state.users.currentUsername);
  let isLoggedIn = useSelector(state => state.users.isLoggedIn);

  // const [otherUsers, setOtherUsers] = useState([]);

  // useEffect(() => {
  //   if (isLoggedIn === false) {
  //     console.log('no auth') 
  //     return
  //   } else {
  //     if (allUsers !== []){
  //     let filteredUsers = allUsers.filter(user => user.username !== username);
  //     setOtherUsers(filteredUsers);
  //     } else {
  //       console.log('no other users')
  //     }
  //   }
  // }, [isLoggedIn, allUsers]);

  return (
    <Box
    // display={["none", "none", "flex", "flex"]}
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
            <VStack>
              <Box borderRadius="5px" backgroundColor="#EDF2F7" padding={['2', '4', '4', '4']}>
                <span style={{ fontWeight: 'bold' }}>{username}</span>
              </Box>
            </VStack>

            <Divider marginY="1.5" variant="solid" />
            <h1 style={{ color: 'slategray', marginTop: '.5em' }}>Others</h1>
            <VStack>
              {otherUsers &&
                otherUsers.map(user => {
                  return (
                    <Box
                      borderRadius="5px"
                      backgroundColor="#EDF2F7"
                      padding={['2', '4', '4', '4']}
                    >
                      <span style={{ fontWeight: 'bold' }}>
                        {user.username}
                      </span>
                    </Box>
                  );
                })}
            </VStack>
          </>
        )}
      </Container>
    </Box>
  );
};
