import Avatar from "boring-avatars";
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
		<figure
			className={cn(
				"relative h-full w-96 cursor-pointer overflow-hidden rounded-xl p-4",
				// light styles
				"bg-foreground/5 hover:bg-foreground/5",
			)}
		>
			<div className="flex flex-row items-center gap-2">
				{testimonial.src ? (
					<img
						className="rounded-full size-8"
						width="32"
						height="32"
						alt=""
						src={testimonial.src}
					/>
				) : (
					<Avatar size={32} name={testimonial.name} variant="beam" />
				)}
				<div className="flex flex-col">
					<figcaption className="text-lg text-foreground/90">
						{testimonial.name}
					</figcaption>
					<p className="text-xs font-medium text-foreground/70">
						{testimonial.service}
					</p>
				</div>
			</div>
			<blockquote className="mt-2 px-1 text-pretty">
				{testimonial.body}
			</blockquote>
		</figure>
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
