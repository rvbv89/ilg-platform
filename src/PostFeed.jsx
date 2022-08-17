import React, { useState, useEffect, useRef } from 'react';
import {
  Flex,
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Spacer,
  Button,
  Container,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
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

  // const [render, setRender] = useState(false);

  //local state to render posts based on current feed
  const [filteredPosts, setFilteredPosts] = useState([]);

  //local state for user post input value
  const [value, setValue] = useState('');

  //Post submission modal props
  const { isOpen, onOpen, onClose } = useDisclosure();

  //refs for post input modal focus
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  useEffect(() => {
    console.log(user);
  }, []);

  //effect to set the current feed and posts displayed based on
  //posts available in redux store
  useEffect(() => {
    if (posts === []) {
      console.log('posts empty');
    } else {
      // let currentTitle = currentFeedTitle;
      let filteredPostArr = posts.filter(
        post => post.feed === currentFeedTitle
      );
      setFilteredPosts(filteredPostArr);
      console.log(filteredPosts);
    }
  }, [posts, currentFeedTitle]);

  //capture user input to send to local state
  const handleInputChange = e => {
    let value = e.target.value;
    setValue(value);
  };

  //add user submitted post to supabase table
  const handleSubmitPost = async () => {
    const { data, error } = await supabase.from('messages').insert([
      {
        user_id: user.id,
        username: user.user_metadata.username,
        content: value,
        feed: currentFeedTitle,
      },
    ]);
    setValue('');
    onClose();
  };

  // useEffect(() => {
  //   setRender(!render);
  // }, [filteredPosts]);

  return (
    // <Flex flexDirection="column" border="1px">
    <Box
      boxSizing="border-box"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      borderColor="lightgrey"
      maxHeight={{ base: '30em', lg: '30em' }}
      minHeight={{ base: '20em', lg: '30em' }}
      maxWidth={'100%'}
      marginTop={{ base: '4', lg: '4' }}
      borderRadius={'4px'}
      backgroundColor={'white'}
      overflowY="hidden"
    >
      <Heading paddingBottom="4">{`#${currentFeedTitle}`}</Heading>
      <Container
        justifyContent="center"
        overflowY={'auto'}
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
        {/* <Heading paddingBottom="4">{`#${currentFeedTitle}`}</Heading> */}
        <VStack>
          {filteredPosts &&
            filteredPosts.map(post => {
              return (
                <Box
                  value={post.id}
                  backgroundColor="lightblue"
                  borderRadius="6px"
                  padding={['0.5', '4', '4', '4']}
                  margin="4"
                  maxWidth="100%"
                >
                  <div style={{ color: 'slategrey', fontSize: 15 }}>
                    <span paddingBottom="2">
                      Posted by
                      <span style={{ fontWeight: 'bold' }}>
                        {' '}
                        {post.username}{' '}
                      </span>
                      on
                      <span style={{ fontWeight: 'bold' }}>
                        {' '}
                        {dayjs(post.created_at).toString()}
                      </span>
                    </span>
                  </div>

                  <p style={{ color: 'black', fontSize: 20, paddingTop: 4 }}>
                    {post.content}
                  </p>
                </Box>
              );
            })}
        </VStack>
      </Container>

      <Container paddingTop="6">
        {isLoggedIn === true && (
          <>
            <Box
              as="button"
              onClick={onOpen}
              colorScheme={'teal'}
              lineHeight="1.2"
              transition="all .3s cubic-bezier(.08, .52, .52, 1)"
              height="50px"
              borderRadius="6px"
            >
              <Container
                display="flex"
                alignItems="center"
                justifyContent="center"
                paddingBottom=".75px"
              >
                <EditIcon
                  boxSize="10"
                  fontWeight="light"
                  display="inline-block"
                />
              </Container>
            </Box>
            <Container>
              <Modal
                isOpen={isOpen}
                onClose={onClose}
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
              >
                <ModalOverlay />
                <ModalContent minWidth={['250px', '250px', '700px', '900px']}>
                  <ModalHeader>New Post</ModalHeader>
                  <ModalCloseButton />
                  <form>
                    <FormControl>
                      <ModalBody>
                        <HStack>
                          <FormLabel>Let Your Voice Be Heard...</FormLabel>
                          {/* <div style={{marginLeft:"10em"}}></div> */}
                        </HStack>

                        <Textarea
                          ref={initialRef}
                          value={value}
                          onChange={handleInputChange}
                          minWidth="95%"
                          marginLeft="2"
                          type="text"
                          size="lg"
                          width="auto"
                          minHeight={['auto', 'auto', '300px']}
                        />
                      </ModalBody>

                      <ModalFooter>
                        <Button marginX="2">
                          {' '}
                          <i class="fa-solid fa-image"></i>
                        </Button>
                        <Button marginX="2">
                        <i class="fa-brands fa-youtube"></i>
                        </Button>

                        <Button
                          type="submit"
                          onClick={e => {
                            console.log('click sub');
                            e.preventDefault();
                            handleSubmitPost();
                          }}
                          colorScheme="teal"
                        >
                          Submit Post
                        </Button>
                      </ModalFooter>
                    </FormControl>
                  </form>
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
