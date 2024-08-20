import useSWR from 'swr';
import axios from 'axios';
import { toast } from 'sonner';
import { WisataDesaWithGambar } from './use-wisata-store';


const fetcher = (url: string) => axios.get(url).then(res => res.data.data);

export function useWisataCRUD() {
  const { data, error, mutate } = useSWR<WisataDesaWithGambar[]>('/api/wisata', fetcher);

  const createWisata = async (formData: FormData) => {
    try {
      await axios.post('/api/wisata', formData);
      toast.success('Wisata berhasil dibuat');
      mutate();
    } catch (error) {
      toast.error('Gagal membuat Wisata');
    }
  };

  const updateWisata = async (id: string, formData: FormData) => {
    try {
      await axios.put(`/api/wisata?id=${id}`, formData);
      toast.success('Wisata berhasil diperbarui');
      mutate();
    } catch (error) {
      toast.error('Gagal memperbarui Wisata');
    }
  };

  const deleteWisata = async (id: string) => {
    try {
      await axios.delete(`/api/wisata?id=${id}`);
      toast.success('Wisata berhasil dihapus');
      mutate();
    } catch (error) {
      toast.error('Gagal menghapus Wisata');
    }
  };

  return {
    wisata: data,
    isLoading: !error && !data,
    isError: error,
    createWisata,
    updateWisata,
    deleteWisata,
    mutate,
  };
}