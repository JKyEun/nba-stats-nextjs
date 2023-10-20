import React, { useState } from 'react';
import '../../style/resultLoading.scss';
import useGenerateMessage from '../hooks/useGenerateMessage';
import idxMaker from '../util/idxMaker';

export default function ResultLoading({ loadingTime }: { loadingTime: number }) {
    const [msgArr, setMsgArr] = useState<string[]>([]);
    const msgIdx = idxMaker(loadingTime);
    
    useGenerateMessage(setMsgArr);

    return (
        <div className='result-loading-wrap'>
            <div className='game'>{loadingTime}/82 경기 진행 중</div>
            <div className='back-bar'>
                <div className='front-bar'></div>
            </div>
            <div className='desc'>{msgArr[msgIdx]}</div>
        </div>
    );
}
