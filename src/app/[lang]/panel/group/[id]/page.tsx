import { apiAdminsGroups, apiFindOneGroup, apiProfile } from "@/api";
import GroupId from "@/components/groups/groupId/GroupId";
import { IGroup, IGroupExtend } from "@/components/interfaces/group";
import { IUser } from "@/components/interfaces/user";
import { IUserGroup } from "@/components/interfaces/userGroups";
import Panel from "@/components/layout/Panel";
import { getIdAdmin } from "@/components/utils/getIdAdmin";
import { getDictionary } from "@/dictionaries";
import { cookies } from "next/dist/client/components/headers";

interface Props {
    params: {
        lang: string;
        id: string;
    };
}

type IObject = {
    data: {
        id: number;
        attributes: IGroupExtend;
    };
    meta: Object;
};

export default async function Page({ params: { lang, id } }: Props) {
    const cookiesStore = cookies();
    const token = cookiesStore.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!)?.value;
    const dict = await getDictionary(lang);
    const me: IUser = await apiProfile(token);
    const findGroup: IObject = await apiFindOneGroup(id, token);
    const adminsList: IUserGroup[] = await apiAdminsGroups(token);
    const idUserAdmin = getIdAdmin(adminsList, parseInt(id));

    return (
        <Panel lang={lang} dict={dict} user={me}>
            <div className="px-8">
                <GroupId
                    data={findGroup?.data}
                    me={me}
                    idAdmin={idUserAdmin}
                    dict={dict}
                    token={token!}
                />
            </div>
        </Panel>
    );
}
