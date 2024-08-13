import { GambarUMKM, UMKM } from '@prisma/client'
import { create } from 'zustand'

interface UMKMWithGambar extends UMKM {
    GambarUMKM: GambarUMKM[];
}

type UMKMStoreState = {
    editingUMKM: UMKMWithGambar | null;
    deletingUMKM: UMKMWithGambar | null;
    formMode: 'create' | 'update' | 'delete';
    isDialogOpen: boolean;
    setEditingUMKM: (umkm: UMKMWithGambar) => void;
    openCreateDialog: () => void;
    openDeleteDialog: (umkm: UMKMWithGambar) => void;
    resetForm: () => void;
    closeDialog: () => void;
};

export const useUMKMStore = create<UMKMStoreState>((set) => ({
    editingUMKM: null,
    deletingUMKM: null,
    formMode: 'create',
    isDialogOpen: false,
    setEditingUMKM: (umkm: UMKMWithGambar) => set({ editingUMKM: umkm, formMode: 'update', isDialogOpen: true }),
    openCreateDialog: () => set({ editingUMKM: null, formMode: 'create', isDialogOpen: true }),
    openDeleteDialog: (umkm: UMKMWithGambar) => set({ deletingUMKM: umkm, formMode: 'delete', isDialogOpen: true }),
    resetForm: () => set({ editingUMKM: null, formMode: 'create' }),
    closeDialog: () => set({ isDialogOpen: false, editingUMKM: null, formMode: 'create' }),
}));