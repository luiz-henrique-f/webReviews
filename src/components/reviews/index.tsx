import { CircleDollarSign, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { Rating } from 'react-simple-star-rating'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface UserData {
    id: string;
    name: string;
    review_note: number;
    message: string
}

type UserDataArray = UserData[];

const fetchPosts = async (): Promise<UserDataArray> => {
    const res = await fetch('http://localhost:3333/Clients?idClient=c1654d0f-ea9b-4467-93a3-2a706807450a');
    if (!res.ok) {
        throw new Error('Falha ao buscar os dados');
    }
    return res.json();
};

export function Reviews() {

    const { data: clients } = useQuery({
        queryKey: ['clients'],
        queryFn: fetchPosts,
    }
    )
    return (
        <Card className="flex-1">
            <CardHeader>
                <div className="flex items-center justify-center">
                    <CardTitle className="text-lg sm:text-xl text-gray-800">
                        Últimos clientes
                    </CardTitle>
                    <CircleDollarSign className="ml-auto w-4 h-4" />
                </div>
                <CardDescription>
                    Novos clientes nas últimas 24 horas
                </CardDescription>
            </CardHeader>

            {clients ? clients.map((client) => {
                return (
                    <div key={client.id}>
                        <CardContent className="cursor-pointer">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <article className="flex items-center gap-2 border-b py-2">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src="https://w7.pngwing.com/pngs/364/361/png-transparent-account-avatar-profile-user-avatars-icon-thumbnail.png" />
                                                <AvatarFallback>LH</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm sm:text-base font-semibold">{client.name}</p>
                                                <Rating SVGstyle={{ display: "inline" }} size={20} initialValue={client.review_note} readonly={true} />
                                            </div>
                                        </article>
                                    </TooltipTrigger>
                                    <TooltipContent side='right'>
                                        {client.message}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardContent>
                    </div>
                )
            }) : <div className="flex justify-center">
                <Search />
                <span>Nenhum cliente comentou nas últimas 24 horas</span>
            </div>}

        </Card>
    )
}