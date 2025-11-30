
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
  DialogDescription,
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
import { MenuItem } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const formSchema = z.object({
  stok: z.coerce.number().min(0, 'Stok harus angka non-negatif'),
});

type StockFormValues = z.infer<typeof formSchema>;

interface StockFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  menuItem: MenuItem | null;
}

export function StockForm({
  isOpen,
  onClose,
  onSuccess,
  menuItem,
}: StockFormProps) {
  const { toast } = useToast();
  const form = useForm<StockFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stok: 0,
    },
  });

  useEffect(() => {
    if (menuItem) {
      form.reset({
        stok: (menuItem as any).stok || 0,
      });
    }
  }, [menuItem, form]);

  const onSubmit = async (values: StockFormValues) => {
    if (!menuItem) return;

    try {
      const formData = new FormData();
      formData.append('nama', menuItem.nama);
      formData.append('kategori_id', String(menuItem.kategori_id));
      formData.append('harga', String(menuItem.harga));
      formData.append('stok', String(values.stok));
      formData.append('is_available', values.stok > 0 ? '1' : '0');
      formData.append('is_recommendation', menuItem.is_recommendation ? '1' : '0');
      formData.append('description', menuItem.description || '');
      formData.append('_method', 'PUT');


      const response = await fetch(`https://api.sejadikopi.com/api/menu/${menuItem.id}`, {
        method: 'POST', // Using POST with _method override
        body: formData,
      });

      if (!response.ok) {
        console.error("Gagal memperbarui stok:", await response.json());
        throw new Error('Gagal memperbarui stok.');
      }

      toast({
        title: 'Sukses',
        description: `Stok untuk ${menuItem.nama} telah diperbarui.`,
      });
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Tidak dapat memperbarui stok.',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Perbarui Stok</DialogTitle>
          <DialogDescription>
            Perbarui jumlah stok untuk {menuItem?.nama}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="stok"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah Stok Baru</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit">Simpan Stok</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
