import { useEffect } from 'react';

type UseEnterOptionSubmit = {
	onClick: () => void;
	optionRef: React.RefObject<HTMLLIElement>;
};

export const useEnterOptionSubmit = ({
	onClick,
	optionRef,
}: UseEnterOptionSubmit) => {
	useEffect(() => {
		const option = optionRef.current;
		if (!option) return;
		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (document.activeElement === option && event.key === 'Enter') {
				onClick();
			}
		};

		option.addEventListener('keydown', handleEnterKeyDown);
		return () => {
			option.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, [onClick, optionRef]);
};
