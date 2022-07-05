import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  ButtonGroup,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

export const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box position='sticky'>
      <Flex minWidth="max-content" alignItems="center" gap="2" padding='2' borderBottom='1px' borderColor='lightgrey'>
        <Heading size="md">ilgit</Heading>
        <Spacer />
        <ButtonGroup gap='2'>
          <Button colorScheme="teal">Sign In</Button>
          <Button colorScheme="teal" variant="ghost">
            Sign Out
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};
