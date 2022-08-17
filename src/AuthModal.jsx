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
} from '@chakra-ui/react';
import { Route, Link } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';

export const AuthModal = ({ isOpen, onClose }) => {
  const { onLogin } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
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
              No Account? Register
              <Link color="teal" to="/register">
                {' '}
                here
              </Link>
            </Text>
            <Button
              marginX="2"
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
