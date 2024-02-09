'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { creditState, isLoginState, playerStatTable, selectedTeam } from '../recoil/atom';
import { useRouter } from 'next/navigation';
import { getGameResult } from '../apis/stat';
import { Result } from '../types/stat';
import '../../style/resultPage.scss';
import ResultLoading from './ResultLoading';
import ModalNicknameInput from './ModalNicknameInput';
import { getRanking } from '../apis/ranking';

export default function Result() {
    const router = useRouter();
    const teamData = useRecoilValue(selectedTeam);
    const playerStats = useRecoilValue(playerStatTable);
    const isLogin = useRecoilValue(isLoginState);
    const credit = useRecoilValue(creditState);
    const [result, setResult] = useState<Result>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loadingTime, setLoadingTime] = useState<number>(1);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    const callGetGameResult = async () => {
        const res = await getGameResult(teamData, playerStats);
        setResult(res);
    };

    const backToStatPage = () => {
        router.push('/');
    };

    const isInRanking = async () => {
        if (!result) return false;
        const ranking = await getRanking();
        if (ranking.length < 20) return true;

        const lastRecord = ranking[ranking.length - 1];
        const userWinResult = result?.result || 0;
        const userOffenseAvg = result?.offenseAvg || 0;
        const userDefenseAvg = result?.defenseAvg || Infinity;

        if (lastRecord.result > userWinResult) {
            return false;
        } else if (lastRecord.result === userWinResult) {
            if (lastRecord.offenseAvg > userOffenseAvg) {
                return false;
            } else if (lastRecord.offenseAvg === userOffenseAvg) {
                if (lastRecord.defenseAvg < userDefenseAvg) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            return true;
        }
    };

    isInRanking();

    const callSetRanking = async () => {
        if (!result) return;
        if (!isLogin) return alert('로그인이 필요한 서비스입니다.');
        if (credit < 1) return alert('보유한 Credit이 없습니다.');
        if (await !isInRanking()) return alert('순위권 안에 들지 못했습니다.');
        setModalOpen(true);
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
            <ModalNicknameInput isModalOpen={isModalOpen} setModalOpen={setModalOpen} result={result} />
        </div>
    );
}
