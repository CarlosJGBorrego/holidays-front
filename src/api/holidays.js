import { ROUTE_BASE } from "@/api/index";

export async function apiHolidaysByUserEmail(email, token) {
    const res = await fetch(`${ROUTE_BASE}/api/holidays/user/${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const error = new Error("An error occurred while fetching holidays by email");

        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
}

export async function apiCreateHoliday(data, token) {
    const res = await fetch(`${ROUTE_BASE}/api/holidays`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = new Error("An error occurred while fetching holidays by email");

        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
}

export async function apiDeleteHoliday(id, token) {
    const res = await fetch(`${ROUTE_BASE}/api/holidays/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const error = new Error("An error occurred while fetching holidays by email");

        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
}
