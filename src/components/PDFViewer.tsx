import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

export default function PDFViewer({ url }: { url: string }) {
    const layout = defaultLayoutPlugin();
    const workerUrl = '/pdf.worker.min.js';

    return (
        <div className="h-[80vh]">
            <Worker workerUrl={workerUrl}>
                <Viewer fileUrl={url} plugins={[layout]} />
            </Worker>
        </div>
    );
}
