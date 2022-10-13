import React from 'react';
import '@fontsource/barlow';
import {
  ChakraProvider,
  Container,
  VStack,
  SimpleGrid,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react';
import theme from './theme';

import { Navbar } from './Navbar';
import { PostFeed } from './PostFeed';
import { PostSidebar } from './PostSidebar';
import { SocialSidebar } from './SocialSidebar';
import { AuthModal } from './AuthModal';

export const Home = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  return (
    <ChakraProvider theme={theme}>
      <Container
        maxHeight="100vh"
        maxWidth="100vw"
        // maxWidth="100%"
        // maxWidth="100%"
        overflowY="hidden"
        // overflowX="hidden"
      >
        <AuthModal isOpen={isOpen} onClose={onClose} onToggle={onToggle} />
        <Navbar onOpen={onOpen} />
        <SimpleGrid columns={3} maxChildWidth="35%">
          <GridItem>
            <Container
              
              overflowY={"auto"}
              css={{
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'slategrey',
                  borderRadius: '24px',
                },
              }}
            >
              <VStack overflowX="hidden" overflowY={'auto'}>
                <PostSidebar />
                <Container
                  centerContent
                  padding="0"
                  visibility={['visible', 'visible', 'visible', 'hidden']}
                >
                  <SocialSidebar />
                </Container>
              </VStack>
            </Container>
          </GridItem>
          
          <GridItem colSpan={['2', '2', '1', '1']}>
          <Container
              overflowY={['auto', 'auto', 'auto', 'auto']}
              css={{
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'slategrey',
                  borderRadius: '24px',
                },
              }}
            >
            <PostFeed />
            </Container>
          </GridItem>
          <GridItem visibility={['hidden', 'hidden', 'hidden', 'visible']}>
            <Container
              overflowY={['auto', 'auto', 'auto', 'auto']}
              css={{
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'slategrey',
                  borderRadius: '24px',
                },
              }}
            >
              <SocialSidebar />
            </Container>
          </GridItem>
        </SimpleGrid>
      </Container>
    </ChakraProvider>
  );
};
