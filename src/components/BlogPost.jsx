import React from 'react'
import {MoveRight} from "lucide-react";

const BlogPost = ({date, title, image, link}) => {
    return (
        <div className="blog-post">
            <div className="col-span-2">
                <img src={image} alt={title} loading="lazy" />
            </div>
            <div className="content">
                <h3>{title}</h3>
                <p>{date}</p>
                <a href={link} target="_blank" rel="noopener noreferrer">
                    Check out the full post <MoveRight className="icon-hover" />
                </a>
            </div>
        </div>
    )
}
export default BlogPost
