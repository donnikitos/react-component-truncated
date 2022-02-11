import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

type IProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
	children: string;
};

function Truncated({ children, className, ...props }: IProps) {
	const middle = Math.round(children.length / 2);

	const [mainRef, setMainRef] = useState<null | HTMLElement>(null);
	const span1Ref = useRef<null | HTMLElement>(null);
	const span2Ref = useRef<null | HTMLElement>(null);
	const [overflowing, setOverflowing] = useState(false);

	useEffect(() => {
		if (!mainRef) {
			return;
		}

		const resizeObserver = new ResizeObserver((entries) => {
			if (!span1Ref || !span2Ref) {
				return;
			}

			entries.forEach(() => {
				setOverflowing(
					span1Ref.current.clientWidth <
						span1Ref.current.scrollWidth ||
						span2Ref.current.clientWidth <
							span2Ref.current.scrollWidth,
				);
			});
		});

		resizeObserver.observe(mainRef);

		return () => {
			resizeObserver.disconnect();
		};
	}, [mainRef]);

	return (
		<div
			{...props}
			ref={setMainRef}
			className={`${styles.root} ${className || ''}`}
		>
			<span ref={span1Ref}>{children.substring(0, middle)}</span>
			<span ref={span2Ref}>{children.substring(middle)}</span>
			{overflowing && <div>...</div>}
		</div>
	);
}

export default Truncated;
