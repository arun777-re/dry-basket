import Image from "next/image";
import { BlogsIncomingDTO } from "@/types/blog";
import Link from "next/link";

const BlogsCard: React.FC<BlogsIncomingDTO> = ({
  blogImage,
  description,
  title,
  tags,
  heading,
  authorName,
  slug,
}) => {
  return (
    <div
      className="relative mx-auto w-full md:w-[48%] transition-transform duration-300 hover:scale-102"
    >
      <div className="flex flex-col h-full rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-500">
        {/* Image */}
        <div className="relative w-full h-44 sm:h-48 md:h-56 lg:h-60">
          <Image
            src={blogImage ?? "/images/banner-4.jpg"}
            alt={title ?? "blog-image"}
            fill
            loading="lazy"
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-fill"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent p-2">
            <span className="text-xs sm:text-sm text-white font-medium">
              {tags && tags.join(", ")}
            </span>
          </div>
        </div>

        {/* Content */}
        <article className="flex flex-col items-start gap-2 p-4 sm:p-5 text-left">
          <h5 className="text-lg sm:text-xl font-semibold text-head line-clamp-2">
            {title ?? ""}
          </h5>
          {heading && (
            <span className="text-sm sm:text-base font-normal text-head/90 line-clamp-1">
              {heading}
            </span>
          )}
          <p className="text-sm sm:text-base text-text/90 line-clamp-3">
            {description}
          </p>
          <div className="flex items-center justify-between w-full mt-3">
            <span className="text-xs sm:text-sm text-text/80">By {authorName}</span>
            <Link
              href={(`/blog/${slug}`)}
              className="bg-transparent border-2 border-first rounded-full px-4 sm:px-5 py-2 sm:py-3 cursor-pointer
                text-primary font-medium tracking-wide hover:bg-first hover:text-white transition-all duration-500 ease-in-out"
            >
              Read More
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogsCard;
