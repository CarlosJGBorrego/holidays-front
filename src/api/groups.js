import { ROUTE_BASE } from "@/api/index";

export async function apiCreateGroup(data, token) {
    const res = await fetch(`${ROUTE_BASE}/api/groups`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = new Error("An error occurred while fetching groups");

        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
}

export async function apiGroupsByUser(id, token) {
    const res = await fetch(`${ROUTE_BASE}/api/groups/user/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const error = new Error("An error occurred while fetching groups by me");

        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
}

export async function apiAdminsGroups(token) {
    const res = await fetch(`${ROUTE_BASE}/api/user-groups`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const error = new Error("An error occurred while fetching admin user-groups");

        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
}

export async function apiCreateUserGroup(data, token) {
    const res = await fetch(`${ROUTE_BASE}/api/user-groups`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = new Error("An error occurred while fetching user-groups");

        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
}
