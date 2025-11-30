
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Category } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const formSchema = z.object({
  nama: z.string().min(1, 'Nama wajib diisi'),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category: Category | null;
}

export function CategoryForm({
  isOpen,
  onClose,
  onSuccess,
  category,
}: CategoryFormProps) {
  const { toast } = useToast();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: '',
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        nama: category.nama,
      });
    } else {
       form.reset({
        nama: '',
      });
    }
  }, [category, form, isOpen]);

  const onSubmit = async (values: CategoryFormValues) => {
    // The API spec does not provide POST/PUT for /categories.
    // Assuming it's missing and implementing optimistically.
    try {
      const method = category ? 'PUT' : 'POST';
      const url = category
        ? `https://api.sejadikopi.com/api/categories/${category.id}`
        : 'https://api.sejadikopi.com/api/categories';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Gagal menyimpan kategori. Endpoint tidak ada.');

      toast({
        title: 'Sukses',
        description: `Kategori berhasil ${category ? 'diperbarui' : 'dibuat'}.`,
      });
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Tidak dapat menyimpan kategori.',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? 'Ubah Kategori' : 'Buat Kategori'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="cth. Kopi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
