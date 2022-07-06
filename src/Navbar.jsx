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
} from '@chakra-ui/react';

export const Navbar = ({ onOpen }) => {
  
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
        <Heading size="md">ilgit</Heading>
        <Spacer />
        <ButtonGroup gap="2">
          <Button colorScheme="teal"
          onClick={onOpen}
          >Sign In</Button>
          <Button colorScheme="teal" variant="ghost" >
            Sign Out
          </Button>
        </ButtonGroup>
      </Flex>
      //TODO: move modal to separate component
    </Box>
  );
};
