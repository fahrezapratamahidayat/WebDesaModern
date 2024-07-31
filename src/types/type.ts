export interface ArtikelDesa {
  id: number;
  judul: string;
  kategori: string;
  tanggal: string | Date;
  penulis: {
    id: number
    nama: string
  }
}