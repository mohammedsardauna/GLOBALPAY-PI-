import { useRouter } from "next/router"
import { signIn } from "next-auth/react"

export default function Error() {
  const router = useRouter()
  const { error } = router.query

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Authentication Error</h1>
      <p>{error || "An error occurred during authentication"}</p>
      <button
        onClick={() => signIn("github")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#24292e",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Try Again
      </button>
    </div>
  )
}