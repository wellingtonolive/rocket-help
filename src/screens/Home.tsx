import { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { HStack, IconButton, VStack, useTheme, Heading, Text, FlatList, Center } from 'native-base';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';

import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';
import { Button } from '../components/Button';

import Logo from '../assets/logo_secondary.svg';
import { ItemClick } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';

export function Home() {

    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
    const [orders, setOrders] = useState<OrderProps[]>([
        {
            id: '123',
            patrimony: '5164654',
            when: '11/03/1999 as 22h30',
            status: 'open'
        }
    ])

    const { colors } = useTheme();
    const navigation = useNavigation();

    function handleNewOrder(){
        navigation.navigate('new')
    }

    function handleOpenDetails(orderId: string){
        navigation.navigate('details', {orderId})
    }

    return (
        <VStack flex={1} pb={6} bg="gray.700">
            <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
                bg="gray.600"
                pt={12}
                pb={5}
                px={6}
            >
                <Logo />
                <IconButton
                    icon={<SignOut size={26} color={colors.gray[300]} />}
                />
            </HStack>
            <VStack flex={1} px={6}>
                <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
                    <Heading color="gray.100">
                        Meus Chamados
                    </Heading>
                    <Text color="gray.200">
                        50
                    </Text>
                </HStack>

                <HStack space={3} mb={8}>
                    <Filter
                        type="open"
                        title='Em Andamento'
                        onPress={() => setStatusSelected('open')}
                        isActive={statusSelected === 'open'}
                    />
                    <Filter
                        type="closed"
                        title='Finalizados'
                        onPress={() => setStatusSelected('closed')}
                        isActive={statusSelected === 'closed'}
                    />
                </HStack>

                <FlatList
                    data={orders}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)}/>}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom:100}}
                    ListEmptyComponent={() =>(
                        <Center>
                            <ChatTeardropText color={colors.gray[300]} size={40}/>
                            <Text color="gray.500" fontSize="xl" mt={6} textAlign="center">
                                Você não possui {'/n'}solicitações {statusSelected === 'open' ? 'em aberto' : 'finalizados'}    
                            </Text>    
                        </Center>
                    )}
                />
                <Button title="Nova Solicitação" onPress={handleNewOrder}/>

            </VStack>
        </VStack>
    );
}