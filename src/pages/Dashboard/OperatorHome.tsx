import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne.tsx";

const OperatorHome = () => {
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <h1>Operator home</h1>
            <div className="col-span-12 space-y-6 xl:col-span-12">
                <BasicTableOne />
            </div>
        </div>
    );
};

export default OperatorHome;