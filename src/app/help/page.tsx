import React from 'react';
import '../../style/helpPage.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function page() {
    return (
        <div className='help-page'>
            <div className='help-wrap'>
                <h2 className='help-title'>도움말</h2>
                <div>
                    <Link href='/' className='exit'>
                        <Image src='/close.svg' alt='나가기' width={24} height={24} />
                    </Link>
                    <p className='help-desc'>
                        <span>- 15달러 안에서 Best 5를 선택합니다.</span>
                        <span>- 제출 버튼을 클릭하면 시뮬레이터가 동작합니다.</span>
                        <span>- 랭킹 등록은 카카오 로그인이 되어있어야 가능합니다.</span>
                        <span>- Credit을 사용하면 랭킹에 시뮬레이션 결과를 등록할 수 있습니다.</span>
                        <span>- Credit은 매일 1개씩 주어지고, 3개가 최대 개수입니다.</span>
                        <span>- 랭킹은 매주 초기화됩니다.</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
