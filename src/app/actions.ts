'use server';

import { turso } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addGuestbookEntry(formData: FormData) {
  const author = formData.get('author') as string;
  const icon = formData.get('icon') as string;
  const message = formData.get('message') as string;
  
  if (!author || !message) return;

  await turso.execute({
    sql: 'INSERT INTO guestbook (author, icon, message) VALUES (?, ?, ?)',
    args: [author, icon || '/cat.png', message]
  });
  
  revalidatePath('/');
}

export async function deleteGuestbookEntry(formData: FormData) {
  const id = formData.get('id');
  if (!id) return;
  
  await turso.execute({
    sql: 'DELETE FROM guestbook WHERE id = ?',
    args: [Number(id)]
  });
  
  revalidatePath('/');
}
