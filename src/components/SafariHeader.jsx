import React from 'react'
import {ChevronLeft, ChevronRight, Copy, PanelLeft, Plus, ShieldHalf, Search, Share, Star} from "lucide-react";
import {WindowControls} from "#components/index.js";
const SafariHeader = () => {
    return (
        <>
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
                    <input type="text" placeholder="Search or enter URL" aria-label="Search or enter URL" className="flex-1" />
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
        </>
    )
}
export default SafariHeader
