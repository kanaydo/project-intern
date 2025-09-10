'use server'

import { revalidatePath } from "next/cache";


export const destroyTask = async (id: string) => {
  const response= await fetch(`https://68bfde830b196b9ce1c249b2.mockapi.io/api/v1/tasks/${id}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    revalidatePath('/tasks')
    return {success: true, message: 'Berhasil Hapus Data'}
  } else {
    return {success: false, data: 'Gagal Hapus Data'}
  }
}