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
  Divider,
  Button,
  Link,
} from '@chakra-ui/react';
import { useAuth } from './context/AuthProvider';

export const ResetPasswordForm = () => {
  const passwordRef = useRef();
  const { onResetPassword, setEmail, email } = useAuth();
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
                  <Stack>
                    <Input
                      ref={passwordRef}
                      name="email"
                      type="email"
                      placeholder="New Password"
                    />
                    <Input
                      ref={passwordRef}
                      name="email"
                      type="email"
                      placeholder="Re-Enter New Password"
                    />
                  </Stack>
                  {/* <FormLabel htmlFor='email'>Email Address</FormLabel> */}
                </InputGroup>
              </FormControl>
              <Button
                colorScheme={'teal'}
                onClick={e => {
                  e.preventDefault();
                  onResetPassword(email, passwordRef);
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
