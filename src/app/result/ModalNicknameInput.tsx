'use client';

import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';
import { Result } from '../types/stat';
import { setRanking } from '../apis/ranking';
import '../../style/modalNicknameInput.scss';
import { decreaseUserCredit } from '../apis/user';

export default function ModalNicknameInput({
    isModalOpen,
    setModalOpen,
    result
}: {
    isModalOpen: boolean;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    result: Result | undefined;
}) {
    const [nicknameInput, setNicknameInput] = useState<string>('');
    const [userId, setUserId] = useState<number>(0);
    const modalRef = useRef<HTMLDivElement>(null);

    const onNicknameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNicknameInput(e.target.value);
    };

    const onConfirmClick = async () => {
        if (!nicknameInput) return alert('닉네임을 입력하세요.');
        if (!result) return;
        try {
            await decreaseUserCredit(Number(userId) || 0);
            await setRanking(result, nicknameInput);
            setModalOpen(false);
            alert('랭킹이 등록되었습니다.');
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const id = window.localStorage.getItem('ID');
        if (id) {
            setUserId(Number(id));
        }
    }, []);

    useOutsideClick(isModalOpen, modalRef, setModalOpen);

    return isModalOpen ? (
        <div className='outside-modal'>
            <div ref={modalRef} className='modal-nickname-input'>
                <div className='desc'>닉네임을 입력해주세요!</div>
                <input value={nicknameInput} onChange={onNicknameInputChange} type='text' className='nickname-input' />
                <div onClick={onConfirmClick} className='confirm-btn'>
                    확인
                </div>
            </div>
        </div>
    ) : null;
}
