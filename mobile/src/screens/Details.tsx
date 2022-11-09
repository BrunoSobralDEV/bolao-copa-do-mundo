import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { VStack, Icon, useToast, FlatList } from "native-base";

import { api } from "../services/api";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";

interface RouteParams {
  id: string;
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true)

  const route = useRoute();
  const { id } = route.params as RouteParams;

  const toast = useToast();

  async function fetchPoolDetails() {
    try {
      setIsLoading(true)
      
      const response = await api.get(`/pools/${id}`);
      console.log(response.data)

    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi possível carregar os detalhes.',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPoolDetails()
  },[id])
  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title={`Bolão ${id}`} showBackButton showShareButton/>
    </VStack>
  )
}