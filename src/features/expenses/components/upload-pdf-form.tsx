'use client';

import { useState } from 'react';

import {
    ModalBody,
    ModalFooter,
    Button,
    Spinner,
    addToast,
} from '@heroui/react';
import { AlertCircleIcon, ImageUpIcon, XIcon } from 'lucide-react';

import { useFileUpload } from '../hooks/use-file-upload';
import { useUploadPdfModal } from '../hooks/use-upload-pdf-modal';

const maxSizeMB = 5;
const maxSize = maxSizeMB * 1024 * 1024; // 5MB default

interface UploadPdfFormProps {}

export function UploadPdfForm({}: UploadPdfFormProps) {
    const [isPending, setIsPending] = useState(false);
    const { onClose } = useUploadPdfModal();

    const [
        { files, isDragging, errors },
        {
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            removeFile,
            getInputProps,
        },
    ] = useFileUpload({
        accept: 'application/pdf',
        maxSize,
    });

    const previewUrl = files[0]?.preview || null;

    const onUploadFile = () => {
        setIsPending(true);
        const formData = new FormData();

        const invoice = files[0].file as File;

        formData.append('invoice', invoice);

        const uploadInvoicePromise = new Promise<void>((resolve, reject) => {
            fetch('/api/ai/invoices/upload', {
                method: 'POST',
                body: formData,
            })
                .then(() => {
                    addToast({
                        title: 'Arquivo importado com sucesso!',
                        description: 'Gastos estão disponíveis no sistema',
                        variant: 'solid',
                        color: 'success',
                    });

                    setIsPending(false);

                    resolve();
                })
                .catch(() => {
                    addToast({
                        title: 'Falha ao importar arquivo',
                        description: 'Por favor, tente novamente',
                        variant: 'solid',
                        color: 'danger',
                    });

                    setIsPending(false);

                    reject();
                });
        });

        addToast({
            title: 'Processando arquivo',
            description: 'Importando fatura, aguarde',
            variant: 'solid',
            color: 'primary',
            promise: uploadInvoicePromise,
        });
    };

    return (
        <>
            <ModalBody>
                <div className="flex flex-col gap-2">
                    <div className="relative">
                        {/* Drop area */}
                        <div
                            role="button"
                            onClick={openFileDialog}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            data-dragging={isDragging || undefined}
                            className="border-neutral-500 hover:bg-neutral-600/10 data-[dragging=true]:bg-bg-neutral-600/30 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[span]:border-none has-[input:focus]:ring-[3px]"
                        >
                            <input
                                {...getInputProps()}
                                className="sr-only"
                                aria-label="Upload file"
                            />
                            {previewUrl ? (
                                <div className="grid place-items-center">
                                    <span>
                                        {files[0]?.file?.name ||
                                            'Uploaded image'}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                                    <div
                                        className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                                        aria-hidden="true"
                                    >
                                        <ImageUpIcon className="size-4 opacity-60" />
                                    </div>
                                    <p className="mb-1.5 text-sm font-medium">
                                        Arraste o arquivo aqui ou clique para
                                        procurar
                                    </p>
                                    <p className="text-muted-foreground text-xs">
                                        Tamanho máximo: {maxSizeMB}MB
                                    </p>
                                </div>
                            )}
                        </div>
                        {previewUrl && (
                            <div className="absolute top-4 right-4">
                                <button
                                    type="button"
                                    className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                                    onClick={() => removeFile(files[0]?.id)}
                                    aria-label="Remove image"
                                >
                                    <XIcon
                                        className="size-4"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        )}
                    </div>

                    {errors.length > 0 && (
                        <div
                            className="text-destructive flex items-center gap-1 text-xs"
                            role="alert"
                        >
                            <AlertCircleIcon className="size-3 shrink-0" />
                            <span>{errors[0]}</span>
                        </div>
                    )}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    Fechar
                </Button>
                <Button
                    isLoading={isPending}
                    color="primary"
                    onPress={onUploadFile}
                    spinner={<Spinner size="sm" color="success" />}
                >
                    Importar
                </Button>
            </ModalFooter>
        </>
    );
}
