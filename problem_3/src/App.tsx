import React, { useMemo } from "react";
import './App.css';
import { useWalletBalances, usePrices, WalletBalance } from './hook';

interface Props {}

const App: React.FC = () => {
    const WalletPage: React.FC<Props> = (props: Props) => {
        const { ...rest } = props;
        const balances = useWalletBalances();
        const prices = usePrices();

        const getPriority = (blockchain: string): number => {
            const priorities = {
                'Osmosis': 100,
                'Ethereum': 50,
                'Arbitrum': 30,
                'Zilliqa': 20,
                'Neo': 20,
            };
            // @ts-ignore
            return priorities[blockchain] || -99;
        };

        const sortedBalances = useMemo(() => {
            return balances
                .filter((balance: WalletBalance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
                .map((balance: WalletBalance) => ({
                    ...balance,
                    priority: getPriority(balance.blockchain)
                }))
                .sort((lhs: WalletBalance, rhs: WalletBalance) => rhs.priority - lhs.priority);
        }, [balances]);

        const rows = sortedBalances.map((balance: WalletBalance) => {
            const usdValue = prices[balance.currency] ? prices[balance.currency] * balance.amount : 0; // Thêm kiểm tra để tránh lỗi khi không có giá trị
            return (
                <WalletRow
                    className={classes.row}
                    key={balance.currency} // Use currency as a unique key
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.amount.toFixed()}
                />
            )
        });

        return <div {...rest}>{rows}</div>;
    };

    return (
        <div>
            <WalletPage />
        </div>
    );
}

export default App;
