import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Text,
  Heading,
  VStack,
  Button,
  Container,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import postsSlice from './redux/postsSlice';
import { useSelector } from 'react-redux/es/exports';
import { supabase } from './supabase/init';

export const PostFeed = () => {
//define vars for redux state
  let currentFeedTitle = useSelector(state => state.posts.currentFeed);
  let posts = useSelector(state => state.posts.allPosts);
  let user = useSelector(state => state.currentUser);
  let isLoggedIn = useSelector(state => state.users.isLoggedIn);

  //local state to render posts based on current feed
  const [filteredPosts, setFilteredPosts] = useState([]);

  //Post submission modal props
  const { isOpen, onOpen, onClose } = useDisclosure();

  //effect to set the current feed and posts displayed based on 
  //posts available in redux store
  useEffect(() => {
    if (posts === []) {
      console.log('posts empty');
    } else {
      let currentTitle = currentFeedTitle.toLowerCase();
      let filteredPostArr = posts.filter(post => post.feed === currentTitle);
      setFilteredPosts(filteredPostArr);
      console.log(filteredPosts);
    }
  }, [currentFeedTitle, posts]);

  //add user submitted post to supabase table
  const handleSubmitPost = () => {
    const { data, error } = await supabase
    .from("messages")
    .insert([
      {}
    ])
  }

  return (
    // <Flex flexDirection="column" border="1px">
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      border="1px"
      borderColor="lightgrey"
      maxHeight={{ base: '20em', lg: '30em' }}
      minHeight={{ base: '20em', lg: '30em' }}
      p={'10'}
      marginTop={{ base: '4', lg: '4' }}
      borderRadius={'4px'}
      backgroundColor={'white'}
      overflowY="scroll"
    >
      <Container justifyContent="center">
        <Heading>{`#${currentFeedTitle}`}</Heading>
        <VStack>
          {filteredPosts.map(post => {
            return <Button value={post.id}>{post.content}</Button>;
          })}
        </VStack>
      </Container>

      <Container>
        {isLoggedIn === true && (
          <>
            <Box
              as="button"
              onClick={onOpen}
              bgGradient={
                'linear(to-r, rgba(34,193,195,1) 0%, rgba(253,187,45,1))'
              }
              lineHeight="1.2"
              transition="all .3s cubic-bezier(.08, .52, .52, 1)"
              height="50px"
              borderRadius="6px"
              _hover={{
                bgGradient:
                  'linear(to-b, rgba(38,209,212,1) 0%, rgba(253,247,45,1)',
              }}
              _active={{
                bgGradient:
                  'linear(to-b, rgba(38,209,212,1) 0%, rgba(253,247,45,1)',
                transform: 'scale(0.98)',
              }}
            >
              <Container
                display="flex"
                alignItems="center"
                justifyContent="center"
                paddingBottom=".75px"
              >
                <EditIcon fontWeight="light" display="inline-block" />
              </Container>
            </Box>
            <Container>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Let Your Voice Be Heard...</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Textarea
                      minWidth="95%"
                      marginLeft="2"
                      type="text"
                      size="lg"
                      width="auto"
                    />
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="teal">Submit Post</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Container>
          </>
        )}
      </Container>
    </Box>

    // </Flex>
  );
};
