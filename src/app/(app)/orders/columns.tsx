
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Order } from "@/lib/data"

const statusVariant: { [key in Order['status']]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  Pending: 'secondary',
  Processing: 'default',
  Completed: 'outline',
  Cancelled: 'destructive',
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID Pesanan",
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pelanggan / Meja
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
     cell: ({ row }) => {
      const order = row.original;
      const displayValue = order.orderType === 'Dine In' ? order.tableName : order.customerName;
      return <div className="pl-4 font-medium">{displayValue}</div>
     }
  },
  {
    accessorKey: "orderType",
    header: "Tipe",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Order['status']
      return <Badge variant={statusVariant[status]}>{status}</Badge>
    }
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const total = parseFloat(row.getValue("total"))
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(total)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
   {
    accessorKey: "createdAt",
    header: "Tanggal",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return <div>{date.toLocaleDateString()}</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.id.toString())}
            >
              Salin ID Pesanan
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Lihat detail</DropdownMenuItem>
            <DropdownMenuItem>Perbarui status</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Batalkan pesanan</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
