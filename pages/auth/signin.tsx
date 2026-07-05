import { getProviders, signIn } from "next-auth/react"
import type { GetServerSideProps } from "next"

export default function SignIn({ providers }: { providers: Record<string, any> }) {
  return (
    <div style={{ padding: 40, maxWidth: 520, margin: "0 auto" }}>
      <h1>Sign in to GlobalPay Pi</h1>
      <p>Choose a provider to continue:</p>
      <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
        {providers &&
          Object.values(providers).map((provider: any) => (
            <div key={provider.name}>
              <button
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: "/dashboard",
                  })
                }
                style={{
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
