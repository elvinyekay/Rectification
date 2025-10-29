import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    size?: "sm" | "md" | "xs";
    variant?: "primary" | "outline" | "gradient" | "pill" | "outline-gradient";
    color?: "default" | "dark" | "green" | "red" | "yellow" | "purple" | "blue" | "cyan" | "teal" | "lime" | "pink" | "alternative" | "light";
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           size = "md",
                                           variant = "primary",
                                           color = "default",
                                           startIcon,
                                           endIcon,
                                           onClick,
                                           className = "",
                                           disabled = false,
                                           type = "button",
                                       }) => {
    // Size Classes
    const sizeClasses = {
        xs: "px-3 py-2 text-sm",
        sm: "px-4 py-3 text-sm",
        md: "px-5 py-3.5 text-sm",
    };

    // Outline Variant Classes
    const outlineClasses = {
        default: "border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white",
        dark: "border-2 border-gray-800 text-gray-800 bg-transparent hover:bg-gray-800 hover:text-white dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-900",
        green: "border-2 border-green-700 text-green-700 bg-transparent hover:bg-green-700 hover:text-white dark:border-green-600 dark:text-green-600 dark:hover:bg-green-600 dark:hover:text-white",
        red: "border-2 border-red-600 text-red-600 bg-transparent hover:bg-red-600 hover:text-white dark:border-red-500 dark:text-red-500 dark:hover:bg-red-500 dark:hover:text-white",
        yellow: "border-2 border-yellow-400 text-yellow-600 bg-transparent hover:bg-yellow-400 hover:text-gray-900 dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-300 dark:hover:text-gray-900",
        purple: "border-2 border-purple-600 text-purple-600 bg-transparent hover:bg-purple-600 hover:text-white dark:border-purple-500 dark:text-purple-500 dark:hover:bg-purple-500 dark:hover:text-white",
        blue: "border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white",
        cyan: "border-2 border-cyan-500 text-cyan-600 bg-transparent hover:bg-cyan-500 hover:text-white dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400 dark:hover:text-white",
        teal: "border-2 border-teal-500 text-teal-600 bg-transparent hover:bg-teal-500 hover:text-white dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-400 dark:hover:text-white",
        lime: "border-2 border-lime-500 text-lime-600 bg-transparent hover:bg-lime-500 hover:text-gray-900 dark:border-lime-400 dark:text-lime-400 dark:hover:bg-lime-400 dark:hover:text-gray-900",
        pink: "border-2 border-pink-600 text-pink-600 bg-transparent hover:bg-pink-600 hover:text-white dark:border-pink-500 dark:text-pink-500 dark:hover:bg-pink-500 dark:hover:text-white",
    };

    // Outline Gradient Classes - border gradient
    const outlineGradientClasses = {
        blue: "relative bg-white text-blue-600 hover:text-white dark:bg-gray-900 dark:text-blue-400",
        green: "relative bg-white text-green-600 hover:text-white dark:bg-gray-900 dark:text-green-400",
        cyan: "relative bg-white text-cyan-600 hover:text-white dark:bg-gray-900 dark:text-cyan-400",
        teal: "relative bg-white text-teal-600 hover:text-white dark:bg-gray-900 dark:text-teal-400",
        lime: "relative bg-white text-lime-600 hover:text-gray-900 dark:bg-gray-900 dark:text-lime-400",
        red: "relative bg-white text-red-600 hover:text-white dark:bg-gray-900 dark:text-red-400",
        pink: "relative bg-white text-pink-600 hover:text-white dark:bg-gray-900 dark:text-pink-400",
        purple: "relative bg-white text-purple-600 hover:text-white dark:bg-gray-900 dark:text-purple-400",
        default: "relative bg-white text-blue-600 hover:text-white dark:bg-gray-900 dark:text-blue-400",
    };

    // Gradient border colors for outline-gradient
    const gradientBorderStyles: Record<string, string> = {
        blue: "linear-gradient(to right, rgb(59, 130, 246), rgb(29, 78, 216))",
        green: "linear-gradient(to right, rgb(74, 222, 128), rgb(22, 163, 74))",
        cyan: "linear-gradient(to right, rgb(103, 232, 249), rgb(6, 182, 212))",
        teal: "linear-gradient(to right, rgb(94, 234, 212), rgb(20, 184, 166))",
        lime: "linear-gradient(to right, rgb(190, 242, 100), rgb(132, 204, 22))",
        red: "linear-gradient(to right, rgb(248, 113, 113), rgb(220, 38, 38))",
        pink: "linear-gradient(to right, rgb(236, 72, 153), rgb(190, 24, 93))",
        purple: "linear-gradient(to right, rgb(168, 85, 247), rgb(126, 34, 206))",
        default: "linear-gradient(to right, rgb(59, 130, 246), rgb(29, 78, 216))",
    };

    // Gradient Variant Classes
    const gradientClasses = {
        blue: "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800",
        green: "bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700",
        cyan: "bg-gradient-to-r from-cyan-400 to-cyan-600 text-white hover:from-cyan-500 hover:to-cyan-700",
        teal: "bg-gradient-to-r from-teal-400 to-teal-600 text-white hover:from-teal-500 hover:to-teal-700",
        lime: "bg-gradient-to-r from-lime-400 to-lime-600 text-gray-900 hover:from-lime-500 hover:to-lime-700",
        red: "bg-gradient-to-r from-red-400 to-red-600 text-white hover:from-red-500 hover:to-red-700",
        pink: "bg-gradient-to-r from-pink-500 to-pink-700 text-white hover:from-pink-600 hover:to-pink-800",
        purple: "bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800",
        default: "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800",
        dark: "bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:from-gray-800 hover:to-black",
        yellow: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 hover:from-yellow-500 hover:to-yellow-700",
    };

    // Pill Variant Classes
    const pillClasses = {
        default: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700",
        alternative: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300",
        dark: "bg-gray-800 text-white hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700",
        light: "bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600",
        green: "bg-green-700 text-white hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700",
        red: "bg-red-700 text-white hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700",
        yellow: "bg-yellow-400 text-gray-900 hover:bg-yellow-500 dark:bg-yellow-300 dark:hover:bg-yellow-400",
        purple: "bg-purple-700 text-white hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700",
        blue: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700",
        cyan: "bg-cyan-600 text-white hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700",
        teal: "bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700",
        lime: "bg-lime-500 text-gray-900 hover:bg-lime-600 dark:bg-lime-400 dark:hover:bg-lime-500",
        pink: "bg-pink-600 text-white hover:bg-pink-700 dark:bg-pink-600 dark:hover:bg-pink-700",
    };

    // Primary Variant Classes
    const primaryClasses = "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300";

    // Get the appropriate classes based on variant and color
    const getVariantClasses = () => {
        if (variant === "primary") return primaryClasses;
        if (variant === "outline") return outlineClasses[color as keyof typeof outlineClasses] || outlineClasses.default;
        if (variant === "outline-gradient") return outlineGradientClasses[color as keyof typeof outlineGradientClasses] || outlineGradientClasses.default;
        if (variant === "gradient") return gradientClasses[color as keyof typeof gradientClasses] || gradientClasses.blue;
        if (variant === "pill") return pillClasses[color as keyof typeof pillClasses] || pillClasses.default;
        return primaryClasses;
    };

    // Border radius based on variant
    const borderRadius = variant === "pill" ? "rounded-full" : "rounded-lg";

    // Gradient border style for outline-gradient
    const gradientBorderStyle = variant === "outline-gradient"
        ? {
            background: gradientBorderStyles[color] || gradientBorderStyles.default,
            padding: "2px",
        }
        : {};

    if (variant === "outline-gradient") {
        return (
            <div
                style={gradientBorderStyle}
                className={`inline-flex ${borderRadius} group transition ${
                    disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                <button
                    className={`inline-flex items-center justify-center gap-2 font-medium transition w-full group-hover:bg-gradient-to-r ${
                        color === "blue" ? "group-hover:from-blue-500 group-hover:to-blue-700" :
                            color === "green" ? "group-hover:from-green-400 group-hover:to-green-600" :
                                color === "cyan" ? "group-hover:from-cyan-400 group-hover:to-cyan-600" :
                                    color === "teal" ? "group-hover:from-teal-400 group-hover:to-teal-600" :
                                        color === "lime" ? "group-hover:from-lime-400 group-hover:to-lime-600" :
                                            color === "red" ? "group-hover:from-red-400 group-hover:to-red-600" :
                                                color === "pink" ? "group-hover:from-pink-500 group-hover:to-pink-700" :
                                                    color === "purple" ? "group-hover:from-purple-500 group-hover:to-purple-700" :
                                                        "group-hover:from-blue-500 group-hover:to-blue-700"
                    } ${className} ${sizeClasses[size]} ${getVariantClasses()} ${borderRadius}`}
                    onClick={onClick}
                    disabled={disabled}
                    type={type}
                >
                    {startIcon && <span className="flex items-center">{startIcon}</span>}
                    {children}
                    {endIcon && <span className="flex items-center">{endIcon}</span>}
                </button>
            </div>
        );
    }

    return (
        <button
            className={`inline-flex items-center justify-center gap-2 font-medium transition ${className} ${
                sizeClasses[size]
            } ${getVariantClasses()} ${borderRadius} ${
                disabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {startIcon && <span className="flex items-center">{startIcon}</span>}
            {children}
            {endIcon && <span className="flex items-center">{endIcon}</span>}
        </button>
    );
};

export default Button;