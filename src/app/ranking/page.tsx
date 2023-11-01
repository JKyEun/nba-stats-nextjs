'use client';

import React, { useEffect, useState } from 'react';
import { getRanking } from '../apis/ranking';
import { EachRank } from '../types/rank';
import '../../style/rankingPage.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Ranking() {
    const router = useRouter();
    const [ranking, setRanking] = useState<EachRank[]>();

    const callGetRanking = async () => {
        const ranking = await getRanking();
        setRanking(ranking);
    };

    const exitRankingPage = () => {
        router.push('/');
    };

    useEffect(() => {
        callGetRanking();
    }, []);

    return (
        <div className='ranking-page'>
            <div className='ranking-wrap'>
                <h2 className='title'>이번 주 랭킹</h2>
                <div onClick={exitRankingPage} className='exit'>
                    <Image src='/close.svg' alt='나가기' width={24} height={24} />
                </div>
                <div className='table-wrap'>
                    <div className='table-head'>
                        <div className='rank'>순위</div>
                        <div className='nickname'>닉네임</div>
                        <div className='result'>결과</div>
                        <div className='offense'>평균 득점</div>
                        <div className='defense'>평균 실점</div>
                    </div>
                    {ranking?.map((el, idx) => (
                        <div
                            key={el._id}
                            className={
                                'table-row' +
                                ' ' +
                                (idx === 0 ? 'gold' : idx === 1 ? 'silver' : idx === 2 ? 'bronze' : '')
                            }>
                            <div className='rank'>{idx + 1}</div>
                            <div className='nickname'>{el.nickname}</div>
                            <div className='result'>
                                {el.result}승 {82 - el.result}패
                            </div>
                            <div className='offense'>{el.offenseAvg}점</div>
                            <div className='defense'>{el.defenseAvg}점</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
