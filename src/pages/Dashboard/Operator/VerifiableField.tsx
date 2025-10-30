import { useEffect, useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../../components/ui/button/Button";
import { CheckLineIcon, CloseIcon, PencilIcon } from "../../../icons";
import InputField from "../../../components/form/input/InputField";
import Checkbox from "../../../components/form/input/Checkbox";

type VerifiableFieldProps = {
    label: string;
    originalValue: string;
    placeholder?: string;
    required?: boolean;
    onChange?: (payload: {
        accepted: boolean;
        originalValue: string;
        newValue?: string;
        finalValue: string;
        changed: boolean;
    }) => void;
};

export default function VerifiableFieldEditable({
                                                    label,
                                                    originalValue,
                                                    placeholder = "Yeni dəyəri daxil edin",
                                                    required = false,
                                                    onChange,
                                                }: VerifiableFieldProps) {
    const id = useId();

    const [accepted, setAccepted] = useState(false);
    const [editing, setEditing] = useState(false);

    // draft və commit ayrıldı
    const [inputValue, setInputValue] = useState("");
    const [correction, setCorrection] = useState("");

    const correctionExists = correction.trim() !== "";
    const changed = !accepted && correctionExists && correction !== originalValue;
    const finalValue = accepted ? originalValue : (correctionExists ? correction : originalValue);

    useEffect(() => {
        onChange?.({ accepted, originalValue, newValue: correction, finalValue, changed });
    }, [accepted, correction]);

    const startEdit = () => {
        setEditing(true);
        setInputValue(prev => prev || correction || originalValue);
    };

    const cancelEdit = () => {
        setEditing(false);
        setInputValue(correction || "");
    };

    const saveEdit = () => {
        const v = inputValue.trim();
        if (required && v === "") return;
        setCorrection(v);   // ✅ indi "Düzəliş" göstəriləcək
        setEditing(false);
        setAccepted(false); // düzəliş rejimidir
    };

    const toggleAccepted = (checked: boolean) => {
        setAccepted(checked);
        if (checked) {
            setEditing(false);
            setInputValue("");
            setCorrection("");
        }
    };

    return (
        <div className="space-y-2 rounded-xl border border-gray-200 dark:border-gray-800 p-3">
            <div className="flex items-start justify-between gap-3">
                <label className="text-xs font-medium text-gray-800 dark:text-gray-100">
                    {label}
                </label>

                <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-2 text-sm">
                        <Checkbox
                            className="h-4 w-4 accent-cyan-600 disabled:opacity-40"
                            checked={accepted}
                            disabled={editing || correctionExists}
                            onChange={toggleAccepted}
                        />
                    </label>
                    <Button
                        variant="gradient"
                        color="light"
                        size="xs"
                        onClick={startEdit}
                        disabled={editing || accepted}
                        className="ml-1 inline-flex items-center rounded-md border border-gray-300 dark:border-gray-700 px-2 py-1 text-xs
                       hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-50 transition"
                    >
                        <PencilIcon />
                    </Button>
                </div>
            </div>

            <div className="text-md">
                <div className="text-gray-800 dark:text-gray-200 break-words">
                    {originalValue || "—"}
                </div>

                {!accepted && correctionExists && (
                    <div className="mt-1 flex items-start gap-2">
            <span className="inline-flex select-none px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300 text-xs">
              Düzəliş
            </span>
                        <span className="text-gray-900 dark:text-gray-100 break-words">
              {correction}
            </span>
                    </div>
                )}
            </div>

            <AnimatePresence initial={false}>
                {editing && (
                    <motion.div
                        key="edit-field"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden space-y-2"
                    >
                        <InputField
                            id={id}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={placeholder}
                            aria-invalid={required && inputValue.trim() === ""}
                        />

                        <div className="flex items-center gap-2">
                            <Button
                                variant="gradient"
                                color="green"
                                size="xs"
                                onClick={saveEdit}
                                disabled={required && inputValue.trim() === ""}
                            >
                                <CheckLineIcon />
                            </Button>

                            <Button
                                variant="gradient"
                                color="light"
                                size="xs"
                                onClick={cancelEdit}
                            >
                                <CloseIcon />
                            </Button>
                        </div>

                        {required && inputValue.trim() === "" && (
                            <p className="text-xs text-red-600">Bu sahə məcburidir.</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
