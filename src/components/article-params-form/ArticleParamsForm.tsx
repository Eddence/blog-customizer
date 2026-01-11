import { useState, useRef, useEffect, useCallback } from 'react';
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
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const sidebarRef = useRef<HTMLElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				!sidebarRef.current?.contains(target) &&
				!arrowButtonRef.current?.contains(target)
			) {
				setIsMenuOpen(false);
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isMenuOpen]);

	const handleToggleSidebar = useCallback(() => {
		setIsMenuOpen((prev) => !prev);
	}, []);

	const handleFontFamilyChange = useCallback((option: OptionType) => {
		setFormState((prev) => ({
			...prev,
			fontFamilyOption: option as (typeof fontFamilyOptions)[number],
		}));
	}, []);

	const handleFontSizeChange = useCallback((option: OptionType) => {
		setFormState((prev) => ({
			...prev,
			fontSizeOption: option as (typeof fontSizeOptions)[number],
		}));
	}, []);

	const handleFontColorChange = useCallback((option: OptionType) => {
		setFormState((prev) => ({
			...prev,
			fontColor: option as (typeof fontColors)[number],
		}));
	}, []);

	const handleBackgroundColorChange = useCallback((option: OptionType) => {
		setFormState((prev) => ({
			...prev,
			backgroundColor: option as (typeof backgroundColors)[number],
		}));
	}, []);

	const handleContentWidthChange = useCallback((option: OptionType) => {
		setFormState((prev) => ({
			...prev,
			contentWidth: option as (typeof contentWidthArr)[number],
		}));
	}, []);

	const handleSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			onApply(formState);
		},
		[formState, onApply]
	);

	const handleReset = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			setFormState(defaultArticleState);
			onApply(defaultArticleState);
		},
		[onApply]
	);

	return (
		<>
			<div ref={arrowButtonRef}>
				<ArrowButton isOpen={isMenuOpen} onClick={handleToggleSidebar} />
			</div>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
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
