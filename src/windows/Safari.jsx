import React from 'react'
import { WindowControls } from "#components/index.js";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {ChevronLeft, ChevronRight, Copy, MoveRight, PanelLeft, Plus, ShieldHalf, Search, Share, Star} from "lucide-react";
import {blogPosts} from "#constants/index.js";

const Safari = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="safari" />
                <PanelLeft className="ml-10 icon" />
                <div className="flex items-center gap-1 ml-5">
                    <ChevronLeft className="icon" />
                    <ChevronRight className="icon" />
                </div>
                <div className="flex-1 flex-center gap-3">
                    <ShieldHalf className="icon" />
                    <div className="search">
                        <Search className="icon" />
                        <input type="text" placeholder="Search or enter URL" className="flex-1" />
                        <Star className="icon" />
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <ShieldHalf className="icon" />
                    <div className="search">
                        <Share className="icon" />
                        <Plus className="icon" />
                        <Copy className="icon" />
                    </div>
                </div>
            </div>
            <div className="blog">
                <h2>My Developer Blogs</h2>
                <div className="space-y-8">
                    {blogPosts.map(({id, date, title, image, link}) => (
                        <div className="blog-post" key={id}>
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
                    ))}
                </div>
            </div>
        </>
    )
}

const SafariWindow = WindowWrapper(Safari, "safari");
export default SafariWindow;
