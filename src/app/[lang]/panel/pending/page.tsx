import { apiProfile } from "@/api";
import { IUser } from "@/components/interfaces/user";
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
    const user: IUser = await apiProfile(token);

    return (
        <Panel lang={lang} dict={dict} user={user}>
            <div className="mx-10">
                <h1 className="font-semibold text-lg mb-2.5">Cosas pendientes</h1>
                <ul className="space-y-1">
                    <li>1. Borrar en cascada los holidays cuando se elimina un usuario.</li>
                    <li>2. Añadir rol admin a la persona que cree un grupo.</li>
                    <li className="ml-5">
                        2.1 Si se elimina a esa persona, comprobar si hay mas gente en el grupo,
                        sino hay eliminar grupo.
                    </li>
                    <li className="ml-5">
                        2.2 En caso de que haya más gente, asignar el admin al siguiente de la
                        lista.
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
                    <li>
                        4. Añadir prop color a grupos y que solo el admin del grupo pueda editar.
                    </li>
                </ul>
            </div>
        </Panel>
    );
}
