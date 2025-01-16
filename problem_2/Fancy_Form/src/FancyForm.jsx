import React, {useState, useEffect} from "react";
import "./style.css";

// Dữ liệu token và tỷ lệ hoán đổi giả lập
const tokenData = [
    [
        {
            "currency": "BLUR",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 0.208115254237288
        },
        {
            "currency": "bNEO",
            "date": "2023-08-29T07:10:50.000Z",
            "price": 7.1282679
        },
        {
            "currency": "BUSD",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 0.999183113
        },
        {
            "currency": "BUSD",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 0.999878261118644
        },
        {
            "currency": "USD",
            "date": "2023-08-29T07:10:30.000Z",
            "price": 1
        },
        {
            "currency": "ETH",
            "date": "2023-08-29T07:10:52.000Z",
            "price": 1645.93373737374
        },
        {
            "currency": "GMX",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 36.3451143728814
        },
        {
            "currency": "STEVMOS",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 0.0727670677966102
        },
        {
            "currency": "LUNA",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 0.409556389830508
        },
        {
            "currency": "RATOM",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 10.2509189152542
        },
        {
            "currency": "STRD",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 0.738655338983051
        },
        {
            "currency": "EVMOS",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 0.062461813559322
        },
        {
            "currency": "IBCX",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 41.268113559322
        },
        {
            "currency": "IRIS",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 0.0177095593220339
        },
        {
            "currency": "ampLUNA",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 0.495485898305085
        },
        {
            "currency": "KUJI",
            "date": "2023-08-29T07:10:45.000Z",
            "price": 0.675
        },
        {
            "currency": "STOSMO",
            "date": "2023-08-29T07:10:45.000Z",
            "price": 0.431318
        },
        {
            "currency": "USDC",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 0.989832
        },
        {
            "currency": "axlUSDC",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 0.989832
        },
        {
            "currency": "ATOM",
            "date": "2023-08-29T07:10:50.000Z",
            "price": 7.18665733333333
        },
        {
            "currency": "STATOM",
            "date": "2023-08-29T07:10:45.000Z",
            "price": 8.51216205084746
        },
        {
            "currency": "OSMO",
            "date": "2023-08-29T07:10:50.000Z",
            "price": 0.377297433333333
        },
        {
            "currency": "rSWTH",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 0.00408771
        },
        {
            "currency": "STLUNA",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 0.442322101694915
        },
        {
            "currency": "LSI",
            "date": "2023-08-29T07:10:50.000Z",
            "price": 67.6966152542373
        },
        {
            "currency": "OKB",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 42.9756205932203
        },
        {
            "currency": "OKT",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 13.5615779661017
        },
        {
            "currency": "SWTH",
            "date": "2023-08-29T07:10:45.000Z",
            "price": 0.00403985045501208
        },
        {
            "currency": "USC",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 0.994
        },
        {
            "currency": "USDC",
            "date": "2023-08-29T07:10:30.000Z",
            "price": 1
        },
        {
            "currency": "USDC",
            "date": "2023-08-29T07:10:30.000Z",
            "price": 1
        },
        {
            "currency": "USDC",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 0.999878261118644
        },
        {
            "currency": "WBTC",
            "date": "2023-08-29T07:10:52.000Z",
            "price": 26002.822020202
        },
        {
            "currency": "wstETH",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 1872.25797423729
        },
        {
            "currency": "YieldUSD",
            "date": "2023-08-29T07:10:40.000Z",
            "price": 1.02908479661017
        },
        {
            "currency": "ZIL",
            "date": "2023-08-29T07:10:50.000Z",
            "price": 0.0165181355932203
        }
    ]
];

