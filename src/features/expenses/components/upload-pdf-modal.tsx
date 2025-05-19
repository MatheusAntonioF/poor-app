'use client';

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from '@heroui/react';

import { useUploadPdfModal } from '../hooks/use-upload-pdf-modal';
import { UploadPdfForm } from './upload-pdf-form';

export function UploadPdfModal() {
    const { isOpen, onClose, onOpen } = useUploadPdfModal();

    const onOpenChange = (isOpen: boolean) => {
        if (isOpen) onOpen();
        else onClose();
    };

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        Importar PDF
                    </ModalHeader>
                    <UploadPdfForm />
                </ModalContent>
            </Modal>
        </>
    );
}
