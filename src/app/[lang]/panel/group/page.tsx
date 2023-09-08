import { apiAdminsGroups, apiGroupsByUser, apiProfile } from "@/api";
import ListGroups from "@/components/groups/ListGroups";
import ModalCreateGroup from "@/components/groups/components/ModalCreateGroup";
import { IGroup } from "@/components/interfaces/group";
import { IUser } from "@/components/interfaces/user";
import { IUserGroup } from "@/components/interfaces/userGroups";
import Panel from "@/components/layout/Panel";
import { getDictionary } from "@/dictionaries";
import { cookies } from "next/dist/client/components/headers";

interface Props {
    params: {
        lang: string;
    };
}

export default async function Page({ params: { lang } }: Props) {
    const cookiesStore = cookies();
    const token = cookiesStore.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!)?.value;
    const dict = await getDictionary(lang);
    const me: IUser = await apiProfile(token);
    const groups: IGroup[] = await apiGroupsByUser(me?.id, token);
    const adminsList: IUserGroup[] = await apiAdminsGroups(token);

    return (
        <Panel lang={lang} dict={dict} user={me}>
            <div className="px-8">
                <div className="my-10">
                    <ModalCreateGroup dict={dict} me={me} token={token!} />
                </div>
                <ListGroups
                    groups={groups}
                    dict={dict}
                    admins={adminsList}
                    me={me}
                    token={token!}
                />
            </div>
        </Panel>
    );
}
