import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	formState: ArticleStateType;
	onFormStateChange: (newState: ArticleStateType) => void;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	formState,
	onFormStateChange,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const sidebarRef = useRef<HTMLElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				!sidebarRef.current?.contains(target) &&
				!arrowButtonRef.current?.contains(target) &&
				isOpen
			) {
				setIsOpen(false);
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen]);

	const handleToggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};

	const handleFontFamilyChange = (option: OptionType) => {
		onFormStateChange({
			...formState,
			fontFamilyOption: option as (typeof fontFamilyOptions)[number],
		});
	};

	const handleFontSizeChange = (option: OptionType) => {
		onFormStateChange({
			...formState,
			fontSizeOption: option as (typeof fontSizeOptions)[number],
		});
	};

	const handleFontColorChange = (option: OptionType) => {
		onFormStateChange({
			...formState,
			fontColor: option as (typeof fontColors)[number],
		});
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		onFormStateChange({
			...formState,
			backgroundColor: option as (typeof backgroundColors)[number],
		});
	};

	const handleContentWidthChange = (option: OptionType) => {
		onFormStateChange({
			...formState,
			contentWidth: option as (typeof contentWidthArr)[number],
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply();
	};

	const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onReset();
	};

	return (
		<>
			<div ref={arrowButtonRef}>
				<ArrowButton isOpen={isOpen} onClick={handleToggleSidebar} />
			</div>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<Select
						title='ШРИФТ'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						title='РАЗМЕР ШРИФТА'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
					/>
					<Select
						title='ЦВЕТ ШРИФТА'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
						isColorSelect={true}
					/>
					<Separator />
					<Select
						title='ЦВЕТ ФОНА'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
						isColorSelect={true}
					/>
					<Select
						title='ШИРИНА КОНТЕНТА'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
