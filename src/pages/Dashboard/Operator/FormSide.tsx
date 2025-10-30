import Button from "../../../components/ui/button/Button.tsx";
import VerifiableField from "./VerifiableField.tsx";

interface Props {
    isSubmitting: boolean
}

const FormSide = ({isSubmitting}:Props) => {
    return (
        <div className="h-full flex flex-col mx-2 my-2">


            <VerifiableField
                label="Sənədin seriya nömrəsi"
                originalValue="12saxw232"
                onChange={(v) => {console.log(v);}}
            />

            <VerifiableField
                label="Sənədin adı"
                originalValue="ev çıxarışı"
                onChange={(v) => {console.log(v);}}
            />


            <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-2 justify-end">
                <Button
                    variant={"gradient"}
                    color={"cyan"}
                    size={"xs"}
                    disabled={isSubmitting}
                >
                    Keç
                </Button>
                <Button
                    variant={"gradient"}
                    color={"red"}
                    size={"xs"}
                    disabled={isSubmitting}
                >
                    Rədd et
                </Button>
                <Button
                    variant={"gradient"}
                    color={"green"}
                    size={"xs"}
                    disabled={isSubmitting}
                >
                    Təsdiqlə & Növbəti
                </Button>
            </div>
        </div>
    );
};

export default FormSide;