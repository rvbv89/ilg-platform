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
import postsSlice, { addAllPosts, addNewPost } from './redux/postsSlice';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { supabase } from './supabase/init';
import dayjs, { Dayjs } from 'dayjs';

export const PostFeed = () => {
  const dispatch = useDispatch();
  //define vars for redux state

  let currentFeedTitle = useSelector(state => state.posts.currentFeed);
  let posts = useSelector(state => state.posts.allPosts);
  let user = useSelector(state => state.users.currentUser);
  let isLoggedIn = useSelector(state => state.users.isLoggedIn);

  const [render, setRender] = useState(false);

  //local state to render posts based on current feed
  const [filteredPosts, setFilteredPosts] = useState([]);

  //local state for user post input value
  const [value, setValue] = useState('');

  //Post submission modal props
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log(user);
  }, []);

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
  }, [posts, currentFeedTitle]);

  //capture user input to send to local state
  const handleInputChange = e => {
    let value = e.target.value;
    setValue(value);
  };

  //add user submitted post to supabase table !!TODO!!
  const handleSubmitPost = async () => {
    const { data, error } = await supabase.from('messages').insert([
      {
        user_id: user.id,
        username: user.user_metadata.username,
        content: value,
        feed: currentFeedTitle.toLowerCase(),
      },
    ]);
    // dispatch(addNewPost(data));
    onClose();
  };

  // useEffect(() => {
  //   const postsListener = supabase
  //     .from('messages')
  //     .on('*', payload => {
  //       const newMessage = payload.new;
  //       dispatch(add(newMessage));
  //     })
  //     .subscribe();

  //   return () => {
  //     supabase.removeSubscription(postsListener);

  //   };
  // }, [currentFeedTitle]);

  // useEffect(()=>{
  //   setRender(!render)
  // },[filteredPosts])

  return (
    // <Flex flexDirection="column" border="1px">
    <Box
      boxSizing="border-box"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      border="1px"
      borderColor="lightgrey"
      maxHeight={{ base: '20em', lg: '30em' }}
      minHeight={{ base: '20em', lg: '30em' }}
      maxWidth={'100%'}
      paddingY="10"
      marginTop={{ base: '4', lg: '4' }}
      borderRadius={'4px'}
      backgroundColor={'white'}
      overflowY="hidden"
    >
      <Container justifyContent="center" overflowY={'scroll'}>
        <Heading paddingBottom="4">{`#${currentFeedTitle}`}</Heading>
        <VStack>
          {filteredPosts.map(post => {
            return (
              <Box
                value={post.id}
                backgroundColor="lightblue"
                borderRadius="6px"
                padding="4"
              >
                <span>
                  Posted by{' '}
                  <span style={{fontWeight: "bold"}}>{user.user_metadata.username} </span>
                  on 
                  <span style={{fontWeight: "bold"}}> {dayjs(post.created_at).toString()}</span>
                </span>
                <p>{post.content}</p>
              </Box>
            );
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
                      value={value}
                      onChange={handleInputChange}
                      minWidth="95%"
                      marginLeft="2"
                      type="text"
                      size="lg"
                      width="auto"
                    />
                  </ModalBody>

                  <ModalFooter>
                    <Button onClick={handleSubmitPost} colorScheme="teal">
                      Submit Post
                    </Button>
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
