
import { useState, useEffect } from 'react';

export interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
    priority: number;
}

export const useWalletBalances = () => {
    const [balances, setBalances] = useState<WalletBalance[]>([]);

    useEffect(() => {
        // Giả sử bạn lấy dữ liệu từ API hoặc nguồn dữ liệu khác
        fetch('/api/wallet-balances')
            .then(res => res.json())
            .then(data => setBalances(data));
    }, []);

    return balances;
};

export const usePrices = () => {
    const [prices, setPrices] = useState<Record<string, number>>({});

    useEffect(() => {
        // Giả sử bạn lấy dữ liệu từ API giá
        fetch('/api/prices')
            .then(res => res.json())
            .then(data => setPrices(data));
    }, []);

    return prices;
};
