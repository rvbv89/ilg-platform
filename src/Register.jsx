import React, { useRef } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Link,
  FormControl,
  InputRightElement,
} from '@chakra-ui/react';
import { useAuth } from './context/AuthProvider';
// import { EmailIcon, LockIcon } from '@chakra-ui/icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const { onRegister } = useAuth();

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Box maxW={{ base: '90%', md: '50em' }}>
          <form>
            <Stack rounded="md" spacing={4} p="2rem" boxShadow="md">
              <Heading fontSize="2xl" fontWeight="normal">
                Please enter a valid email, username and password to complete
                registration
              </Heading>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    // children={<EmailIcon color="darkGrey" />}
                    pointerEvents="none"
                  />
                  <Input
                    ref={emailRef}
                    type="email"
                    placeholder="Email Address"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    // children={
                    //   <FontAwesomeIcon
                    //     className="faUser"
                    //     color="darkGrey"
                    //     icon="fa-solid fa-user"
                    //   />
                    // }
                    pointerEvents="none"
                  />
                  <Input type="text" ref={usernameRef} placeholder="Username" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    // children={<LockIcon color="darkGrey" />}
                    pointerEvents="none"
                    color="grey"
                  />
                  <Input
                    // backgroundColor='grey'
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    {/* rounded='md' h="1.75rem" size="sm" */}
                    {/* <Button onClick={handleDisplayClick}>
                      {displayPassword ? 'Hide' : 'Show'}
                    </Button> */}
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                onClick={e => {
                  e.preventDefault();
                  console.log(passwordRef.current.value);
                  onRegister(
                    usernameRef.current?.value,
                    emailRef.current?.value,
                    passwordRef.current?.value
                  );
                }}
                borderRadius={6}
                type="submit"
                variant="solid"
                colorScheme={'teal'}
                width="full"
              >
                Register
              </Button>
              <Link href="/" colorScheme="teal">
                Back to main page
              </Link>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
