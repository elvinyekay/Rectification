import SplitView from "../../../components/SplitView";
import {
    useGetNextDocumentQuery,
    useSubmitDocumentMutation,
} from "../../../store/services/documentsApi";
import {NextDoc, NextDocResponse} from "../../../types/document.ts";
import Button from "../../../components/ui/button/Button.tsx";
import { useEffect, useRef, useState} from "react";
import {ReverseIcon} from "../../../icons";
import {Maximize2, Minimize2} from "lucide-react";
import PDFViewer from "../../../components/PDFViewer";
import FormSide from "./FormSide.tsx";


const OperatorHome = () => {
    const [reversed, setReversed] = useState(false);
    const [fullPane, setFullPane] = useState<"left" | "right" | null>(null);
    const leftContainerRef = useRef<HTMLDivElement>(null);
    const rightContainerRef = useRef<HTMLDivElement>(null);
    const lastPaneRef = useRef<"left" | "right" | null>(null);
    const {data, isLoading, isFetching} = useGetNextDocumentQuery();
    const [, {isLoading: isSubmitting}] = useSubmitDocumentMutation();

    const hasDoc = (r: NextDocResponse): r is NextDoc =>
        r && !r.done && !!r.document;


    const isLoadingState = isLoading || isFetching;

    const renderLeft = (fullscreen: boolean) => (
        <div
            ref={leftContainerRef}
            className="h-full flex flex-col"
            onMouseEnter={() => (lastPaneRef.current = "left")}
            onFocusCapture={() => (lastPaneRef.current = "left")}
        >
            <div className="flex items-center justify-between px-3 py-2">
                <span className="text-xs text-gray-500">
                    {isLoadingState ? "Yüklənir..." : ""}
                </span>
                <button
                    type="button"
                    aria-label={fullscreen ? "Paneli bərpa et" : "Paneli böyüt"}
                    onClick={() => setFullPane(fullscreen ? null : "left")}
                    className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300 disabled:opacity-60"
                >
                    {fullscreen ? <Minimize2 size={14}/> : <Maximize2 size={14}/>}
                </button>
            </div>

            <div className="flex-1 overflow-auto">
                {data && hasDoc(data) ? (
                    data.document.fileUrl ? (
                        <PDFViewer url={data.document.fileUrl}/>
                    ) : data.document.imageUrl ? (
                        <img src={data.document.imageUrl} alt="document" className="max-h-full w-full object-contain"/>
                    ) : (
                        <div className="grid h-full place-items-center text-sm text-gray-500">Fayl yoxdur</div>
                    )
                ) : (
                    <div className="grid h-full place-items-center text-sm text-gray-500">Növbə boşdur</div>
                )}
            </div>
        </div>
    );

    const renderRight = (fullscreen: boolean) => (
        <div
            ref={rightContainerRef}
            className="h-full flex flex-col"
            onMouseEnter={() => (lastPaneRef.current = "right")}
            onFocusCapture={() => (lastPaneRef.current = "right")}
        >
            <div className="flex items-center justify-end px-3 py-2">
                <button
                    type="button"
                    aria-label={fullscreen ? "Paneli bərpa et" : "Paneli böyüt"}
                    onClick={() => setFullPane(fullscreen ? null : "right")}
                    className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300"
                >
                    {fullscreen ? <Minimize2 size={14}/> : <Maximize2 size={14}/>}
                </button>
            </div>
            <div className="flex-1 overflow-auto">
                <FormSide isSubmitting={isSubmitting}/>
            </div>
        </div>
    );

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (!(event.ctrlKey || event.metaKey) || event.shiftKey || event.altKey) return;
            if (event.key.toLowerCase() !== "f") return;
            event.preventDefault();

            const active = document.activeElement as Node | null;
            const inLeft = active ? leftContainerRef.current?.contains(active) ?? false : false;
            const inRight = active ? rightContainerRef.current?.contains(active) ?? false : false;

            const desired: "left" | "right" = inRight && !inLeft
                ? "right"
                : inLeft && !inRight
                    ? "left"
                    : (lastPaneRef.current ?? "left");

            setFullPane((prev) => {
                return prev === desired ? null : desired;
            });
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">

            <div
                className="flex items-center justify-center gap-2 px-3 pb-1 border-b border-gray-200 dark:border-gray-800">
                <Button
                    onClick={() => setReversed(v => !v)}
                    className="absolute px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-100
                     dark:border-gray-700 dark:hover:bg-white/5 z-9"
                    variant={"gradient"}
                    color={"light"}
                    size={"compact"}
                >
                    <ReverseIcon/>
                </Button>
            </div>
            {fullPane ? (
                <div className="h-full">
                    {fullPane === "left" ? renderLeft(true) : renderRight(true)}
                </div>
            ) : (
                <SplitView
                    left={renderLeft(false)}
                    right={renderRight(false)}
                    initial={56}
                    minLeft={30}
                    minRight={28}
                    reversed={reversed}
                />
            )}
        </div>
    );
}


export default OperatorHome;
