import { ChevronRight } from 'lucide-react'
 
export const ServiceItemSkeleton = () => {
  return (
    <li
 
			className="rounded-2xl overflow-hidden shadow bg-white gap-5 grid grid-cols-[1fr_2fr] items-center"
		>
			<div className="h-full bg-primary/5 w-full grid place-items-center">
			 
			</div>
			<div className="p-4 flex flex-col h-full justify-between">
				<header>
          <h2 className="text-2xl mb-2 skeleton">lorem ipsum lorem</h2>

					<p className="text-foreground/80 text-balance skeleton line-clamp-5">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero mollitia exercitationem enim, a iure 
					</p>
				</header>

				<nav className="flex justify-end pt-3">
					<span
						className="mt-2 flex gap-2 pl-4 pr-2 py-2 bg-primary hover:bg-primary/80 transition-all text-white rounded-xl cursor-pointer "
          >
            <span className='skeleton-dark'>
						Seleccionar
            </span>
						<ChevronRight />
					</span>
				</nav>
			</div>
		</li>
  )
}
