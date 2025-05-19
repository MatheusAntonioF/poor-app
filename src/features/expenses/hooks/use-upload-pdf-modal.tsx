import { create } from 'zustand';

interface UseImportPdfModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useUploadPdfModal = create<UseImportPdfModalStore>(set => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
