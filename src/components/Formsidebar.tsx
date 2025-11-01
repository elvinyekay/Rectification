import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
    id: string;
    label: string;
    children?: MenuItem[];
}

interface FormSidebarProps {
    items: MenuItem[];
    onSelect: (sectionId: string, subsectionId?: string) => void;
    activeSection?: string;
    activeSubsection?: string;
}

export default function FormSidebar({
                                        items,
                                        onSelect,
                                        activeSection,
                                        activeSubsection,
                                    }: FormSidebarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const toggleExpand = (id: string) => {
        setExpandedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleItemClick = (item: MenuItem, parentId?: string) => {
        if (item.children && item.children.length > 0) {
            toggleExpand(item.id);
        } else {
            onSelect(parentId || item.id, item.children ? undefined : item.id);
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Hamburger Button - Sağ tərəf */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow"
                title="Menyunu aç"
            >
                {isOpen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/30 rounded-lg z-40"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar - SAĞDAN AÇILIR */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: isOpen ? 0 : "100%" }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute right-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 z-40 overflow-y-auto shadow-lg rounded-lg"
            >
                <div className="pt-4 pb-6 px-4 space-y-2">
                    {items.map((item) => (
                        <div key={item.id}>
                            {/* Main Item */}
                            <button
                                onClick={() => handleItemClick(item)}
                                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
                                    activeSection === item.id
                                        ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-semibold"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}
                            >
                                <span className="text-sm font-medium">{item.label}</span>
                                {item.children && item.children.length > 0 && (
                                    <motion.div
                                        animate={{
                                            rotate: expandedItems.includes(item.id) ? 180 : 0,
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </motion.div>
                                )}
                            </button>

                            {/* Sub Items */}
                            <AnimatePresence>
                                {item.children &&
                                    item.children.length > 0 &&
                                    expandedItems.includes(item.id) && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="mt-1 mr-2 space-y-1 border-r-2 border-gray-200 dark:border-gray-700 pr-2"
                                        >
                                            {item.children.map((subItem) => (
                                                <button
                                                    key={subItem.id}
                                                    onClick={() =>
                                                        handleItemClick(subItem, item.id)
                                                    }
                                                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                                                        activeSubsection === subItem.id &&
                                                        activeSection === item.id
                                                            ? "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-medium"
                                                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    }`}
                                                >
                                                    {subItem.label}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </motion.div>
        </>
    );
}