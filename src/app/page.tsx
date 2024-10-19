"use client"

import { ChartOverview } from "@/components/chart";
import { Reviews } from "@/components/reviews";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BadgeDollarSign, DollarSign, Percent, Users } from "lucide-react";


interface ReviewData {
  totalReviews: {
    qtd: string | number;
  };
}

interface DashboardData {
  reviewsToday: ReviewData;
  totalReviews: ReviewData;
  reviewsLast30Days: ReviewData;
  reviewsAvg: ReviewData;
}

const fetchPostsDashboard = async (): Promise<DashboardData> => {
  const res = await fetch('http://localhost:3333/dataDashboard?idClient=d07ca3c3-ff77-4e9d-9e80-55185b36acee');
  if (!res.ok) {
    throw new Error('Falha ao buscar os dados');
  }
  return res.json();
};

export default function Home() {

  const { data: dashboardData } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchPostsDashboard,
  }
  )

  const totalReviews = dashboardData?.totalReviews?.totalReviews;
  const totalReviews30Days = dashboardData?.reviewsLast30Days?.totalReviews;
  const totalReviewsToday = dashboardData?.reviewsToday?.totalReviews;
  const totalReviewsAvg = dashboardData?.reviewsAvg?.totalReviews;

  return (
    <main className="sm:ml-14 p-4">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Total de comentários
              </CardTitle>
              <DollarSign className="ml-auto w-4 h-4" />
            </div>

            <CardDescription>
              Total de comentários em 90 dias
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base sm:text-lg font-bold">{totalReviews?.qtd ?? '0'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Novos comentários
              </CardTitle>
              <Users className="ml-auto w-4 h-4" />
            </div>

            <CardDescription>
              Novos comentários em 30 dias
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base sm:text-lg font-bold">{totalReviews30Days?.qtd ?? '0'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Comentários hoje
              </CardTitle>
              <Percent className="ml-auto w-4 h-4" />
            </div>

            <CardDescription>
              Total de comentários hoje
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base sm:text-lg font-bold">{totalReviewsToday?.qtd ?? '0'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Média de notas
              </CardTitle>
              <BadgeDollarSign className="ml-auto w-4 h-4" />
            </div>

            <CardDescription>
              Média de notas dos comentários em 30 dias
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base sm:text-lg font-bold">{totalReviewsAvg?.qtd ?? '0'}</p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-4 flex flex-col md:flex-row gap-4">
        <ChartOverview />
        <Reviews />
      </section>
    </main>
  );
}
