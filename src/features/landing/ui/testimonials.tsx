import { t } from "i18next";
import { cn } from "~/lib/cn";
import { type Testimonial, testimonials } from "~/shared/data/testimonials";
import { Marquee } from "~/shared/ui/marquee";

export const TestimonialCard = ({
	testimonial,
}: {
	testimonial: Testimonial;
}) => {
	return (
		<div
			className={cn(
				"relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
				// light styles
				"border-gray-950/10 bg-gray-950/10 hover:bg-gray-950/5",
				// dark styles
				"dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15",
			)}
		>
			<img src={testimonial.src} alt={testimonial.name} />
			<blockquote className="text-lg text-balance text-foreground/80 px-4">
				{testimonial.body}
			</blockquote>
			<p className="px-6">{testimonial.name}</p>
		</div>
	);
};

export const Testimonials = () => {
	return (
		<div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-12">
			<header className="flex flex-col items-center gap-4 ">
				<h2 className="text-4xl lg:text-6xl">{t("testimonials.title")}</h2>
				<p className="text-center text-pretty max-w-md mb-16">
					{t("testimonials.description")}
				</p>
			</header>

			<Marquee pauseOnHover className="[--duration:20s]">
				{testimonials.map((review) => (
					<TestimonialCard key={review.name} testimonial={review} />
				))}
			</Marquee>
			<div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
			<div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
		</div>
	);
};
