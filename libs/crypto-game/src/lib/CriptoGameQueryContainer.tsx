import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CryptoGame } from './crypto-game'

const CryptoGameQueryContainer = () => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <CryptoGame />
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default CryptoGameQueryContainer
