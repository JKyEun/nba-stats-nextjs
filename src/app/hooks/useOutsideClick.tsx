import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

export default function useOutsideClick(
    isModalOpen: boolean,
    ref: RefObject<HTMLDivElement>,
    setModalOpen: Dispatch<SetStateAction<boolean>>
) {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (isModalOpen && !ref.current?.contains(e.target as HTMLElement)) {
                setModalOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);

        return () => document.removeEventListener('mousedown', handleClick);
    }, [isModalOpen, ref, setModalOpen]);
}
