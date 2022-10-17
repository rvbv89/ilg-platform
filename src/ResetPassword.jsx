import React, { useRef } from 'react';
import {
  Flex,
  Stack,
  Box,
  Heading,
  FormControl,
  InputLeftElement,
  Input,
  InputGroup,
  Button,
  Link,
} from '@chakra-ui/react';
import { useAuth } from './context/AuthProvider';

export const ResetPassword = () => {
  const emailRef = useRef();
  const { onRequestResetPassword, setEmail } = useAuth();
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
                Please enter your email below. If there's an account associated
                with the address, we'll send you a reset link.
              </Heading>
              <FormControl id="email">
                <InputGroup>
                  <InputLeftElement
                    // children={<EmailIcon color="darkGrey" />}
                    pointerEvents="none"
                  />
                  {/* <FormLabel htmlFor='email'>Email Address</FormLabel> */}
                  <Input
                    ref={emailRef}
                    name="email"
                    type="email"
                    placeholder="Email Address"
                  />
                </InputGroup>
              </FormControl>
              <Button
                colorScheme={'teal'}
                onClick={e => {
                  e.preventDefault();
                  console.log(emailRef.current?.value);
                  onRequestResetPassword(emailRef.current?.value);
                  setEmail(emailRef.current?.value);
                }}
              >
                Reset
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
