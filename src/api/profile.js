import { ROUTE_BASE } from "@/api/index";

export async function apiUpdateProfile(id, data, token) {
    const res = await fetch(`${ROUTE_BASE}/api/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = new Error("An error occurred while fetching data profile");

        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
}

export async function apiChangePassword(data, token) {
    const res = await fetch(`${ROUTE_BASE}/api/auth/change-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = new Error("An error occurred while fetching data profile");

        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
}
