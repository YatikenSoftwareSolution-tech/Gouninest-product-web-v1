"use client";
import { useGlobal } from "@/context/GlobalContext";
import { MoveRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BlogCard = ({ title, introduction, date, image, id }) => {
  const router = useRouter();
  const { setSelectedBlog } = useGlobal();

  // Function to truncate text to 80 words
  const truncateTo80Words = (text) => {
    const words = text.split(" ");
    if (words.length > 80) {
      return words.slice(0, 80).join(" ") + "...";
    }
    return text;
  };

  const handleReadMore = () => {
    setSelectedBlog(id);
    router.push(`/blogs/${id}`);
  };

  return (
    <div className="glass-effect rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative h-48">
        <Image
          src={`/blogs/${image}.png`}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {truncateTo80Words(introduction)}
        </p>
        <button
          onClick={handleReadMore}
          className="text-[var(--color-electric-500)] hover:text-[var(--color-electric-600)] text-sm font-medium flex items-center gap-2"
        >
          Read More <MoveRightIcon size={16} />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
