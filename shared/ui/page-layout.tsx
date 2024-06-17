import { clsx } from 'clsx';

type Props = {
	className?: string;
	children?: React.ReactNode;
};

/**
 * Page layout component
 * @param children - The children to render
 * @param className - The class name to apply
 * @returns The page layout component
 */
export const PageLayout: React.FC<Props> = ({ children, className }) => {
	return (
		<main
			className={clsx(
				'flex flex-col min-h-screen max-w-md items-center mx-auto',
				className
			)}
		>
			{children}
		</main>
	);
};
