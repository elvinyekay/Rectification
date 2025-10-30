import Button from "../../../components/ui/button/Button.tsx";
import VerifiableField from "./VerifiableField.tsx";
import {ComponentTabs} from "../../../components/common/ComponentTabs.tsx";
import ComponentTab from "../../../components/common/ComponentTab.tsx";

interface Props {
    isSubmitting: boolean;
}

const FormSide = ({ isSubmitting }: Props) => {
    return (
        <div className="h-full flex flex-col mx-2 my-2">
            <div className="min-h-[40vh] w-full grid place-items-start p-2">
                <ComponentTabs>
                    <ComponentTab
                        value="f1"
                        label="1-ci Fəsil"
                    >
                        <div className="space-y-4 text-slate-700">
                            <ComponentTabs className="mt-2">
                                <ComponentTab value="sub-a" label="Əsas səhifə">
                                    <div className="flex-1 overflow-y-auto space-y-3 pb-24">
                                        <VerifiableField
                                            label="Sənədin seriya nömrəsi"
                                            originalValue="12saxw232"
                                            onChange={(v) => console.log(v)}
                                        />

                                        <VerifiableField
                                            label="Sənədin adı"
                                            originalValue="ev çıxarışı"
                                            onChange={(v) => console.log(v)}
                                        />
                                    </div>
                                </ComponentTab>
                                <ComponentTab value="sub-b" label="Sənədlər-əsaslar">
                                    <div className="text-sm text-slate-600">Sub-tab B məzmunu</div>
                                </ComponentTab>
                                <ComponentTab value="sub-c" label="Məhdudiyyətlər">
                                    <div className="text-sm text-slate-600">Sub-tab C məzmunu</div>
                                </ComponentTab>
                                <ComponentTab value="sub-c" label="Arxiv">
                                    <div className="text-sm text-slate-600">Sub-tab C məzmunu</div>
                                </ComponentTab>
                                <ComponentTab value="sub-c" label="Passport">
                                    <div className="text-sm text-slate-600">Sub-tab C məzmunu</div>
                                </ComponentTab>
                            </ComponentTabs>
                        </div>
                    </ComponentTab>

                    <ComponentTab value="f2" label="2-ci Fəsil">
                        <div className="space-y-2 text-slate-700">
                            <p className="text-sm text-slate-600">İstənilən JSX məzmununu yerləşdirə bilərsən, form da daxil.</p>
                            <label className="block">
                                <span className="text-xs text-slate-500">Şəxsiyyət vəsiqə nömrəsi</span>
                                <input className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="0123456789"/>
                            </label>
                        </div>
                    </ComponentTab>

                    <ComponentTab value="f3" label="3-cü Fəsil" >
                        <div className="text-sm text-slate-600">Son fəsil məzmunu</div>
                    </ComponentTab>
                </ComponentTabs>
            </div>


            <div
                className="sticky bottom-0 left-0 right-0 bg-white dark:bg-gray-900
                           border-t border-gray-200 dark:border-gray-800
                           p-4 flex gap-2 justify-end z-10"
            >
                <Button
                    variant="gradient"
                    color="cyan"
                    size="xs"
                    disabled={isSubmitting}
                >
                    Keç
                </Button>
                <Button
                    variant="gradient"
                    color="red"
                    size="xs"
                    disabled={isSubmitting}
                >
                    Rədd et
                </Button>
                <Button
                    variant="gradient"
                    color="green"
                    size="xs"
                    disabled={isSubmitting}
                >
                    Təsdiqlə & Növbəti
                </Button>
            </div>
        </div>
    );
};

export default FormSide;
