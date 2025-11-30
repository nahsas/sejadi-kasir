
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
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MenuItem } from '@/lib/data';
import { Category } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const formSchema = z.object({
  nama: z.string().min(1, 'Nama wajib diisi'),
  kategori_id: z.coerce.number().min(1, 'Kategori wajib diisi'),
  harga: z.coerce.number().min(0, 'Harga harus angka positif'),
  stok: z.coerce.number().min(0, 'Stok harus angka positif'),
  description: z.string().optional(),
  is_available: z.boolean(),
  is_recommendation: z.boolean(),
});

type MenuFormValues = z.infer<typeof formSchema>;

interface MenuFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  menuItem: MenuItem | null;
  categories: Category[];
}

export function MenuForm({
  isOpen,
  onClose,
  onSuccess,
  menuItem,
  categories,
}: MenuFormProps) {
  const { toast } = useToast();
  const form = useForm<MenuFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: '',
      kategori_id: undefined,
      harga: 0,
      stok: 0,
      description: '',
      is_available: true,
      is_recommendation: false,
    },
  });
  
  useEffect(() => {
    if (menuItem) {
      form.reset({
        nama: menuItem.nama,
        kategori_id: menuItem.kategori_id,
        harga: Number(menuItem.harga),
        stok: (menuItem as any).stok || 0,
        description: menuItem.description || '',
        is_available: menuItem.is_available,
        is_recommendation: menuItem.is_recommendation,
      });
    } else {
       form.reset({
        nama: '',
        kategori_id: undefined,
        harga: 0,
        stok: 0,
        description: '',
        is_available: true,
        is_recommendation: false,
      });
    }
  }, [menuItem, form]);

  const onSubmit = async (values: MenuFormValues) => {
    try {
      const method = menuItem ? 'PUT' : 'POST';
      const url = menuItem
        ? `https://api.sejadikopi.com/api/menu/${menuItem.id}`
        : 'https://api.sejadikopi.com/api/menu';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Gagal menyimpan item menu.');

      toast({
        title: 'Sukses',
        description: `Item menu berhasil ${menuItem ? 'diperbarui' : 'dibuat'}.`,
      });
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Tidak dapat menyimpan item menu.',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{menuItem ? 'Ubah Menu' : 'Buat Menu'}</DialogTitle>
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
                    <Input placeholder="cth. Espresso" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kategori_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={String(cat.id)}>
                          {cat.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="harga"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Harga</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="stok"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Stok</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Jelaskan item..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-4">
                <FormField
                control={form.control}
                name="is_available"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <FormLabel>Tersedia</FormLabel>
                    </div>
                    <FormControl>
                        <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="is_recommendation"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <FormLabel>Direkomendasikan</FormLabel>
                    </div>
                    <FormControl>
                        <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
            </div>
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
