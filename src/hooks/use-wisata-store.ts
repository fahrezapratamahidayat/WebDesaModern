import { GambarWisataGaleri, WisataDesa } from '@prisma/client'
import { create } from 'zustand'

export interface WisataDesaWithGambar extends WisataDesa {
    GambarWisataGaleri: GambarWisataGaleri[];
}

type UMKMStoreState = {
    editingWisata: WisataDesaWithGambar | null;
    deletingWisata: WisataDesaWithGambar | null;
    formMode: 'create' | 'update' | 'delete';
    isDialogOpen: boolean;
    seteditingWisata: (umkm: WisataDesaWithGambar) => void;
    openCreateDialog: () => void;
    openDeleteDialog: (umkm: WisataDesaWithGambar) => void;
    resetForm: () => void;
    closeDialog: () => void;
};

export const useWisataStore = create<UMKMStoreState>((set) => ({
    editingWisata: null,
    deletingWisata: null,
    formMode: 'create',
    isDialogOpen: false,
    seteditingWisata: (umkm: WisataDesaWithGambar) => set({ editingWisata: umkm, formMode: 'update', isDialogOpen: true }),
    openCreateDialog: () => set({ editingWisata: null, formMode: 'create', isDialogOpen: true }),
    openDeleteDialog: (umkm: WisataDesaWithGambar) => set({ deletingWisata: umkm, formMode: 'delete', isDialogOpen: true }),
    resetForm: () => set({ editingWisata: null, formMode: 'create' }),
    closeDialog: () => set({ isDialogOpen: false, editingWisata: null, formMode: 'create' }),
}));