function FancyForm() {
    const [amountToSend, setAmountToSend] = useState("");// Số lượng tiền gửi
    const [amountToReceive, setAmountToReceive] = useState("");// Số lượng tiền nhận
    const [fromCurrency, setFromCurrency] = useState("USD");// Tiền gửi
    const [toCurrency, setToCurrency] = useState("BLUR");// Tiền nhận
    const [loading, setLoading] = useState(false);// Trạng thái xử lý
    const [errorMessage, setErrorMessage] = useState("");// Thông báo lỗi

    // Hàm tính toán tỷ lệ hoán đổi
    const calculateAmountToReceive = () => {
        // Tìm token gửi và token nhận trong mảng tokenData
        const fromToken = tokenData.flat().find((token) => token.currency === fromCurrency);
        const toToken = tokenData.flat().find((token) => token.currency === toCurrency);

        // Kiểm tra xem có tìm thấy token không và tính toán nếu có
        if (fromToken && toToken) {
            const result = (amountToSend * fromToken.price) / toToken.price;
            setAmountToReceive(parseFloat(result.toFixed(2)));
        } else {
            setAmountToReceive("");
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        /**
         * Kiểm tra số lượng tiền gửi
         *
         * Nếu số lượng tiền gửi không hợp lệ thì hiển thị thông báo lỗi
         *
         * Nếu số lượng tiền gửi hợp lệ thì hiển thị thông báo xử lý và giả lập thời gian chờ xử lý
         */
        if (!amountToSend || amountToSend <= 0) {
            setErrorMessage("Amount to send must be greater than 0.");
            return;
        }

        setLoading(true);
        setErrorMessage("");

        // Giả lập thời gian chờ xử lý
        setTimeout(() => {
            setLoading(false);
            calculateAmountToReceive();// Tính toán số lượng tiền nhận
            alert("Swap Successful!");
        }, 2000);
    };


    /**
     * Tính toán số lượng tiền nhận khi số lượng tiền gửi, tiền gửi hoặc tiền nhận thay đổi
     *
     * Sử dụng useEffect để theo dõi các giá trị thay đổi
     *
     * Khi số lượng tiền gửi, tiền gửi hoặc tiền nhận thay đổi thì tính toán số lượng tiền nhận
     *
     * Số lượng tiền nhận = (Số lượng tiền gửi * Giá tiền gửi) / Giá tiền nhận
     *
     * Nếu sử dụng useEffect như dưới đây thì không cần gọi hàm calculateAmountToReceive() trong hàm handleSubmit
     *
     * vì khi số lượng tiền gửi, tiền gửi hoặc tiền nhận thay đổi thì hàm calculateAmountToReceive() sẽ được gọi
     *
     * và sẽ tự động cập nhật số lượng tiền nhận
     */
    // useEffect(() => {
    //     if (amountToSend) {
    //         calculateAmountToReceive();
    //     }
    // }, [amountToSend, fromCurrency, toCurrency]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h5>Swap</h5>

                <label htmlFor="input-amount">Amount to send</label>
                <input
                    id="input-amount"
                    type="number"
                    min={0}
                    value={amountToSend}
                    onChange={(e) => setAmountToSend(e.target.value)}
                />

                <label htmlFor="from-currency">From Currency</label>
                <select
                    id="from-currency"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                >
                    {tokenData.flat().map((token) => (
                        <option key={token.currency} value={token.currency}>
                            {token.currency}
                        </option>
                    ))}
                </select>

                <label htmlFor="to-currency">To Currency</label>
                <select
                    id="to-currency"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                >
                    {tokenData.flat().map((token) => (
                        <option key={token.currency} value={token.currency}>
                            {token.currency}
                        </option>
                    ))}
                </select>

                <label htmlFor="output-amount">Amount to receive</label>
                <input id="output-amount" type="number" value={amountToReceive} readOnly/>

                {errorMessage && <div className="error" style={{color: 'red'}}>{errorMessage}</div>}

                <button type="submit" disabled={loading}>
                    {loading ? "Processing..." : "CONFIRM SWAP"}
                </button>

            </form>
        </div>
    );
}

export default FancyForm;
