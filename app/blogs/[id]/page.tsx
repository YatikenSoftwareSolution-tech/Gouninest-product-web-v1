"use client";

import { useParams } from "next/navigation";
import { BlogPosts } from "@/constants/blogs";
import Image from "next/image";
import React from "react";
import parse, { Element, DOMNode, Text } from "html-react-parser";

interface HeadingBlock {
  type: "heading";
  text: string;
}

interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

interface ListBlock {
  type: "list";
  items: string[];
}

interface TableBlock {
  type: "table";
  headers: string[];
  rows: string[][];
}

type ContentBlock = HeadingBlock | ParagraphBlock | ListBlock | TableBlock;

interface BlogPost {
  id: number;
  title: string;
  date: string;
  image: string;
  keywords?: string;
  introduction: string;
  content: ContentBlock[];
}

// function isTableBlock(block: ContentBlock): block is TableBlock {
//   return block.type === "table";
// }

const BlogPost = () => {
  const params = useParams();
  const blogId = parseInt(params.id as string);
  const blog = BlogPosts.find((post) => post.id === blogId) as
    | BlogPost
    | undefined;

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  const parseOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.name === "a") {
        const textNode = domNode.children[0] as Text | undefined;
        return (
          <a
            href={domNode.attribs.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline font-medium"
          >
            {textNode?.data}
          </a>
        );
      }
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:mt-16 lg:mt-24">
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
        {blog.keywords && <p className="text-gray-700">{blog.keywords}</p>}
      </div>

      {blog.content.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={index}
                className="text-2xl font-semibold mb-4 mt-8 text-gray-900"
              >
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p
                key={index}
                className="text-gray-700 mb-4"
                dangerouslySetInnerHTML={{
                  __html: block.text.replace(
                    /<a /g,
                    `<a class="text-blue-600 underline hover:text-blue-800" `
                  ),
                }}
              />
            );
          case "list":
            return (
              <ul key={index} className="list-disc list-inside mb-4">
                {block.items.map((item, i) => (
                  <li key={i} className="text-gray-700 mb-2">
                    {parse(item, parseOptions)}
                  </li>
                ))}
              </ul>
            );
          case "table":
            return (
              <div key={index} className="overflow-x-auto mb-6">
                <table className="min-w-full border text-left text-sm text-gray-700">
                  <thead>
                    <tr>
                      {block.headers.map((header, i) => (
                        <th
                          key={i}
                          className="border px-4 py-2 bg-gray-100 font-semibold"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="border px-4 py-2">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default BlogPost;
