import { signIn } from "next-auth/react"

export default function SignIn() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Sign In to GlobalPay Pi</h1>
      <button
        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
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
        Sign in with GitHub
      </button>
    </div>
  )
}