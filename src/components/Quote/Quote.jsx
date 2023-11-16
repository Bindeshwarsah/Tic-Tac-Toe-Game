import React, { useState, useEffect } from 'react';
import styles from "./Quote.module.css"
import Stars from "../icons/Quote_Stars.svg"

function Quote() {
    const [advice, setAdvice] = useState("");
    const [adviceId, setAdviceId] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.adviceslip.com/advice');
                if (!response.ok) {
                    throw new Error('Failed to fetch data from the API');
                }
                const result = await response.json();
                setAdvice(result.slip.advice);
                setAdviceId(result.slip.id);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 60000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className={styles.quoteContainer}>
            {adviceId && (
                <h1 className={styles.idContainer}>Quote #{adviceId}</h1>
            )}
            {advice && (
                <span className={styles.adviveContainer}>"{advice}"
                    <div className={styles.stars} ><img src={Stars}  alt="ellips image" /></div>
                </span>
            )}
        </div>
    );
}

export default Quote;


