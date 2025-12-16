import {useState} from "react";
import {Download, ChevronLeft, ChevronRight, ExternalLink, Ellipsis} from "lucide-react";
import {Document, Page, pdfjs} from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {WindowControls} from "#components/index.js";
import useWindowStore from "#store/window.js";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const Resume = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);
    const { windows } = useWindowStore();
    const data = windows?.resume?.data;

    if (!data || !data.href) return null;

    function onDocumentLoadSuccess({ numPages }) {
        setIsLoaded(true);
        setNumPages(numPages);
        setPageNumber(1);
    }

    function onDocumentLoadProgress() { setIsLoaded(false); }
    function changePage(offset) { setPageNumber(prevPageNumber => prevPageNumber + offset); }
    function previousPage() { changePage(-1); }
    function nextPage() { changePage(1); }

    const myPDF = data?.href || null;
    const title = data?.name || "Resume.pdf";

    return (
        <>
            <div id="window-header">
                <a href={myPDF} target="_blank" rel="noopener noreferrer" title="Download resume" download className="cursor-pointer">
                    <Download />
                </a>
                <a href={myPDF} target="_blank" rel="noopener noreferrer" title="View resume in new tab" className="pl-2 cursor-pointer">
                    <ExternalLink />
                </a>
                <h2>{title}</h2>
                { numPages > 1 ?
                    <div className="w-1/2 flex items-center">
                        <div className="flex items-center gap-1 mr-2">
                            <ChevronLeft
                                className={`icon ${pageNumber <= 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                onClick={pageNumber > 1 ? previousPage : null}
                            />
                            <ChevronRight
                                className={`icon ${pageNumber >= numPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                onClick={pageNumber < numPages ? nextPage : null}
                            />
                        </div>
                        <p className="flex items-center text-md font-bold">Pg: {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}</p>
                    </div>
                : null }

                <WindowControls target="resume" />
            </div>
            {!isLoaded ?
                <Ellipsis className="w-full h-5 bg-white mx-auto" title="Loading resume..." />
            : null }
            <Document
                file={myPDF}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadProgress={onDocumentLoadProgress}
                loading=""
                className="bg-white"
            >
                <Page pageNumber={pageNumber} width={600} />
            </Document>

        </>
    )
}

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
