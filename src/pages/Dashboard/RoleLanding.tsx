import {useAppSelector} from "../../store/hooks.ts";
import {Navigate} from "react-router";
import AdminHome from "./AdminHome.tsx";

const RoleLanding = () => {
    const role = useAppSelector(s => s.auth.user?.role);
    if (!role) return null;

    if(role === "admin"){
        return <AdminHome />
    }
    
    return <Navigate to={"/tables"} replace />;
};

export default RoleLanding;