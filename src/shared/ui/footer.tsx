import { useTranslation } from "react-i18next";
import { copy } from "../data/copy";
import { AnimatedThemeToggler } from "./animated-theme-toggler";

export const Footer = () => {
	const { t } = useTranslation();
	return (
		<footer className="flex flex-col max-w-7xl w-full mx-auto">
			<div className="md:grid md:grid-cols-[auto,1fr]">
				<div className="content text-sm leading-[1.3] uppercase tracking-[-0.41px] text-appGray-500 text-center mb-8 md:text-base md:leading-[1.3] md:text-left">
					<div className="content-primitive content--paragraph">
						<p>
							{copy.footer.addressLines.map((line: string, index: number) => (
								<>
									{line}
									{index < copy.footer.addressLines.length - 1 ? <br /> : null}
								</>
							))}
						</p>
					</div>
				</div>
				<nav className="grid grid-cols-[repeat(2,auto)] justify-between gap-x-12 gap-y-8 mx-auto mb-10 max-md:max-w-[225px] md:mb-20 lg:grid-cols-[repeat(4,auto)] lg:gap-20 xl:gap-32">
					<div className="content footer--nav-col">
						<div className="content-primitive content--paragraph">
							<p>{copy.footer.connectTitle}</p>
						</div>
						<div className="content-primitive content--bulletList">
							<ul>
								<li>
									<p>{t("instagram")}</p>
								</li>
								<li>
									<p>{t("facebook")}</p>
								</li>
								<li>
									<p>{t("twitter")}</p>
								</li>
							</ul>
						</div>
					</div>
					<div className="content footer--nav-col">
						<div className="content-primitive content--paragraph">
							<p>{copy.footer.contactTitle}</p>
						</div>
						<div className="content-primitive content--bulletList">
							<ul>
								{copy.footer.contactItems.map((it) => (
									<li key={it}>
										<p>{it}</p>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className="content footer--nav-col">
						<div className="content-primitive content--paragraph">
							<p>{copy.footer.shopTitle}</p>
						</div>
						<div className="content-primitive content--bulletList">
							<ul>
								{copy.footer.shopItems.map((it) => (
									<li key={it}>
										<p>{it}</p>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className="content footer--nav-col">
						<div className="content-primitive content--paragraph">
							<p>{copy.footer.legalTitle}</p>
						</div>
						<div className="content-primitive content--bulletList">
							<ul>
								{copy.footer.legalItems.map((it) => (
									<li key={it}>
										<p>{it}</p>
									</li>
								))}
							</ul>
						</div>
					</div>
				</nav>
			</div>
			<div className="flex flex-col items-center text-center md:flex-row md:justify-between">
				<div className="flex items-center max-md:mb-3.5">
					<span className="text-sm leading-none tracking-[-0.41px] mr-2 md:text-base md:leading-none md:mr-3">
						{copy.name}
					</span>
				</div>
				<p className="text-xs flex gap-2 items-center leading-none md:text-base md:leading-none">
					<AnimatedThemeToggler />
					{copy.footer.copyright}
				</p>
			</div>
		</footer>
	);
};
