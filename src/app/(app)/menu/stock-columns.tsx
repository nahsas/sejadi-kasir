
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MenuItem } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

type StockColumnsProps = {
  onEdit: (menuItem: MenuItem) => void;
}

export const columns = ({ onEdit }: StockColumnsProps): ColumnDef<MenuItem>[] => {
  return [
    {
      accessorKey: "nama",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="pl-4">{row.getValue("nama")}</div>
    },
    {
      accessorKey: "kategori",
      header: "Category",
      cell: ({ row }) => {
        const menuItem = row.original as any;
        return menuItem.kategori ? menuItem.kategori.nama : 'N/A';
      }
    },
    {
      accessorKey: "stok",
      header: () => <div className="text-right">Stock</div>,
      cell: ({ row }) => {
        const stock = row.getValue("stok") as number;
        return <div className="text-right font-medium">{stock}</div>
      },
    },
    {
        accessorKey: "is_available",
        header: "Availability",
        cell: ({ row }) => {
          const stock = row.original.stok as number;
          const isAvailable = stock > 0;
          return <Badge variant={isAvailable ? "outline" : "secondary"}>{isAvailable ? "Available" : "Sold Out"}</Badge>
        }
      },
    {
      id: "actions",
      cell: ({ row }) => {
        const menuItem = row.original
        return (
            <div className="text-right">
                <Button onClick={() => onEdit(menuItem)} size="sm">
                  <Pencil className="mr-2 h-4 w-4" />
                  Update Stock
                </Button>
            </div>
        )
      },
    },
  ]
}
