"use client"
import { BlogPosts } from "@/constants/blogs";
import Image from "next/image";
import { useGlobal } from "@/context/GlobalContext";
import Link from "next/link";


const BlogPost = () => {
  const { selectedBlog } = useGlobal();
  const blog = BlogPosts.find((post) => post.id === selectedBlog);

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:mt-16 lg: mt-24">
      <div className="relative h-96 w-full mb-8">
        <Image
          src={`/blogs/${blog.image}.png`}
          alt={blog.title}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <div className="mb-8">
        <span className="text-sm text-gray-500">{blog.date}</span>
        <h1 className="text-3xl font-bold mt-2 mb-4">{blog.title}</h1>
        <p className="text-gray-700 whitespace-pre-line">{blog.introduction}</p>
      </div>

      {blog.sections &&
        blog.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>

            {"items" in section && Array.isArray(section.items) && (
              <ul className="list-disc list-inside mb-4">
                {section.items.map((item, i) => (
                  <li key={i} className="text-gray-700 mb-2">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {"stores" in section && Array.isArray(section.stores) && (
              <div className="mt-4">
                <p className="font-medium">Recommended stores:</p>
                <ul className="list-disc list-inside">
                  {section.stores.map((store, i) => (
                    <li key={i} className="text-gray-700">
                      <Link href={store.url} className="text-blue-700 hover:underline">{store.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {"notes" in section && section.notes && (
              <p
                className="text-gray-600 italic mt-4"
                dangerouslySetInnerHTML={{ __html: section.notes }}
              />
            )}
          </div>
        ))}

      {blog.conclusion && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
          <p className="text-gray-700 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: blog.conclusion }} />
        </div>
      )}
    </div>
  );
};

export default BlogPost;