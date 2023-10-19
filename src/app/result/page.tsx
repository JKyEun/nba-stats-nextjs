'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { playerStatTable, selectedTeam } from '../recoil/atom';
import { useRouter } from 'next/navigation';
import { getGameResult } from '../apis/stat';
import { Result } from '../types/stat';
import '../../style/resultPage.scss';

export default function Result() {
    const router = useRouter();
    const teamData = useRecoilValue(selectedTeam);
    const playerStats = useRecoilValue(playerStatTable);
    const [result, setResult] = useState<Result>();

    const callGetGameResult = async () => {
        const res = await getGameResult(teamData, playerStats);
        console.log(res);
        setResult(res);
        console.log(result);
    };

    const backToStatPage = () => {
        router.push('/');
    };

    useEffect(() => {
        if (teamData.length === 0) return router.push('/');
        callGetGameResult();
    }, [teamData, router]);

    return (
        <div className='result-page'>
            <div className='result-wrap'>
                <div className='win-lose'>73승 9패</div>
                <div className='score-avg'>
                    <div className='offense-avg'>
                        평균 득점: {result && result.offense.reduce((acc, item) => acc + item.points, 0).toFixed(1)}점
                    </div>
                    <div className='defense-avg'>평균 실점: {result && result.defense}</div>
                </div>
                {result &&
                    result.offense.map(el => (
                        <div key={el.name} className='player-score'>
                            <span className='name'>{el.name}</span>
                            <span className='points'>{el.points}</span>
                        </div>
                    ))}
            </div>
            <div onClick={backToStatPage} className='back-btn'>
                돌아가기
            </div>
        </div>
    );
}
