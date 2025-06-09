import { LoginResponse, loginService } from "@/services/loginService";
import NextAuth, { DefaultSession, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

// Extender los tipos de next-auth
declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken?: string;
        userData?: any;
        user: {
            id: string;
        } & DefaultSession["user"]
    }

    interface User {
        id: string;
        accessToken: string;
        userData: any;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        id?: string;
        userData?: any;
    }
}

export default NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 días
    },
    pages: {
        signIn: "/",
        error: "/",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Usuario", type: "text", placeholder: "usuario" },
                password: { label: "Contraseña", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const { token, user } = await loginService({
                        username: credentials?.username || '',
                        password: credentials?.password || ''
                    }) as LoginResponse;

                    if (!token) {
                        throw new Error('Token no recibido');
                    }

                    return {
                        id: user.id.toString(),
                        name: user.username,
                        accessToken: token,
                        userData: user
                    };
                } catch (error) {
                    throw new Error(
                        error instanceof Error ? error.message : 'Error de autenticación'
                    );
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.id = user.id;
                token.userData = user.userData;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user) {
                session.accessToken = token.accessToken;
                session.user.id = token.id || '';
                session.userData = token.userData;
            }
            return session;
        }
    }
})