import { useEffect, useState } from "react";
import { Actions } from "./getActions";
import { useAuthContext } from "@/contexts/authContext";
import { TypeNotification } from "./getTypeNotification";
import SuccessNotification from "./SuccessNotification";
import ErrorNotification from "./ErrorNotification";

interface Props {
    dict: any;
}

export default function AllNotificationsPanel({ dict }: Props) {
    const [show, setShow] = useState(false);
    const { notification, notificationOnChange, action, typeNotification } = useAuthContext();

    useEffect(() => {
        setShow(true);
        setTimeout(() => {
            setShow(false);
            notificationOnChange(false);
        }, 3000);
    }, [notification, notificationOnChange]);

    return (
        <div>
            {notification && (
                <div className="relative top-0 right-0">
                    {action === Actions.CREATE_HOLIDAY &&
                        typeNotification === TypeNotification.SUCCESS && (
                            <SuccessNotification
                                title={dict?.panel?.notifications?.addHoliday?.success?.title}
                                description={
                                    dict?.panel?.notifications?.addHoliday?.success?.description
                                }
                                show={show}
                                setShow={setShow}
                            />
                        )}
                    {action === Actions.CREATE_HOLIDAY &&
                        typeNotification === TypeNotification.ERROR && (
                            <ErrorNotification
                                title={dict?.panel?.notifications?.addHoliday?.error?.title}
                                description={
                                    dict?.panel?.notifications?.addHoliday?.error?.description
                                }
                                show={show}
                                setShow={setShow}
                            />
                        )}
                    {action === Actions.DELETE_HOLIDAY &&
                        typeNotification === TypeNotification.SUCCESS && (
                            <SuccessNotification
                                title={dict?.panel?.notifications?.removeHoliday?.success?.title}
                                description={
                                    dict?.panel?.notifications?.removeHoliday?.success?.description
                                }
                                show={show}
                                setShow={setShow}
                            />
                        )}
                    {action === Actions.DELETE_HOLIDAY &&
                        typeNotification === TypeNotification.ERROR && (
                            <ErrorNotification
                                title={dict?.panel?.notifications?.removeHoliday?.error?.title}
                                description={
                                    dict?.panel?.notifications?.removeHoliday?.error?.description
                                }
                                show={show}
                                setShow={setShow}
                            />
                        )}
                    {action === Actions.UPDATE_INFO &&
                        typeNotification === TypeNotification.SUCCESS && (
                            <SuccessNotification
                                title={dict?.panel?.notifications?.updateInfo?.success?.title}
                                description={
                                    dict?.panel?.notifications?.updateInfo?.success?.description
                                }
                                show={show}
                                setShow={setShow}
                            />
                        )}
                    {action === Actions.UPDATE_INFO &&
                        typeNotification === TypeNotification.ERROR && (
                            <ErrorNotification
                                title={dict?.panel?.notifications?.updateInfo?.error?.title}
                                description={
                                    dict?.panel?.notifications?.updateInfo?.error?.description
                                }
                                show={show}
                                setShow={setShow}
                            />
                        )}
                    {action === Actions.UPDATE_PASS &&
                        typeNotification === TypeNotification.SUCCESS && (
                            <SuccessNotification
                                title={dict?.panel?.notifications?.updatePass?.success?.title}
                                description={
                                    dict?.panel?.notifications?.updatePass?.success?.description
                                }
                                show={show}
                                setShow={setShow}
                            />
                        )}
                    {action === Actions.UPDATE_PASS &&
                        typeNotification === TypeNotification.ERROR && (
                            <ErrorNotification
                                title={dict?.panel?.notifications?.updatePass?.error?.title}
                                description={
                                    dict?.panel?.notifications?.updatePass?.error?.description
                                }
                                show={show}
                                setShow={setShow}
                            />
                        )}
                    {action === Actions.DELETE_ACCOUNT &&
                        typeNotification === TypeNotification.ERROR && (
                            <ErrorNotification
                                title={dict?.panel?.notifications?.deleteAccount?.error?.title}
                                description={
                                    dict?.panel?.notifications?.deleteAccount?.error?.description
                                }
                                show={show}
                                setShow={setShow}
                            />
                        )}
                    {action === Actions.CREATE_GROUP &&
                        typeNotification === TypeNotification.SUCCESS && (
                            <SuccessNotification
                                title={dict?.panel?.notifications?.addGroup?.success?.title}
                                description={
                                    dict?.panel?.notifications?.addGroup?.success?.description
                                }
                                show={show}
                                setShow={setShow}
                            />
                        )}
                    {action === Actions.CREATE_GROUP &&
                        typeNotification === TypeNotification.ERROR && (
                            <ErrorNotification
                                title={dict?.panel?.notifications?.addGroup?.error?.title}
                                description={
                                    dict?.panel?.notifications?.addGroup?.error?.description
                                }
                                show={show}
                                setShow={setShow}
                            />
                        )}
                    {action === Actions.DELETE_GROUP &&
                        typeNotification === TypeNotification.SUCCESS && (
                            <SuccessNotification
                                title={dict?.panel?.notifications?.removeGroup?.success?.title}
                                description={
                                    dict?.panel?.notifications?.removeGroup?.success?.description
                                }
                                show={show}
                                setShow={setShow}
                            />
                        )}
                    {action === Actions.DELETE_GROUP &&
                        typeNotification === TypeNotification.ERROR && (
                            <ErrorNotification
                                title={dict?.panel?.notifications?.removeGroup?.error?.title}
                                description={
                                    dict?.panel?.notifications?.removeGroup?.error?.description
                                }
                                show={show}
                                setShow={setShow}
                            />
                        )}
                    {action === Actions.GETOUT_GROUP &&
                        typeNotification === TypeNotification.SUCCESS && (
                            <SuccessNotification
                                title={dict?.panel?.notifications?.getOutGroup?.success?.title}
                                description={
                                    dict?.panel?.notifications?.getOutGroup?.success?.description
                                }
                                show={show}
                                setShow={setShow}
                            />
                        )}
                    {action === Actions.GETOUT_GROUP &&
                        typeNotification === TypeNotification.ERROR && (
                            <ErrorNotification
                                title={dict?.panel?.notifications?.getOutGroup?.error?.title}
                                description={
                                    dict?.panel?.notifications?.getOutGroup?.error?.description
                                }
                                show={show}
                                setShow={setShow}
                            />
                        )}
                </div>
            )}
        </div>
    );
}
