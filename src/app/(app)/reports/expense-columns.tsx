
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react"
import { format } from "date-fns"

type Expense = {
    id: string;
    kategori: string;
    deskripsi: string;
    jumlah: number;
    tanggal: string;
    created_by: string;
}

type ExpenseColumnsProps = {
    onEdit: (expense: Expense) => void;
    onDelete: (id: string) => void;
}

const toRupiah = (num: number) => `Rp ${num.toLocaleString('id-ID')}`;

export const expenseColumns = ({ onEdit, onDelete }: ExpenseColumnsProps): ColumnDef<Expense>[] => [
    {
        accessorKey: "tanggal",
        header: "Tanggal",
        cell: ({ row }) => format(new Date(row.getValue("tanggal")), 'dd MMM yyyy')
    },
    {
        accessorKey: "kategori",
        header: "Kategori",
    },
    {
        accessorKey: "deskripsi",
        header: "Deskripsi",
    },
    {
        accessorKey: "jumlah",
        header: () => <div className="text-right">Jumlah</div>,
        cell: ({ row }) => <div className="text-right">{toRupiah(row.getValue("jumlah"))}</div>,
    },
    {
        accessorKey: "created_by",
        header: "Dibuat oleh",
    },
    {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => {
            const expense = row.original
            return (
                <div className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(expense)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(expense.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
            )
        }
    }
]
