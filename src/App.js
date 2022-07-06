import React, { useState } from 'react';
import '@fontsource/barlow';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react';
import theme from './theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { Navbar } from './Navbar';
import { MainFeed } from './MainFeed';
import { PostSidebar } from './PostSidebar';
import { SocialSidebar } from './SocialSidebar';
import { AuthModal } from './AuthModal';
import { useModal } from './context/ModalProvider'

function App() {
  const { modal } = useModal();

  return (
    <ChakraProvider theme={theme}>
      <Box
        margin={0}
        minWidth="max-content"
        maxHeight="100%"
        textAlign="center"
        fontSize="xl"
      >
        <AuthModal isOpen={modal.isModalOpen()} onClose={modal.closeModal()} />
        <Navbar onOpen={modal.openModal()} />
        <Grid templateColumns="repeat(4, 1fr)" margin={0} p={4} gap={4}>
          <GridItem>
            <PostSidebar />
          </GridItem>
          <GridItem colSpan={2}>
            <MainFeed />
          </GridItem>
          <GridItem>
            <SocialSidebar />
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
