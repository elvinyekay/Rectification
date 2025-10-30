import SplitView from "../../../components/SplitView";
import {
    useGetNextDocumentQuery,
    useSubmitDocumentMutation,
} from "../../../store/services/documentsApi";
import {NextDoc, NextDocResponse} from "../../../types/document.ts";
import Button from "../../../components/ui/button/Button.tsx";
import {useState} from "react";
import {ReverseIcon} from "../../../icons";
import PDFViewer from "../../../components/PDFViewer";
import FormSide from "./FormSide.tsx";


const OperatorHome = () => {
    const [reversed, setReversed] = useState(false);
    const {data, isLoading, isFetching} = useGetNextDocumentQuery();
    const [, {isLoading: isSubmitting}] = useSubmitDocumentMutation();

    const hasDoc = (r: NextDocResponse): r is NextDoc =>
        r && !r.done && !!r.document;


    // --- LEFT (viewer) ---
    const left = (
        <div className="h-full flex flex-col">
            {/*<div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">*/}
            {/*    <h3 className="font-semibold text-gray-800 dark:text-gray-100">*/}
            {/*        Sənəd #{data && hasDoc(data) ? data.document.id : "—"}*/}
            {/*    </h3>*/}
            {/*    <span className="ml-auto text-xs text-gray-500">*/}
            {/*        {isLoading || isFetching ? "Yüklənir..." : ""}*/}
            {/*    </span>*/}
            {/*</div>*/}

            <span className="ml-auto text-xs text-gray-500">
                    {isLoading || isFetching ? "Yüklənir..." : ""}
                </span>

            <div className="flex-1 overflow-auto p-4">
                {data && hasDoc(data) ? (
                    data.document.fileUrl ? (
                        <PDFViewer url={data.document.fileUrl}/>
                    ) : data.document.imageUrl ? (
                        <img src={data.document.imageUrl} alt="document"/>
                    ) : (
                        <div>Fayl yoxdur</div>
                    )
                ) : (
                    <div>Növbə boşdur</div>
                )}
            </div>
        </div>
    );

    // --- RIGHT (form) ---
    const right = (
        <FormSide isSubmitting={isSubmitting}/>
    );

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
                    size={"sm"}
                >
                    <ReverseIcon/>
                </Button>
            </div>
            <SplitView left={left} right={right} initial={56} minLeft={30} minRight={28} reversed={reversed}/>
        </div>
    );
}


export default OperatorHome;