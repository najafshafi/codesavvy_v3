import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { Link } from 'react-router-dom';

const Enrollment = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = React.useState('opaque');

    const handleOpen = (backdrop) => {
        setBackdrop(backdrop);
        onOpen();
    };

    return (
        <>
            <Button onClick={() => handleOpen('blur')}>
                {children}
            </Button>
            <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Enrollment</ModalHeader>
                            <ModalBody>
                                <p> Ready to take your coding skills to the next level? Whether you're a beginner or looking to enhance your programming knowledge, our coding courses offer the perfect opportunity to learn at your own pace and unlock new career possibilities. </p> <p> Our curriculum is designed to guide you through every stage of learning, from the basics to advanced techniques. You'll gain hands-on experience with real-world projects, develop critical problem-solving skills, and become proficient in the most in-demand programming languages. </p> <p> Join our growing community of learners and get started today! Our expert instructors are here to support you every step of the way. Don't miss out on the chance to improve your coding abilities and open the door to exciting new opportunities. </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    <Link className="nav-link" to="/learning">
                                        Enroll
                                    </Link>

                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default Enrollment;
