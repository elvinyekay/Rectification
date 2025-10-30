import { useEffect, useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../../components/ui/button/Button";
import { CheckLineIcon, CloseIcon, PencilIcon } from "../../../icons";
import InputField from "../../../components/form/input/InputField";

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

    // draft (input) və commit (correction)
    const [inputValue, setInputValue] = useState("");
    const [correction, setCorrection] = useState("");

    // const editDisabled = accepted;

    const correctionExists = correction.trim() !== "";
    const changed = !accepted && correctionExists && correction !== originalValue;
    const finalValue = accepted
        ? originalValue
        : correctionExists
            ? correction
            : originalValue;

    const base =
        "rounded-lg p-4 transition-all duration-200  bg-white/80 " +
        "shadow-sm hover:shadow-md focus-within:shadow-md";

    const stateDefault =
        "border-gray-200 dark:border-gray-800";

    const stateAccepted =
        "border-emerald-300 bg-emerald-50/40 " +
        "ring-1 ring-inset ring-emerald-200/70";

    const stateEditing =
        "border-amber-300 bg-amber-50/50 " +
        "ring-1 ring-inset ring-amber-200/80";

    const containerClass =
        base +
        " " +
        (accepted ? stateAccepted : (editing || correctionExists ? stateEditing : stateDefault));

    const btnGhost =
        "inline-flex items-center justify-center h-8 min-w-8 px-1 rounded-lg " +
        "border border-gray-100 dark:border-gray-700 bg-neutral-100 " +
        "hover:bg-gray-50 dark:hover:bg-white/5 shadow-sm " +
        "transition active:scale-[0.98]";

    const btnDisabled =
        "opacity-50 pointer-events-none";


    useEffect(() => {
        onChange?.({ accepted, originalValue, newValue: correction, finalValue, changed });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accepted, correction]);

    const startEdit = () => {
        setAccepted(false);
        setEditing(true);
        setInputValue((p) => p || correction || originalValue);
    };

    const cancelEdit = () => {
        setEditing(false);
        setInputValue(correction || "");
    };

    const saveEdit = () => {
        const v = inputValue.trim();
        if (required && v === "") return;
        setCorrection(v);
        setEditing(false);
        setAccepted(false);
    };

    const acceptNow = () => {
        if (editing || correctionExists) return;
        setAccepted(prev => !prev);
    };

    const handleContextToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        if (editing) {
            cancelEdit();
        } else {
            startEdit();
        }
    };


    return (
        <div
            className={containerClass}
            onDoubleClick={acceptNow}
            onContextMenu={handleContextToggle}
        >
            <div className="flex items-start justify-between gap-3">
                <label className="text-[10px] uppercase tracking-wide font-semibold text-gray-500">
                    {label}
                </label>

                <div className="flex items-center gap-2">
                    {/* CHECK */}
                    <button
                        onClick={acceptNow}
                        className={[btnGhost, accepted && "ring-2 ring-emerald-300", (editing || correctionExists) && btnDisabled].join(" ")}
                        aria-pressed={accepted}
                    >
                        <CheckLineIcon className="w-4 h-4" color={"oklch(69.6% 0.17 162.48)"} />
                    </button>

                    {/* EDIT */}
                    <button
                        onClick={startEdit}
                        disabled={accepted}
                        className={[btnGhost, accepted && btnDisabled].join(" ")}
                    >
                        <PencilIcon className="w-4 h-4" color={"oklch(75% 0.183 55.934)"} />
                    </button>
                </div>
            </div>

            <div className="text-md">
                <div className="text-gray-800 dark:text-gray-200 break-words">
                    {originalValue || "—"}
                </div>

                {!accepted && correctionExists && (
                    <div className="mt-1 flex items-start gap-2">
                        <span className="inline-flex select-none px-1.5 py-0.5 rounded bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300 text-sm">
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
                        transition={{ duration: 0.25, ease: "easeOut" }}
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
