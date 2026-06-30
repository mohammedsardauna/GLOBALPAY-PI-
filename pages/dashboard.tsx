import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin")
    }
  }, [status, router])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to GlobalPay Pi, {session.user.name}!</h1>
      <p>Email: {session.user.email}</p>
      {session.user.image && (
        <img
          src={session.user.image}
          alt="Profile"
          style={{ borderRadius: "50%", width: "100px" }}
        />
      )}
      <button
        onClick={() => signOut({ callbackUrl: "/api/auth/signin" })}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Sign Out
      </button>
    </div>
  )
}