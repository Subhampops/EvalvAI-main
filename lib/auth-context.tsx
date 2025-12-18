'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import {
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signInAnonymously,
    updateProfile,
} from 'firebase/auth'
import { auth } from './firebase'

interface AuthContextType {
    user: User | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string, name: string) => Promise<void>
    signInWithGoogle: () => Promise<void>
    signInAsGuest: () => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const signIn = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error: any) {
            throw new Error(getErrorMessage(error.code))
        }
    }

    const signUp = async (email: string, password: string, name: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            // Update user profile with display name
            if (userCredential.user) {
                await updateProfile(userCredential.user, {
                    displayName: name,
                })
            }
        } catch (error: any) {
            throw new Error(getErrorMessage(error.code))
        }
    }

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
        } catch (error: any) {
            throw new Error(getErrorMessage(error.code))
        }
    }

    const signInAsGuest = async () => {
        try {
            await signInAnonymously(auth)
        } catch (error: any) {
            throw new Error(getErrorMessage(error.code))
        }
    }

    const signOut = async () => {
        try {
            await firebaseSignOut(auth)
        } catch (error: any) {
            throw new Error('Failed to sign out')
        }
    }

    const value = {
        user,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signInAsGuest,
        signOut,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

// Helper function to convert Firebase error codes to user-friendly messages
function getErrorMessage(errorCode: string): string {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email is already registered'
        case 'auth/invalid-email':
            return 'Invalid email address'
        case 'auth/operation-not-allowed':
            return 'Operation not allowed'
        case 'auth/weak-password':
            return 'Password should be at least 6 characters'
        case 'auth/user-disabled':
            return 'This account has been disabled'
        case 'auth/user-not-found':
            return 'No account found with this email'
        case 'auth/wrong-password':
            return 'Incorrect password'
        case 'auth/invalid-credential':
            return 'Invalid email or password'
        case 'auth/too-many-requests':
            return 'Too many failed attempts. Please try again later'
        case 'auth/network-request-failed':
            return 'Network error. Please check your connection'
        case 'auth/popup-closed-by-user':
            return 'Sign-in popup was closed'
        case 'auth/cancelled-popup-request':
            return 'Sign-in was cancelled'
        default:
            return 'An error occurred. Please try again'
    }
}
