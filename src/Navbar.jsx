import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  ButtonGroup,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useFetchMessagesQuery } from './redux/supabaseQuery';
import { useAuth } from './context/AuthProvider';

export const Navbar = ({ onOpen }) => {
  // const { data, isFetching } = useFetchMessagesQuery()
  const { onLogout } = useAuth();

  // useEffect(()=>{
  //   console.log(data)
  // })

  return (
    <Box position="sticky">
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        padding="2"
        borderBottom="1px"
        borderColor="lightgrey"
      >
        <Heading size="md" marginX="4">
          ilg-platform
        </Heading>
        <Spacer />
        <Input type="search" placeholder="Search" width="96" marginX="4" />
        <ButtonGroup gap="2">
          <Button colorScheme="teal" onClick={onOpen}>
            Sign In
          </Button>
          <Button colorScheme="teal" variant="ghost" onClick={onLogout}>
            Sign Out
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};
