"use client"

import { ChartOverview } from "@/components/chart";
import { Reviews } from "@/components/reviews";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BadgeDollarSign, DollarSign, Percent, Users } from "lucide-react";

interface TotalReviews {
  qtd: string;
}

interface ReviewsData {
  totalReviews: TotalReviews;
}

interface TotalReviews30Days {
  qtd: string;
}

interface ReviewsData30Days {
  totalReviews: TotalReviews30Days;
}

interface TotalReviewsToday {
  qtd: string;
}

interface ReviewsDataToday {
  totalReviews: TotalReviewsToday;
}

interface TotalReviewsAvg {
  qtd: string;
}

interface ReviewsDataAvg {
  totalReviews: TotalReviewsAvg;
}

const fetchPosts = async (): Promise<ReviewsData> => {
  const res = await fetch('http://localhost:3333/totalReviewsClient?idClient=d07ca3c3-ff77-4e9d-9e80-55185b36acee');
  if (!res.ok) {
    throw new Error('Falha ao buscar os dados');
  }
  return res.json();
};

const fetchPosts30Days = async (): Promise<ReviewsData30Days> => {
  const res = await fetch('http://localhost:3333/totalReviews30Days?idClient=d07ca3c3-ff77-4e9d-9e80-55185b36acee');
  if (!res.ok) {
    throw new Error('Falha ao buscar os dados');
  }
  return res.json();
};

const fetchPostsToday = async (): Promise<ReviewsDataToday> => {
  const res = await fetch('http://localhost:3333/reviewsToday?idClient=d07ca3c3-ff77-4e9d-9e80-55185b36acee');
  if (!res.ok) {
    throw new Error('Falha ao buscar os dados');
  }
  return res.json();
};

const fetchPostsAvg = async (): Promise<ReviewsDataAvg> => {
  const res = await fetch('http://localhost:3333/totalReviewsAvg?idClient=d07ca3c3-ff77-4e9d-9e80-55185b36acee');
  if (!res.ok) {
    throw new Error('Falha ao buscar os dados');
  }
  return res.json();
};

export default function Home() {

  const { data: reviewsData } = useQuery({
    queryKey: ['totalReviews'],
    queryFn: fetchPosts,
  }
  )

  const { data: reviewsData30Days } = useQuery({
    queryKey: ['totalReviews30Days'],
    queryFn: fetchPosts30Days,
  }
  )

  const { data: reviewsDataToday } = useQuery({
    queryKey: ['totalReviewsToday'],
    queryFn: fetchPostsToday,
  }
  )

  const { data: reviewsDataAvg } = useQuery({
    queryKey: ['totalReviewsAvg'],
    queryFn: fetchPostsAvg,
  }
  )

  console.log(reviewsDataAvg)

  const totalReviews = reviewsData?.totalReviews;
  const totalReviews30Days = reviewsData30Days?.totalReviews;
  const totalReviewsToday = reviewsDataToday?.totalReviews;
  const totalReviewsAvg = reviewsDataAvg?.totalReviews;

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
