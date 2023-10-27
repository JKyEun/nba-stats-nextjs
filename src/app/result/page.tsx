'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { playerStatTable, selectedTeam } from '../recoil/atom';
import { useRouter } from 'next/navigation';
import { getGameResult } from '../apis/stat';
import { Result } from '../types/stat';
import '../../style/resultPage.scss';
import ResultLoading from './ResultLoading';
import { setRanking } from '../apis/ranking';

export default function Result() {
    const router = useRouter();
    const teamData = useRecoilValue(selectedTeam);
    const playerStats = useRecoilValue(playerStatTable);
    const [result, setResult] = useState<Result>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loadingTime, setLoadingTime] = useState<number>(1);

    const callGetGameResult = async () => {
        const res = await getGameResult(teamData, playerStats);
        setResult(res);
    };

    const backToStatPage = () => {
        router.push('/');
    };

    const callSetRanking = () => {
        if (!result) return;
        setRanking(result);
    };

    useEffect(() => {
        if (teamData.length === 0) return router.push('/');
        callGetGameResult();
    }, [teamData, router]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        interval = setInterval(() => {
            if (loadingTime < 82) {
                setLoadingTime(cur => cur + 1);
            } else {
                setIsLoading(false);
            }
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [loadingTime]);

    return (
        <div className='result-page'>
            {isLoading ? (
                <ResultLoading loadingTime={loadingTime} />
            ) : (
                <>
                    <div className='result-wrap'>
                        <div className='win-lose'>
                            <div className='title'>시즌 성적</div>
                            <div className='result'>
                                {result && result.result}승 {result && 82 - result.result}패
                            </div>
                        </div>
                        <div className='offense-avg'>
                            <div className='title'>팀 평균 득점</div>
                            <div className='result'>{result && result.offenseAvg}점</div>
                        </div>
                        <div className='defense-avg'>
                            <div className='title'>팀 평균 실점</div>
                            <div className='result'>{result && result.defenseAvg}점</div>
                        </div>
                        <div className='player-scores'>
                            <div className='title'>선수별 평균득점</div>
                            {result &&
                                result.playerScores.map(el => (
                                    <div key={el.name} className='player-score'>
                                        <span className='name'>{el.name}</span>
                                        <span className='points'>{el.points}점</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className='fixed-area'>
                        <div onClick={callSetRanking} className='register-btn'>
                            랭킹등록
                        </div>
                        <div onClick={backToStatPage} className='back-btn'>
                            다시하기
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
