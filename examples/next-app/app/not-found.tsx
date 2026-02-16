export default function NotFound() {
    return (
        <main style={{ padding: "3rem", textAlign: "center", fontFamily: "sans-serif" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>404 - Not Found</h1>
            <p style={{ color: "#666" }}>Could not find requested resource</p>
            <a href="/" style={{ color: "#6366f1", marginTop: "1rem", display: "inline-block" }}>
                Return Home
            </a>
        </main>
    );
}
