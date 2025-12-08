import React from 'react'
import {BlogPost, SafariHeader} from "#components/index.js";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {blogPosts} from "#constants/index.js";

const Safari = () => {
    return (
        <>
            <div id="window-header">
                <SafariHeader />
            </div>
            <div className="blog">
                <h2>My Developer Blogs</h2>
                <div className="space-y-8">
                    {blogPosts.map(({id, date, title, image, link}) => (
                        <BlogPost key={id} date={date} title={title} image={image} link={link}/>
                    ))}
                </div>
            </div>
        </>
    )
}

const SafariWindow = WindowWrapper(Safari, "safari");
export default SafariWindow;
