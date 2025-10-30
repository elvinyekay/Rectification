import  { useEffect, useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../../components/ui/button/Button.tsx";
import {CheckLineIcon, CloseIcon, PencilIcon} from "../../../icons";
import InputField from "../../../components/form/input/InputField.tsx";
import Checkbox from "../../../components/form/input/Checkbox.tsx";

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
    const [newValue, setNewValue] = useState("");

    const changed = !accepted && newValue.trim() !== "" && newValue !== originalValue;
    const finalValue = accepted ? originalValue : (newValue.trim() || originalValue);

    useEffect(() => {
        onChange?.({ accepted, originalValue, newValue, finalValue, changed });
    }, [accepted, newValue]); // eslint-disable-line

    const startEdit = () => {
        setAccepted(false);
        setEditing(true);
        setNewValue((v) => v || originalValue);
    };

    const cancelEdit = () => {
        setEditing(false);
        setNewValue("");
        setAccepted(true);
    };

    const saveEdit = () => {
        if (required && newValue.trim() === "") return;
        setEditing(false);
        setAccepted(false);
    };

    const toggleAccepted = (checked: boolean) => {
        setAccepted(checked);
        if (checked) {
            setEditing(false);
            setNewValue("");
        }
    };

    return (
        <div className="space-y-2 rounded-xl border border-gray-200 dark:border-gray-800 p-3 mb-2">
            <div className="flex items-start justify-between gap-3">
                <label className="text-xs font-medium text-gray-800 dark:text-gray-100">
                    {label}
                </label>

                <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-2 text-sm">
                        <Checkbox
                            className="h-4 w-4 accent-cyan-600 disabled:opacity-40"
                            checked={accepted}
                            disabled={editing}
                            onChange={toggleAccepted}
                        />
                    </label>
                    <Button
                        variant={"gradient"}
                        color={"light"}
                        size={"xs"}
                        onClick={startEdit}
                        disabled={editing}
                        className="ml-1 inline-flex items-center rounded-md border border-gray-300 dark:border-gray-700 px-2 py-1 text-xs
                       hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-50 transition"
                    >
                        <PencilIcon/>
                    </Button>
                </div>
            </div>

            <div className="text-md">
                <div className="text-gray-800 dark:text-gray-200 break-words">
                    {originalValue || "—"}
                </div>

                {!accepted && newValue.trim() !== "" && (
                    <div className="mt-1 flex items-start gap-2">
                        <span className="inline-flex select-none px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300 text-xs">
                            Düzəliş
                        </span>
                        <span className="text-gray-900 dark:text-gray-100 break-words">
                            {newValue}
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
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            placeholder={placeholder}
                            aria-invalid={required && newValue.trim() === ""}
                        />
                        <div className="flex items-center gap-2">
                            <Button
                                variant={"gradient"}
                                color={"green"}
                                size={"xs"}
                                onClick={saveEdit}
                                disabled={required && newValue.trim() === ""}
                            >
                                 <CheckLineIcon/>
                            </Button>
                            <Button
                                variant={"gradient"}
                                color={"light"}
                                size={"xs"}
                                onClick={cancelEdit}
                            >
                                <CloseIcon/>
                            </Button>
                        </div>
                        {required && newValue.trim() === "" && (
                            <p className="text-xs text-red-600">Bu sahə məcburidir.</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
