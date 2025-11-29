
"use client"

import * as React from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { orders, Order } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon, Download } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// Helper to aggregate data client-side
const aggregateSalesData = (startDate?: Date, endDate?: Date, paymentMethod?: string) => {
  const salesByDate = orders
    .filter(o => o.status === 'Completed')
    .filter(o => {
      const orderDate = new Date(o.createdAt);
      const start = startDate ? new Date(startDate.setHours(0, 0, 0, 0)) : null;
      const end = endDate ? new Date(endDate.setHours(23, 59, 59, 999)) : null;
      if (start && orderDate < start) return false;
      if (end && orderDate > end) return false;
      if (paymentMethod && paymentMethod !== 'All' && o.paymentMethod !== paymentMethod) return false;
      return true;
    })
    .reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString('en-CA'); // Use YYYY-MM-DD for sorting
      acc[date] = (acc[date] || 0) + order.total;
      return acc;
    }, {} as Record<string, number>);

  return Object.entries(salesByDate)
    .map(([date, sales]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sales
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export default function ReportsPage() {
  const [startDate, setStartDate] = React.useState<Date | undefined>();
  const [endDate, setEndDate] = React.useState<Date | undefined>();
  const [paymentMethod, setPaymentMethod] = React.useState<string>("All");
  const [filteredData, setFilteredData] = React.useState(aggregateSalesData());

  const handleApplyFilter = () => {
    setFilteredData(aggregateSalesData(startDate, endDate, paymentMethod));
  };
  
  const handleResetFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setPaymentMethod("All");
    setFilteredData(aggregateSalesData());
  };


  const chartConfig = {
    sales: {
      label: "Sales",
      color: "hsl(var(--primary))",
    },
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Analyze your sales and performance.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
             <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="GoPay">GoPay</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-6">
            <Button onClick={handleApplyFilter}>Apply</Button>
            <Button variant="outline" onClick={handleResetFilter}>Reset</Button>
            <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
          </div>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Daily Sales</CardTitle>
          <CardDescription>A summary of sales from completed orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis
                  tickFormatter={(value) => `$${value}`}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--accent))', radius: 4 }}
                  content={<ChartTooltipContent
                    formatter={(value) => `$${(value as number).toFixed(2)}`}
                    />}
                />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
