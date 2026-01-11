import { useRef, memo } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit';

import styles from './Select.module.scss';

type OptionProps = {
	option: OptionType;
	onClick: () => void;
	selected?: OptionType | null;
	isColorSelect?: boolean;
};

export const Option = memo((props: OptionProps) => {
	const {
		option: { value, title, optionClassName, className },
		onClick,
		selected,
		isColorSelect,
	} = props;
	const optionRef = useRef<HTMLLIElement>(null);
	const isSelected = selected?.value === value;

	const handleClick: MouseEventHandler<HTMLLIElement> = () => {
		onClick();
	};

	useEnterOptionSubmit({
		optionRef,
		onClick,
	});

	return (
		<li
			className={clsx(styles.option, styles[optionClassName || ''])}
			value={value}
			onClick={handleClick}
			tabIndex={0}
			data-testid={`select-option-${value}`}
			data-selected={isSelected}
			data-color-select={isColorSelect}
			ref={optionRef}>
			{isColorSelect && isSelected && (
				<div className={styles.colorStripeOverlay} />
			)}
			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title}
			</Text>
		</li>
	);
});

Option.displayName = 'Option';
