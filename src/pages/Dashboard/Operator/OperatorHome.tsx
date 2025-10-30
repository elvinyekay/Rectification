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
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                    Məlumat formu
                </h3>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Müştəri</label>
                        <input
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:ring-2 ring-brand-500"
                            placeholder="Ad Soyad"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Sənəd tipi</label>
                        <select
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:ring-2 ring-brand-500"
                        >
                            <option value="">Seçin</option>
                            <option value="passport">Passport</option>
                            <option value="invoice">Invoice</option>
                            <option value="other">Digər</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-xs text-gray-500 mb-1">Qeydlər</label>
                    <textarea
                        rows={5}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:ring-2 ring-brand-500"
                        placeholder="Qısa izahat..."
                    />
                </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-2 justify-end">
                <Button
                    variant={"gradient"}
                    color={"cyan"}
                    disabled={isSubmitting}
                >
                    Keç
                </Button>
                <Button
                    variant={"gradient"}
                    color={"red"}
                    size={"sm"}
                    disabled={isSubmitting}
                >
                    Rədd et
                </Button>
                <Button
                    variant={"gradient"}
                    color={"green"}
                    disabled={isSubmitting}
                >
                    Təsdiqlə & Növbəti
                </Button>
            </div>
        </div>
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