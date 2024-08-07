import { GambarUMKM, UMKM } from '@prisma/client'
import { create } from 'zustand'


interface UMKMWithGambar extends UMKM {
    GambarUMKM: GambarUMKM[];
}

type UMKMStoreState = {
    editingUMKM: UMKMWithGambar | null;
    formMode: 'create' | 'update';
    isDialogOpen: boolean;
    setEditingUMKM: (umkm: UMKMWithGambar) => void;
    openCreateDialog: () => void;
    resetForm: () => void;
    closeDialog: () => void;
};

export const useUMKMStore = create<UMKMStoreState>((set) => ({
    editingUMKM: null,
    formMode: 'create',
    isDialogOpen: false,
    setEditingUMKM: (umkm: UMKMWithGambar) => set({ editingUMKM: umkm, formMode: 'update', isDialogOpen: true }),
    openCreateDialog: () => set({ editingUMKM: null, formMode: 'create', isDialogOpen: true }),
    resetForm: () => set({ editingUMKM: null, formMode: 'create' }),
    closeDialog: () => set({ isDialogOpen: false, editingUMKM: null, formMode: 'create' }),
}));