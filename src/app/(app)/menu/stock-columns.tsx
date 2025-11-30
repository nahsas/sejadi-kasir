
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Pencil, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MenuItem } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

type StockColumnsProps = {
  onEdit: (menuItem: MenuItem) => void;
  onUpdateSuccess: () => void;
}

export const columns = ({ onEdit, onUpdateSuccess }: StockColumnsProps): ColumnDef<MenuItem>[] => {
  const { toast } = useToast();

  const handleMarkAsSold = async (menuItem: MenuItem) => {
    try {
      const fullMenuItemData = {
        ...menuItem,
        stok: 0,
        is_available: false,
        harga: Number(menuItem.harga)
      };

      const response = await fetch(`https://api.sejadikopi.com/api/menu/${menuItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullMenuItemData),
      });

      if (!response.ok) {
        throw new Error('Gagal menandai sebagai habis.');
      }

      toast({
        title: 'Sukses',
        description: `${menuItem.nama} telah ditandai sebagai habis.`,
      });
      onUpdateSuccess();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Tidak dapat memperbarui stok.',
      });
    }
  }
  
  return [
    {
      accessorKey: "nama",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="pl-4">{row.getValue("nama")}</div>
    },
    {
      accessorKey: "kategori",
      header: "Kategori",
      cell: ({ row }) => {
        const menuItem = row.original as any;
        return menuItem.kategori ? menuItem.kategori.nama : 'N/A';
      }
    },
    {
      accessorKey: "stok",
      header: () => <div className="text-right">Stok</div>,
      cell: ({ row }) => {
        const stock = row.getValue("stok") as number;
        return <div className="text-right font-medium">{stock}</div>
      },
    },
    {
        accessorKey: "is_available",
        header: "Ketersediaan",
        cell: ({ row }) => {
          const stock = row.original.stok as number;
          const isAvailable = stock > 0;
          return <Badge variant={isAvailable ? "outline" : "secondary"}>{isAvailable ? "Tersedia" : "Habis"}</Badge>
        }
      },
    {
      id: "actions",
      cell: ({ row }) => {
        const menuItem = row.original
        return (
            <AlertDialog>
              <div className="text-right space-x-2">
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" disabled={menuItem.stok === 0}>
                      <XCircle className="mr-2 h-4 w-4" />
                      Tandai Habis
                    </Button>
                  </AlertDialogTrigger>
                  <Button onClick={() => onEdit(menuItem)} size="sm">
                    <Pencil className="mr-2 h-4 w-4" />
                    Perbarui Stok
                  </Button>
              </div>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Ini akan mengatur stok untuk "{menuItem.nama}" menjadi 0. Tindakan ini dapat dibatalkan dengan memperbarui stok secara manual.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleMarkAsSold(menuItem)}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Ya, Tandai Habis
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        )
      },
    },
  ]
}
