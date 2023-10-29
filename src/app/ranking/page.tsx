'use client';

import React, { useEffect, useState } from 'react';
import { getRanking } from '../apis/ranking';
import { EachRank } from '../types/rank';

export default function Ranking() {
    const [ranking, setRanking] = useState<EachRank[]>();

    const callGetRanking = async () => {
        const ranking = await getRanking();
        setRanking(ranking);
    };

    useEffect(() => {
        callGetRanking();
    }, []);

    return (
        <div className='ranking-page'>
            <h2>이번주 랭킹</h2>
            <div className='table-wrap'>
                {ranking?.map((el, idx) => (
                    <div key={el._id}>
                        <div>{idx}</div>
                        <div>
                            {el.result}승 {82 - el.result}패
                        </div>
                        <div>{el.offenseAvg}</div>
                        <div>{el.defenseAvg}</div>
                        <div>{}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
