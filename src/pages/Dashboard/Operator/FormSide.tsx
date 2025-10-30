import Button from "../../../components/ui/button/Button.tsx";

interface Props {
    isSubmitting: boolean
}

const FormSide = ({isSubmitting}:Props) => {
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                    Məlumat formu
                </h3>
            </div>



            <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-2 justify-end">
                <Button
                    variant={"gradient"}
                    color={"cyan"}
                    size={"sm"}
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
                    size={"sm"}
                    disabled={isSubmitting}
                >
                    Təsdiqlə & Növbəti
                </Button>
            </div>
        </div>
    );
};

export default FormSide;