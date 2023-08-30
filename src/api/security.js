import { ROUTE_BASE } from "@/api/index";

export async function apiLogin(email, password) {
    const res = await fetch(`${ROUTE_BASE}/api/auth/local`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            identifier: email,
            password: password,
        }),
    });

    if (!res.ok) {
        const error = new Error("An error occurred while fetching the login data");

        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
}

export async function apiProfile(token) {
    const res = await fetch(`${ROUTE_BASE}/api/users/me?populate[0]=groups`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const error = new Error("An error occurred while fetching data profile");

        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
}
