
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { menuItems } from "@/lib/data";
import { PlusCircle, Coffee, Utensils, BookOpen, Archive } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function StatCard({ title, value, icon: Icon, description, color }: { title: string, value: string, icon: React.ElementType, description: string, color: string }) {
  return (
    <Card className={cn("relative overflow-hidden", color)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-white/80" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-white/70">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function MenuPage() {
  const totalMenu = menuItems.length;
  const totalCoffee = menuItems.filter(item => item.category === 'Coffee').length;
  const totalFoodAndSnack = menuItems.filter(item => item.category === 'Pastry' || item.category === 'Tea').length;
  // Assuming total stock is the sum of all available items for now
  const totalStock = menuItems.filter(item => item.isAvailable).length;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-headline font-bold tracking-tight">Menu Management</h1>
          <p className="text-muted-foreground">Add, edit, and manage your coffee shop's menu.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Menu" value={totalMenu.toString()} icon={BookOpen} description="All items on your menu." color="bg-blue-500 text-white" />
        <StatCard title="Coffee" value={totalCoffee.toString()} icon={Coffee} description="Number of coffee varieties." color="bg-amber-600 text-white" />
        <StatCard title="Food & Snack" value={totalFoodAndSnack.toString()} icon={Utensils} description="Pastries and other snacks." color="bg-green-500 text-white" />
        <StatCard title="Total Stock" value={totalStock.toString()} icon={Archive} description="Items currently available." color="bg-slate-700 text-white" />
      </div>
      
      <Tabs defaultValue="menu">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="stock">Stock</TabsTrigger>
          <TabsTrigger value="discount">Discount</TabsTrigger>
          <TabsTrigger value="category">Category</TabsTrigger>
          <TabsTrigger value="additional">Additional</TabsTrigger>
          <TabsTrigger value="bestseller">Best Seller</TabsTrigger>
        </TabsList>
        <TabsContent value="menu">
          <DataTable columns={columns} data={menuItems} />
        </TabsContent>
        <TabsContent value="stock">
          <Card>
            <CardHeader>
              <CardTitle>Stock Management</CardTitle>
              <CardDescription>Manage stock levels for your items.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Stock management CRUD will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="discount">
          <Card>
            <CardHeader>
              <CardTitle>Discount Management</CardTitle>
              <CardDescription>Create and manage discounts.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Discount management CRUD will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="category">
          <Card>
            <CardHeader>
              <CardTitle>Category Management</CardTitle>
              <CardDescription>Manage menu categories.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Category management CRUD will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="additional">
          <Card>
            <CardHeader>
              <CardTitle>Additional Items Management</CardTitle>
              <CardDescription>Manage add-ons and extras.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Additional items management CRUD will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bestseller">
          <Card>
            <CardHeader>
              <CardTitle>Best Seller Management</CardTitle>
              <CardDescription>Manage your best-selling items.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Best seller management CRUD will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
