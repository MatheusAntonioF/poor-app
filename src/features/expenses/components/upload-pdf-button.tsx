'use client';

import { Button, Link } from '@heroui/react';
import { useUploadPdfModal } from '../hooks/use-upload-pdf-modal';

export function ImportPDFButton() {
    const { onOpen } = useUploadPdfModal();

    return (
        <Button
            as={Link}
            color="primary"
            href="#"
            variant="flat"
            onPress={onOpen}
        >
            Importar dados
        </Button>
    );
}
