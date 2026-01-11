import { CSSProperties, useState, useMemo } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

export const App = () => {
	const [appliedState, setAppliedState] =
		useState<ArticleStateType>(defaultArticleState);

	const isNarrow = appliedState.contentWidth.value === '948px';

	const mainStyle = useMemo(
		() =>
			({
				'--font-family': appliedState.fontFamilyOption.value,
				'--font-size': appliedState.fontSizeOption.value,
				'--font-color': appliedState.fontColor.value,
				'--container-width': appliedState.contentWidth.value,
				'--bg-color': appliedState.backgroundColor.value,
				'--image-width': isNarrow ? '948px' : '100%',
				'--image-height': isNarrow ? '1000px' : 'auto',
			} as CSSProperties),
		[
			appliedState.fontFamilyOption.value,
			appliedState.fontSizeOption.value,
			appliedState.fontColor.value,
			appliedState.contentWidth.value,
			appliedState.backgroundColor.value,
			isNarrow,
		]
	);

	return (
		<main className={styles.main} style={mainStyle}>
			<ArticleParamsForm onApply={setAppliedState} />
			<Article />
		</main>
	);
};
