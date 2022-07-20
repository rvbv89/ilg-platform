import React, { useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Link,
} from '@chakra-ui/react';
import { Route } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';


export const AuthModal = ({ isOpen, onClose }) => {
  const { onLogin } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  // const { user } = useHandleLoginPMutation('garzotto5389@gmail.com', 'password')

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please Sign In To Your Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input id="email" type="email" ref={emailRef} />
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input id="password" type="password" ref={passwordRef} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Text>
              No Account? Register <Link href="/register">here</Link>
            </Text>
            <Button
              colorScheme="teal"
              onClick={() => {
                onLogin(emailRef.current?.value, passwordRef.current?.value);
                onClose();
              }}
            >
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};