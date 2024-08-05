'use server'
import axios from "axios"
import UMKMCard from "../components/card/umkm-card"
import { Key } from "lucide-react";
export const getUmkm = async (page?: number, params?: string) => {
    const res = await axios.get("http://localhost:3000/api/umkm")
    return res.data.data.map((item: any, index: number) => (
        <UMKMCard key= { item.id } {...item } />
  ));
};