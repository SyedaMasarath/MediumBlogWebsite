import { BlogCard } from "../components/BlogCard"

export const Blogs = () =>{
    return <div className="flex justify-center">
        <div className="max-w-xl">
        <BlogCard
            authorName="zmasarath"
            title="Making a Medium Clone with MERN Stack"
            content="in this article we explore step by step how to create a medium clone with mern"
            publishedDate="12.05.24"
        ></BlogCard>
        <BlogCard
            authorName="zmasarath"
            title="Making a Medium Clone with MERN Stack"
            content="in this article we explore step by step how to create a medium clone with mern"
            publishedDate="12.05.24"
        ></BlogCard>
        <BlogCard
            authorName="zmasarath"
            title="Making a Medium Clone with MERN Stack"
            content="in this article we explore step by step how to create a medium clone with mern"
            publishedDate="12.05.24"
        ></BlogCard>
    </div>
    </div>
}