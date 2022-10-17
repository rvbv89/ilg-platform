import React, { useRef, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
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
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import { useAuth } from './context/AuthProvider';
import { UserAvatar } from './UserAvatar';

export const Register = () => {
  // Local state for user input vals
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  // User registration handler from Auth context
  const { onRegister } = useAuth()

  // Chakra hooks for avatar popover
  const { onClose, isOpen, onOpen } = useDisclosure();

  const [avatarVal, setAvatarVal] = useState();
  const [avatarPreviewVal, setAvatarPreviewVal] = useState();
  // const [avatarPreviewVal, setAvatarPreviewVal] = useState('');
  const [toggleLargeAvatar, setToggleLargeAvatar] = useState(false);

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
          <form onSubmit={onRegister}>
            <Stack rounded="md" spacing={4} p="2rem" boxShadow="md">
              <Heading fontSize="2xl" fontWeight="normal">
                Please enter a valid email, username and password to complete
                registration
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
              <FormControl id="userName">
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
                  {/* <FormLabel htmlFor='text'>Username</FormLabel> */}
                  <Input ref={usernameRef} type="text" placeholder="Username" />
                </InputGroup>
              </FormControl>
              <FormControl id="password">
                <InputGroup>
                  <InputLeftElement
                    // children={<LockIcon color="darkGrey" />}
                    pointerEvents="none"
                    color="grey"
                  />
                  {/* <FormLabel htmlFor='password'>Password</FormLabel> */}
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
              <Divider />
              {/* Optional Avatar Upload */}
              <span>Upload An Avatar Image (Optional)</span>
              {toggleLargeAvatar && (
                <UserAvatar avatarPreviewVal={avatarPreviewVal} />
              )}
              <Popover isOpen={isOpen}>
                <PopoverTrigger>
                  <Button onClick={onOpen}>Upload Image</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>Select Avatar Image</PopoverHeader>
                  <PopoverCloseButton onClick={onClose} />
                  <PopoverBody>
                    <FormControl>
                      <InputGroup>
                        <Input
                          type="file"
                          accept="image/png, image/jpeg"
                          onChange={e => {
                            const reader = new FileReader();
                            reader.readAsDataURL(e.target.files[0]);
                            reader.onload = () => {
                              console.log(reader.result);
                              const file = e.target.files[0];
                              setAvatarPreviewVal(reader.result);
                              setAvatarVal(file);
                            };
                          }}
                        />
                        <UserAvatar avatarPreviewVal={avatarPreviewVal} />
                      </InputGroup>
                    </FormControl>
                  </PopoverBody>
                  <PopoverFooter>
                    <Button
                      onClick={() => {
                        onClose();
                        setToggleLargeAvatar(true);
                      }}
                    >
                      <i class="fa-solid fa-check"></i>
                    </Button>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>

              <Button
                onClick={e => {
                  e.preventDefault();
                  onRegister(
                    usernameRef.current?.value,
                    emailRef.current?.value,
                    passwordRef.current?.value,
                    avatarVal
                  );
                  // onAvatarUpload(avatarVal)
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
