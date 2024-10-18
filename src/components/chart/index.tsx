"use client"

import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Bar, CartesianGrid, XAxis, BarChart } from "recharts";
import { useQuery } from "@tanstack/react-query";

interface MonthlyData {
    qtd: string;
    nome_mes: string;
}

type MonthlyDataArray = MonthlyData[];

const fetchPosts = async (): Promise<MonthlyDataArray> => {
    const res = await fetch('http://localhost:3333/reviewsMonth?idClient=d07ca3c3-ff77-4e9d-9e80-55185b36acee');
    if (!res.ok) {
        throw new Error('Falha ao buscar os dados');
    }
    return res.json();
};

export function ChartOverview() {

    const { data: monthlyDataArray } = useQuery({
        queryKey: ['reviewsMonth'],
        queryFn: fetchPosts,
    }
    )

    const chartData = monthlyDataArray

    const chartConfig = {
        qtd: {
            label: "Total",
            color: "#2563eb",
        },
        nome_mes: {
            label: "Month",
            color: "#60a5fa",
        },
    } satisfies ChartConfig

    return (
        <Card className="w-full md:w-1/2 md:max-w-[600px]">
            <CardHeader>
                <div className="flex items-center justify-center">
                    <CardTitle className="text-lg sm:text-xl text-gray-800">
                        Overview Comentários
                    </CardTitle>
                    <DollarSign className="ml-auto w-4 h-4" />
                </div>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="nome_mes"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="qtd" fill="var(--color-qtd)" radius={4} />
                        {/* <Bar dataKey="nome_mes" fill="var(--color-nome_mes)" radius={4} /> */}
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}