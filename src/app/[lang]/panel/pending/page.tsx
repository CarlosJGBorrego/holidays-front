import { apiProfile } from "@/api";
import { IUser } from "@/components/interfaces/user";
import Panel from "@/components/layout/Panel";
import SwitchDarkMode from "@/components/utils/SwitchDarkMode";
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

    return (
        <Panel lang={lang} dict={dict} user={me}>
            <div>
                <div className="mx-10 mb-10">
                    <SwitchDarkMode />
                </div>
                <div className="mx-10">
                    <h1 className="font-semibold text-lg mb-2.5 text-blue-400 dark:text-orange-600">
                        Cosas pendientes
                    </h1>
                    <ul className="space-y-1">
                        <li>1. Borrar en cascada los holidays cuando se elimina un usuario.</li>
                        <li>2. Grupos y rol Admin ✔️</li>
                        <li className="ml-5">
                            2.1 En caso de que haya más gente, asignar el rol a otra persona
                            previamente.
                        </li>
                        <li className="ml-5">
                            2.2 Añadir prop color a grupos y que solo el admin del grupo pueda
                            editar, expulsar gente o añadir.
                        </li>
                        <li className="ml-5">
                            2.3 Agregar el color correspondiente al grupo en BubbleCalendar.
                        </li>
                        <li className="ml-5">
                            2.4 No permitir acceso a usuarios que no sean Admin en group/id
                        </li>
                        <li>3. Añadir propiedad Image a un User ✔️ .</li>
                        <li className="ml-5">3.1 Habilitar el cambiar la imagen del avatar.</li>
                        <li className="ml-5">
                            3.2 Añadir una imagen default para los que no tienen ninguna imagen.
                        </li>
                        <li className="ml-5">
                            3.3 Subir la imagen a Cloudinary o similar para almacenar las imagenes
                            subidas por los usuarios.
                        </li>
                    </ul>
                </div>
            </div>
        </Panel>
    );
}
